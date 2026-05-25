// src/constants/bookingPageContent.ts

export type BookingPageContent = {
  statusPill: string;
  callTitle: string;

  aside: {
    badge: string;
    titlePrefix: string;
    highlightedTitle: string;
    titleSuffix: string;
    description: string;

    callBox: {
      heading: string;
      items: string[];
    };

    expectations: {
      heading: string;
      items: string[];
    };

    warning: string;
  };

  calendarHeader: {
    badge: string;
    title: string;
    description: string;
  };

  footerNote: string;
};

export const bookingPageContentBySlug: Record<string, BookingPageContent> = {
  'ai-proof-engineer-readiness-check': {
    statusPill: 'Readiness check submitted — final step pending',
    callTitle: 'AI-Proof Engineer Strategy Call',

    aside: {
      badge: 'Final Step: Strategy Call',

      titlePrefix: 'Book Your',
      highlightedTitle: 'AI-Proof Engineer',
      titleSuffix: 'Strategy Call',

      description:
        'Based on your answers, our team will help you understand whether your current skillset is strong enough for the AI-era hiring market.',

      callBox: {
        heading: 'What happens in this call?',
        items: [
          'We understand your current role and the kind of engineering work you are doing today.',
          'We identify whether your risk is DSA, system design, AI workflow, projects, or interview readiness.',
          'We explain whether the AI-Proof Engineer Program is suitable for your goals and current stage.',
        ],
      },

      expectations: {
        heading: 'Please attend only if you are serious.',
        items: [
          'Join from a quiet place with proper internet.',
          'Keep 30 minutes free for the discussion.',
          'Be ready to discuss your current work, goals, and skill gaps honestly.',
          'If selected, our team will explain program structure, pricing, and EMI options.',
        ],
      },

      warning:
        'This call is for serious working engineers who want to stay valuable in the AI era. Please choose a slot only if you can attend without distractions.',
    },

    calendarHeader: {
      badge: 'AI-Proof Engineer Strategy Call',
      title: 'Select your call slot',
      description:
        'Pick a time that you can attend without distractions. Your submitted answers will help our team guide the call better.',
    },

    footerNote:
      '©️ InterviewCall. Your booking details will be used only for the strategy call and program-fit evaluation.',
  },
};