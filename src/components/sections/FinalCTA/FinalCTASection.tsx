import Link from 'next/link';
import { FC } from 'react';

const FinalCTASection: FC = () => {
  return (
    <section className="bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.35),transparent_35%),linear-gradient(135deg,#1d4ed8,#0f172a)] py-19.5 text-center text-white">
      <div className="mx-auto w-[min(1180px,92%)]">
        <h2 className="mx-auto mb-4 max-w-225 text-[clamp(32px,4.5vw,54px)] font-black leading-[1.08] tracking-[-1.2px]">
          Ready to check if you are becoming AI-proof?
        </h2>

        <p className="mx-auto mb-7 max-w-190 text-lg text-[#dbeafe]">
          Take the readiness check and understand whether this program is the
          right fit for your career stage.
        </p>

        <Link
          href="/qualification-form"
          className="inline-flex min-h-14 items-center justify-center rounded-[14px] bg-white px-6.5 text-base font-black text-(--color-blue-dark) shadow-[0_16px_34px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#eff6ff]"
        >
          Check Your AI-Proof Engineer Readiness
        </Link>
      </div>
    </section>
  );
};

export default FinalCTASection;
