import { FitCard } from '@/types/targetAudienceSection';

import { forItems, notForItems } from './targetAudience';

export const fitCardItems: FitCard[] = [
    {
        title: 'For',
        items: forItems,
        type: 'for'
    },

    {
        title: 'Not For',
        items: notForItems,
        type: 'not-for'
    }
];