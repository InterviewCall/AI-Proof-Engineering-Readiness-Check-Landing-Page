import { notFound } from 'next/navigation';

import BookingPage from '@/components/booking-page/BookingPage';
import { bookingPageContentBySlug } from '@/constants/bookingPageContent';
import { landingPages, LandingPageSlug } from '@/constants/landingPage';

type BookStrategyCallPageProps = {
    params: Promise<{
        slug: string
    }>
};

const BookStrategyCallPage = async ({ params }: BookStrategyCallPageProps) => {
    const { slug } = await params;

    if(!(slug in landingPages)) {
        notFound();
    }

    const landingPageData = landingPages[slug as LandingPageSlug];
    const content = bookingPageContentBySlug[landingPageData.formSlug];

    if(!content) {
        notFound();
    }

    return (
        <BookingPage
            content={content}
            slug={landingPageData.formSlug}
            routeSlug={slug}
        />
    );
};

export default BookStrategyCallPage;