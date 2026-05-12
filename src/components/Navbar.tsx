import Link from 'next/link';
import { FC } from 'react';

export type NavbarProps = {
  href: string
}

const Navbar: FC<NavbarProps> = ({ href }) => {
  return (
    <nav className="sticky top-0 z-50 border-b border-(--color-border) bg-white/90 py-4.5 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1180px,92%)] items-center justify-between gap-4">
        <div className="text-[21px] font-black tracking-[-0.5px] text-[#020617] max-sm:text-lg">
          Interview<span className="text-(--color-blue)">Call</span>
        </div>

        <Link
          href={href}
          className="inline-flex min-h-10.5 items-center justify-center rounded-full bg-(--color-blue) px-4 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-(--color-blue-dark) max-sm:hidden"
        >
          Check Readiness
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
