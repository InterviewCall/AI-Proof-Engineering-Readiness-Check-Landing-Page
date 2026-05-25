'use client';

import { FC, useEffect, useMemo, useState } from 'react';

export type ExpireTimerProps = {
  target: string;
  onExpire: () => void;
};

const TOTAL_DURATION_MS = 60 * 1000;

function calculateRemainingTime(target: string): number {
  const targetTime = new Date(target).getTime();

  if (Number.isNaN(targetTime)) {
    return 0;
  }

  return Math.max(0, targetTime - Date.now());
}

const ExpireTimer: FC<ExpireTimerProps> = ({ target, onExpire }) => {
  const [diff, setDiff] = useState<number>(() =>
    calculateRemainingTime(target),
  );

  useEffect(() => {
    let hasExpired = false;
    let intervalId: number | undefined = undefined;

    const updateRemainingTime = (): void => {
      const remainingTime = calculateRemainingTime(target);

      setDiff(remainingTime);

      if (remainingTime <= 0 && !hasExpired) {
        hasExpired = true;

        if (intervalId !== undefined) {
          window.clearInterval(intervalId);
        }

        onExpire();
      }
    };

    const initialTimeoutId = window.setTimeout(updateRemainingTime, 0);

    intervalId = window.setInterval(updateRemainingTime, 1000);

    return () => {
      window.clearTimeout(initialTimeoutId);

      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [target, onExpire]);

  const totalSecondsLeft = Math.ceil(diff / 1000);

  const progressPercentage = useMemo(() => {
    return Math.max(0, Math.min((diff / TOTAL_DURATION_MS) * 100, 100));
  }, [diff]);

  return (
    <div className="rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.08em] text-[#2563eb]">
            Reservation Timer
          </p>

          <p className="mt-1 text-sm font-bold text-[#334155]">
            Confirm before the timer ends, otherwise this slot will be released.
          </p>
        </div>

        <div className="grid size-14 min-w-14 place-items-center rounded-full bg-white text-lg font-black text-[#2563eb] shadow-sm">
          {totalSecondsLeft}s
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-[#2563eb] transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ExpireTimer;