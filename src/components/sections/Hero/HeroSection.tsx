import { FC } from 'react';

import { heroSectionBulletPoints } from '@/utils/heroBulletPoints';

import HeroBullet from './HeroBullets';
import PrimaryCTA from './PrimaryCTA';

const HeroSection: FC = () => {
    return (
        <section className="bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.12),transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-17 max-lg:py-12">
        <div className="mx-auto grid w-[min(1180px,92%)] grid-cols-[0.95fr_1.05fr] items-center gap-11.5 max-lg:grid-cols-1">
          <div>
            <div className="mb-4.5 inline-flex items-center gap-2 rounded-full bg-[#e0f2fe] px-3.5 py-2 text-sm font-black text-[#0369a1]">
              <span className="h-2 w-2 rounded-full bg-(--color-blue) shadow-[0_0_0_5px_rgba(37,99,235,0.15)]" />
              AI-Proof Engineer Program
            </div>

            <h1 className="mb-5 text-[clamp(40px,5.5vw,68px)] font-black leading-[1.02] tracking-[-2px] text-[#020617] max-sm:tracking-[-1.3px]">
              Become the Engineer{' '}
              <span className="text-(--color-blue)">
                AI Can’t Replace
              </span>
            </h1>

            <p className="mb-6.5 max-w-165 text-[19px] text-(--color-muted) max-sm:text-[17px]">
              AI is not replacing every software engineer. But it is increasing
              pressure on engineers whose work is limited to basic execution.
              Watch this short video to understand what companies now expect
              from high-leverage engineers.
            </p>

            <div className="mb-7.5 grid gap-3.25">
              {heroSectionBulletPoints.map((point) => (
                <HeroBullet key={point} text={point} />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 max-sm:w-full">
              <PrimaryCTA href="/qualification-form">
                Check Your AI-Proof Engineer Readiness
              </PrimaryCTA>

              <span className="text-[13px] font-bold text-(--color-muted-light) max-sm:w-full max-sm:text-center">
                Takes less than 2 minutes
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-(--color-border) bg-white p-3 shadow-(--shadow-premium)">
            <div className="flex items-center justify-between gap-3 px-1 pb-3 pt-1 text-sm font-extrabold text-(--color-muted) max-sm:flex-col max-sm:items-start">
              <span>Watch this before applying for the readiness call</span>

              <span className="inline-flex items-center gap-2 rounded-full bg-[#f1f5f9] px-2.5 py-1.5 text-xs font-black text-[#334155]">
                <span className="h-1.75 w-1.75 rounded-full bg-(--color-danger)" />
                Free Breakdown
              </span>
            </div>

            <div className="aspect-video overflow-hidden rounded-2xl bg-[#020617]">
              <iframe
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0&modestbranding=1"
                title="InterviewCall AI-Proof Engineer VSL"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>

            <div className="px-1 pb-0.5 pt-3.25 text-center text-sm font-extrabold text-(--color-muted)">
              This video explains what engineers need to stay valuable in the
              AI-era hiring market.
            </div>
          </div>
        </div>
      </section>
    );
};

export default HeroSection;