// Small helpers around what we remember about a visitor in this browser (per form slug).
// `candidate_submission_<slug>` is the key the qualification form already reads.

const submissionKey = (slug: string) => `candidate_submission_${slug}`;
const candidateKey = (slug: string) => `candidate_id_${slug}`;

export type CandidateSession = {
    candidateId?: string
    submissionId?: string
}

export function readCandidateSession(slug: string): CandidateSession {
    try {
        return {
            candidateId: localStorage.getItem(candidateKey(slug)) ?? undefined,
            submissionId: localStorage.getItem(submissionKey(slug)) ?? undefined,
        };
    } catch {
        return {};
    }
}

export function saveCandidateSession(
    slug: string,
    { candidateId, submissionId }: { candidateId: string | number, submissionId: string },
) {
    try {
        localStorage.setItem(candidateKey(slug), String(candidateId));
        localStorage.setItem(submissionKey(slug), submissionId);
    } catch {
        // storage can be blocked (private mode); the flow still works for this page view
    }
}

export function clearStoredCandidateId(slug: string) {
    try {
        localStorage.removeItem(candidateKey(slug));
    } catch {
        // ignore
    }
}

// Put/remove ?candidate-id= in the address bar without reloading the page.
export function setCandidateIdInUrl(candidateId: string | null) {
    const url = new URL(window.location.href);

    if (candidateId) {
        url.searchParams.set('candidate-id', candidateId);
    } else {
        url.searchParams.delete('candidate-id');
    }

    window.history.replaceState(window.history.state, '', url.toString());
}
