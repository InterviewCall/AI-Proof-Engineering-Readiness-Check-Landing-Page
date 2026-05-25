import { FC } from 'react';

import BookingPage from '@/components/booking-page/BookingPage';
import { bookingPageContentBySlug } from '@/constants/bookingPageContent';

type BookACallPagePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const BookCallPage: FC<BookACallPagePageProps> = async ({ params }) => {
  const { slug } = await params;
  const content = bookingPageContentBySlug[slug];
  return (
    <BookingPage content={content} slug={slug} />
  );
};

export default BookCallPage;