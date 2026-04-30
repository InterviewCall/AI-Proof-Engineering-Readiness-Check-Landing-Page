import Link from 'next/link';
import { FC, ReactNode } from 'react';

type PrimaryCTAProps = {
    href: string,
    children: ReactNode
};

const PrimaryCTA: FC<PrimaryCTAProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="inline-flex min-h-14 items-center justify-center rounded-[14px] bg-(--color-blue) px-6.5 text-base font-black text-white shadow-[0_16px_34px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-(--color-blue-dark) max-sm:w-full"
    >
      {children}
    </Link>
  );
};

export default PrimaryCTA;