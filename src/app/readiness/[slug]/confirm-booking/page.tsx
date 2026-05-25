import { FC } from 'react';

import ConfirmBookingPage from '@/components/confirm-booking/ConfirmBookingPage';
import { bookingPageContentBySlug } from '@/constants/bookingPageContent';

type ConfirmPagePageProps = {
    params: Promise<{
        slug: string
    }>
};

const ConfirmBooking: FC<ConfirmPagePageProps> = async ({ params }) => {
    const { slug } = await params;
    const content = bookingPageContentBySlug[slug];
    const callTitle = content.callTitle;
    return (
        <ConfirmBookingPage callTitle={callTitle} />
    );
};

export default ConfirmBooking;