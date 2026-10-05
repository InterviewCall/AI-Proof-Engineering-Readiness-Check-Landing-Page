'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

import {
    clearStoredCandidateId,
    readCandidateSession,
    saveCandidateSession,
    setCandidateIdInUrl,
} from '@/lib/candidateSession';

import { useGetCandidate } from '../candidate/useGetCandidate';

export type VideoGateStatus = 'checking' | 'locked' | 'unlocked';

type UseVideoGateOptions = {
    // backend form slug (storage keys are per form)
    formSlug: string
    // route slug used in links, e.g. /job-switch/qualification-form
    routeSlug: string
    // when false the page behaves exactly as before (no gate)
    enabled: boolean
}

type BrowserSnapshot = {
    urlCandidateId: string | null
    storedCandidateId: string | null
    storedSubmissionId: string | null
}

const subscribeToNothing = () => () => undefined;

// URL / localStorage only exist in the browser, so they are read through useSyncExternalStore
// (server render + hydration see `null`, the browser then sees the real values).
function readBrowserSnapshot(formSlug: string): string {
    const urlCandidateId = new URLSearchParams(window.location.search).get('candidate-id')?.trim() || null;
    const stored = readCandidateSession(formSlug);

    return JSON.stringify({
        urlCandidateId,
        storedCandidateId: stored.candidateId ?? null,
        storedSubmissionId: stored.submissionId ?? null,
    } satisfies BrowserSnapshot);
}

// Decides if the visitor has already given their details:
//  1. ?candidate-id= in the URL, else
//  2. the candidate id we stored in this browser after an earlier submit.
// Either id is verified with the backend before the video unlocks, so a made-up id keeps it locked.
export function useVideoGate({ formSlug, routeSlug, enabled }: UseVideoGateOptions) {
    const rawSnapshot = useSyncExternalStore(
        subscribeToNothing,
        () => readBrowserSnapshot(formSlug),
        () => null,
    );
    const snapshot: BrowserSnapshot | null = rawSnapshot ? JSON.parse(rawSnapshot) : null;

    const [justUnlocked, setJustUnlocked] = useState<{ candidateId: string, submissionId: string } | null>(null);

    const candidateIdToCheck = enabled && !justUnlocked
        ? snapshot?.urlCandidateId || snapshot?.storedCandidateId || undefined
        : undefined;

    const { isSuccess, isError } = useGetCandidate(candidateIdToCheck);

    // Keep the address bar / storage in line with the backend's answer
    useEffect(() => {
        if (!candidateIdToCheck) return;

        if (isSuccess) {
            setCandidateIdInUrl(candidateIdToCheck);
        } else if (isError) {
            // unknown / fake id: forget it and stay locked
            if (snapshot?.urlCandidateId) setCandidateIdInUrl(null);
            clearStoredCandidateId(formSlug);
        }
    }, [candidateIdToCheck, isSuccess, isError, formSlug, snapshot?.urlCandidateId]);

    // Called right after the popup form is saved: no extra lookup needed, the backend just gave us the id.
    // The URL changes in place (no reload) so the click's "user interaction" is kept and the video can start with sound.
    const unlock = useCallback((candidateId: string, submissionId: string) => {
        saveCandidateSession(formSlug, { candidateId, submissionId });
        setCandidateIdInUrl(candidateId);
        setJustUnlocked({ candidateId, submissionId });
    }, [formSlug]);

    let status: VideoGateStatus;
    if (!enabled) status = 'locked';
    else if (justUnlocked) status = 'unlocked';
    else if (!snapshot) status = 'checking';
    else if (!candidateIdToCheck) status = 'locked';
    else if (isSuccess) status = 'unlocked';
    else if (isError) status = 'locked';
    else status = 'checking';

    const unlockedCandidateId = justUnlocked?.candidateId ?? candidateIdToCheck;
    const submissionId = justUnlocked?.submissionId ?? snapshot?.storedSubmissionId;

    // Step 1 of the qualification form needs both ids; on a shared link opened on another device we only have the candidate id,
    // so those visitors go through the normal details page.
    const readinessHref = status === 'unlocked' && unlockedCandidateId && submissionId
        ? `/${routeSlug}/qualification-form?candidate-id=${unlockedCandidateId}`
        : `/${routeSlug}/candidate-info`;

    return { status, readinessHref, unlock };
}
