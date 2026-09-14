import { FC } from 'react';
import { notFound } from 'next/navigation';

import ConfirmBookingPage from '@/components/confirm-booking/ConfirmBookingPage';
import { bookingPageContentBySlug } from '@/constants/bookingPageContent';
import { landingPages, LandingPageSlug } from '@/constants/landingPage';

type ConfirmPagePageProps = {
    params: Promise<{
        slug: string
    }>
};

const ConfirmBooking: FC<ConfirmPagePageProps> = async ({ params }) => {
    const { slug } = await params;
    if(!(slug in landingPages)) {
        notFound();
    }
    const landingPageData = landingPages[slug as LandingPageSlug];
    const content = bookingPageContentBySlug[landingPageData.formSlug];
    const callTitle = content.callTitle;
    
    return (
        <ConfirmBookingPage callTitle={callTitle} />
    );
};

export default ConfirmBooking;