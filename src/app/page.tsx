// import CheckReadinessForMobile from '@/components/CheckRedinessForMobile';
// import Navbar from '@/components/Navbar';
// import CurriculamSection from '@/components/sections/Curriculam/CurriculamSection';
// import FinalCTASection from '@/components/sections/FinalCTA/FinalCTASection';
// import FooterSection from '@/components/sections/Footer/FooterSection';
// import HeroSection from '@/components/sections/Hero/HeroSection';
// import MarketShiftSection from '@/components/sections/MarketShift/MarketShiftSection';
// import PositioningSection from '@/components/sections/Positioning/PositioningSection';
// import ProblemSection from '@/components/sections/Problem/ProblemSection';
// import ProofSection from '@/components/sections/Proof/ProofSection';
// import TargetAudienceSection from '@/components/sections/TargetAudience/TargetAudienceSection';
// import Topbar from '@/components/Topbar';

// export default function AIProofEngineerPage() {
//   return (
//     <main className="w-full overflow-x-hidden bg-(--color-bg) text-(--color-text)">
//       <Topbar text="For working software engineers worried about AI, layoffs, and the next hiring wave" />
//       <Navbar />

//       {/* Section starts */}

//       {/* Hero */}
//       <HeroSection />

//       {/* Problem */}
//       <ProblemSection />

//       {/* Market Shift */}
//       <MarketShiftSection />

//       {/* Positioning */}
//       <PositioningSection />

//       {/* Curriculum */}
//       <CurriculamSection />

//       {/* Who This Is For */}
//       <TargetAudienceSection />

//       {/* Proof */}
//       <ProofSection />

//       {/* Final CTA */}
//       <FinalCTASection />

//       {/* Footer */}
//       <FooterSection />

//       {/* Section ends */}

//       <CheckReadinessForMobile />
//     </main>
//   );
// }

import Link from 'next/link';

const readinessPages = [
  {
    title: 'AI-Proof Engineer',
    description: 'For engineers worried about AI affecting their role.',
    href: '/readiness/ai-proof-engineer-readiness-check',
  },
  {
    title: 'Product Company Readiness',
    description: 'For engineers applying but not getting interview calls.',
    href: '/readiness/product-company-readiness-check',
  },
  {
    title: 'AI-Era Market Value',
    description: 'For engineers whose salary and role growth have slowed down.',
    href: '/readiness/ai-era-market-value-check',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-16">
      <section className="mx-auto w-[min(980px,92%)]">
        <div className="mb-10 text-center">
          <h1 className="text-[clamp(34px,5vw,56px)] font-black tracking-[-1.5px] text-[#020617]">
            Interview<span className="text-[#2563eb]">Call</span> Readiness
            Pages
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-[#475569]">
            Choose the campaign landing page you want to preview.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
          {readinessPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-[0_16px_44px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
            >
              <h2 className="text-xl font-black text-[#020617]">
                {page.title}
              </h2>

              <p className="mt-3 text-sm font-semibold leading-6 text-[#475569]">
                {page.description}
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#eff6ff] px-4 py-2 text-sm font-black text-[#1d4ed8]">
                Open Page →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}