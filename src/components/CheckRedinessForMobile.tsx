import Link from 'next/link';
import { FC } from 'react';

const CheckReadinessForMobile: FC = () => {
  return (
    <div className="fixed bottom-3.5 left-3.5 right-3.5 z-100 hidden max-sm:block">
      <Link
        href="/qualification-form"
        className="inline-flex min-h-14 w-full items-center justify-center rounded-[14px] bg-(--color-blue) px-6.5 text-base font-black text-white shadow-[0_18px_44px_rgba(37,99,235,0.38)] transition hover:bg-(--color-blue-dark)"
      >
        Check Readiness
      </Link>
    </div>
  );
};

export default CheckReadinessForMobile;
