import { FC } from 'react';

import ThankYouPage from '@/components/thank-you/ThankYouPage';
import { bookingPageContentBySlug } from '@/constants/bookingPageContent';
import { landingPages, LandingPageSlug } from '@/constants/landingPage';

type ThankYouRoutePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const ThankYouRoutePage: FC<ThankYouRoutePageProps> = async ({ params }) => {
  const { slug } = await params;

  const content = bookingPageContentBySlug[
    landingPages[slug as LandingPageSlug].formSlug
  ];

  return (
    <ThankYouPage
      callTitle={content.calendarHeader.badge}
    />
  );
};

export default ThankYouRoutePage;