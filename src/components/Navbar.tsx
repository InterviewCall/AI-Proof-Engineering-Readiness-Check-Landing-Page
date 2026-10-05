import Image from 'next/image';
import Link from 'next/link';
import { FC, MouseEventHandler } from 'react';

export type NavbarProps = {
  href: string,
  onClick?: MouseEventHandler<HTMLAnchorElement>,
}

const Navbar: FC<NavbarProps> = ({ href, onClick }) => {
  return (
    <nav className="sticky top-0 z-50 border-b border-(--color-border) bg-white/90 py-4.5 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1180px,92%)] items-center justify-between gap-4 max-sm:justify-center">
        <div className="flex items-center gap-2.5 text-[21px] font-black tracking-[-0.5px] text-[#020617] max-sm:gap-2.5 max-sm:text-[22px]">
          <Image
            src="/company-new-logo.svg"
            alt="InterviewCall logo"
            width={105}
            height={120}
            priority
            className="h-9 w-auto max-sm:h-10"
          />
          <span>
            Interview<span className="text-(--color-blue)">Call</span>
          </span>
        </div>

        <Link
          href={href}
          onClick={onClick}
          className="inline-flex min-h-10.5 items-center justify-center rounded-full bg-(--color-blue) px-4 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-(--color-blue-dark) max-sm:hidden"
        >
          Check Readiness
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
