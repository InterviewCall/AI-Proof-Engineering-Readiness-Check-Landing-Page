'use client';

import { useCallback, useEffect } from 'react';

import { UtmTrackingData } from '@/types/utmTracker';

const UTM_TTL_IN_MS = 7 * 24 * 60 * 60 * 1000;

const getStorageKey = (slug: string): string => {
  return `utm_tracking_${slug}`;
};

const getParamValue = (
  searchParams: URLSearchParams,
  key: string,
): string | undefined => {
  const value = searchParams.get(key)?.trim();

  return value || undefined;
};

const hasTrackingParams = (data: Partial<UtmTrackingData>): boolean => {
  return Boolean(
    data.source ||
      data.utmSource ||
      data.utmMedium ||
      data.utmCampaign ||
      data.utmContent ||
      data.utmTerm ||
      data.gclid ||
      data.fbclid,
  );
};

const isExpired = (capturedAt: string): boolean => {
  const capturedTime = new Date(capturedAt).getTime();

  if (Number.isNaN(capturedTime)) {
    return true;
  }

  return Date.now() - capturedTime > UTM_TTL_IN_MS;
};

const buildCurrentUtmData = (): UtmTrackingData => {
  const searchParams = new URLSearchParams(window.location.search);

  return {
    source:
      getParamValue(searchParams, 'source') ||
      getParamValue(searchParams, 'utm_source'),

    landingPage: window.location.href,

    referrerUrl: document.referrer || undefined,

    utmSource: getParamValue(searchParams, 'utm_source'),
    utmMedium: getParamValue(searchParams, 'utm_medium'),
    utmCampaign: getParamValue(searchParams, 'utm_campaign'),
    utmContent: getParamValue(searchParams, 'utm_content'),
    utmTerm: getParamValue(searchParams, 'utm_term'),

    gclid: getParamValue(searchParams, 'gclid'),
    fbclid: getParamValue(searchParams, 'fbclid'),

    capturedAt: new Date().toISOString(),
  };
};

export const useUtmTracker = (slug: string) => {
  useEffect(() => {
    if (!slug || typeof window === 'undefined') {
      return;
    }

    const storageKey = getStorageKey(slug);
    const currentUtmData = buildCurrentUtmData();
    const storedValue = localStorage.getItem(storageKey);

    if (storedValue) {
      try {
        const parsedValue = JSON.parse(storedValue) as UtmTrackingData;

        if (isExpired(parsedValue.capturedAt)) {
          localStorage.removeItem(storageKey);
        } else if (!hasTrackingParams(currentUtmData)) {
          return;
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    if (hasTrackingParams(currentUtmData)) {
      localStorage.setItem(storageKey, JSON.stringify(currentUtmData));
    }
  }, [slug]);

  const getStoredUtmData = useCallback((): UtmTrackingData | null => {
    if (!slug || typeof window === 'undefined') {
      return null;
    }

    const storageKey = getStorageKey(slug);
    const storedValue = localStorage.getItem(storageKey);

    if (storedValue) {
      try {
        const parsedValue = JSON.parse(storedValue) as UtmTrackingData;

        if (isExpired(parsedValue.capturedAt)) {
          localStorage.removeItem(storageKey);
          return null;
        }

        return parsedValue;
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    const currentUtmData = buildCurrentUtmData();

    if (hasTrackingParams(currentUtmData)) {
      localStorage.setItem(storageKey, JSON.stringify(currentUtmData));
      return currentUtmData;
    }

    return null;
  }, [slug]);

  const clearUtmData = useCallback((): void => {
    if (!slug || typeof window === 'undefined') {
      return;
    }

    localStorage.removeItem(getStorageKey(slug));
  }, [slug]);

  return {
    getStoredUtmData,
    clearUtmData,
  };
};