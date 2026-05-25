import { FC } from 'react';

import ThankYouPage from '@/components/thank-you/ThankYouPage';
import { bookingPageContentBySlug } from '@/constants/bookingPageContent';

type ThankYouRoutePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const ThankYouRoutePage: FC<ThankYouRoutePageProps> = async ({ params }) => {
  const { slug } = await params;

  const content = bookingPageContentBySlug[slug];

  return (
    <ThankYouPage
      callTitle={content.calendarHeader.badge}
    />
  );
};

export default ThankYouRoutePage;