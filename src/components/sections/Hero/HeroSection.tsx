import { FC, MouseEventHandler } from 'react';

import { VideoGateStatus } from '@/hooks/video-gate/useVideoGate';

import LockedVideoPreview from '../../videoGate/LockedVideoPreview';
import HeroBullet from './HeroBullets';
import PrimaryCTA from './PrimaryCTA';
import VslPlayer from './VslPlayer';

export type HeroSectionProps = {
  badgeText: string,
  titlePrefix: string,
  titleHighlight: string,
  description: string,
  bulletPoints: string[],
  primaryCta: {
    label: string,
    href: string,
    onClick?: MouseEventHandler<HTMLAnchorElement>
  },
  ctaHelperText: string,
  video: {
    eyebrow: string,
    badgeText: string,
    embedUrl: string,
    title: string,
    footerText: string,
    // when set, the video is locked behind the details popup and this silent clip is shown instead
    previewSrc?: string,
    posterSrc?: string
  },
  videoGate?: {
    status: VideoGateStatus,
    onRequestUnlock: () => void
  }
}

const HeroSection: FC<HeroSectionProps> = ({ badgeText, titlePrefix, titleHighlight, description, bulletPoints, primaryCta, ctaHelperText, video, videoGate }) => {
    // YouTube / Vimeo links need an <iframe>; direct files (like our S3 .mp4) use <video>
    const isEmbed = /(youtube\.com|youtu\.be|vimeo\.com)/.test(video.embedUrl);
    const isGated = Boolean(videoGate && video.previewSrc && !isEmbed);
    const isLocked = isGated && videoGate?.status !== 'unlocked';

    return (
        <section className="bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.12),transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-17 max-lg:py-12">
        <div className="mx-auto grid w-[min(1180px,92%)] grid-cols-[0.95fr_1.05fr] items-center gap-11.5 max-lg:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:gap-0">
          <div className="max-sm:contents">
            <div className="max-sm:hidden mb-4.5 inline-flex items-center gap-2 rounded-full bg-[#e0f2fe] px-3.5 py-2 text-sm font-black text-[#0369a1] max-sm:order-1 max-sm:self-start">
              <span className="h-2 w-2 rounded-full bg-(--color-blue) shadow-[0_0_0_5px_rgba(37,99,235,0.15)]" />
              {badgeText}
            </div>

            <h1 className="mb-5 text-[clamp(40px,5.5vw,68px)] font-black leading-[1.02] tracking-[-2px] text-[#020617] max-sm:order-2 max-sm:tracking-[-1.3px]">
              {titlePrefix}{' '}
              <span className="text-(--color-blue)">
                {titleHighlight}
              </span>
            </h1>

            <p className="mb-6.5 max-w-165 text-[19px] text-(--color-muted) max-sm:order-4 max-sm:hidden max-sm:text-[17px]">
              {description}
            </p>

            <div className="mb-7.5 grid gap-3.25 max-sm:order-5">
              {bulletPoints.map((point) => (
                <HeroBullet key={point} text={point} />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 max-sm:order-6 max-sm:w-full">
              <PrimaryCTA href={primaryCta.href} onClick={primaryCta.onClick}>
                {primaryCta.label}
              </PrimaryCTA>

              <span className="text-[13px] font-bold text-(--color-muted-light) max-sm:w-full max-sm:text-center">
                {ctaHelperText}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-(--color-border) bg-white p-3 shadow-(--shadow-premium) max-sm:order-3 max-sm:mb-7.5">
            <div className="flex items-center justify-between gap-3 px-1 pb-3 pt-1 text-sm font-extrabold text-(--color-muted) max-sm:flex-col max-sm:items-start">
              <span>{video.eyebrow}</span>

              <span className="inline-flex items-center gap-2 rounded-full bg-[#f1f5f9] px-2.5 py-1.5 text-xs font-black text-[#334155]">
                <span className="h-1.75 w-1.75 rounded-full bg-(--color-danger)" />
                {video.badgeText}
              </span>
            </div>

            <div id="hero-video" className="aspect-video scroll-mt-24 overflow-hidden rounded-2xl bg-[#020617]">
              {isLocked && video.previewSrc ? (
                <LockedVideoPreview
                  previewSrc={video.previewSrc}
                  posterSrc={video.posterSrc}
                  title={video.title}
                  isChecking={videoGate?.status === 'checking'}
                  onUnlockClick={() => videoGate?.onRequestUnlock()}
                />
              ) : isEmbed ? (
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <VslPlayer src={video.embedUrl} title={video.title} />
              )}
            </div>

            <div className="px-1 pb-0.5 pt-3.25 text-center text-sm font-extrabold text-(--color-muted)">
              {video.footerText}
            </div>
          </div>
        </div>
      </section>
    );
};

export default HeroSection;