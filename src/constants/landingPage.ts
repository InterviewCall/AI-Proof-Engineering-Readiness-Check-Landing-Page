export const landingPages = {
  'ai-proof-engineer': {
    formSlug: 'ai-proof-engineer-readiness-check',

    topBar: {
      text: 'For working software engineers worried about AI, layoffs, and the next hiring wave',
    },

    hero: {
      badgeText: 'AI-Proof Engineer Program',

      titlePrefix: 'Become the Engineer',
      titleHighlight: 'AI Can’t Replace',

      description:
        'AI is not replacing every software engineer. But it is increasing pressure on engineers whose work is limited to basic execution. Watch this short video to understand what companies now expect from high-leverage engineers.',

      bulletPoints: [
        'Understand how AI is changing software engineering roles.',
        'Learn what skills make an engineer more valuable in lean teams.',
        'Check whether your current skillset is strong enough for the AI era.',
      ],

      primaryCta: {
        label: 'Check Your AI-Proof Engineer Readiness',
        href: '/qualification-form/ai-proof-engineer-readiness-check',
      },

      ctaHelperText: 'Takes less than 2 minutes',

      video: {
        eyebrow: 'Watch this before applying for the readiness call',
        badgeText: 'Free Breakdown',
        embedUrl:
          'https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0&modestbranding=1',
        title: 'InterviewCall AI-Proof Engineer VSL',
        footerText:
          'This video explains what engineers need to stay valuable in the AI-era hiring market.',
      },
    },

    problem: {
      title: 'Software engineering is changing fast.',

      subtitle:
        'AI is making basic coding faster. Companies are becoming leaner. Teams are expected to produce more with fewer people.',

      statements: [
        'This does not mean engineers are finished.',
        'It means average engineering is under pressure.',
        'The safest engineers are not the ones who ignore AI.',
      ],

      highlight:
        'The safest engineers are the ones who combine strong fundamentals with AI-assisted execution.',
    },

    marketShift: {
      title: 'The market now rewards high-leverage engineers.',

      subtitle:
        'A high-leverage engineer is not just someone who writes code. They can understand problems, design systems, debug real issues, use AI responsibly, and communicate clearly.',

      features: [
        {
          icon: '🧠',
          title: 'Problem Solver',
          description:
            'Strong engineers can break down problems, identify edge cases, and build optimized solutions.',
        },
        {
          icon: '🏗️',
          title: 'System Thinker',
          description:
            'They understand APIs, databases, caching, queues, architecture, reliability, and tradeoffs.',
        },
        {
          icon: '⚡',
          title: 'AI-Native Builder',
          description:
            'They use AI to move faster, but they still verify, reason, debug, and take ownership.',
        },
      ],
    },

    positioning: {
      title: 'That is why we built the AI-Proof Engineer Program.',

      isNotItems: [
        'This is not a prompt engineering course.',
        'This is not a random GenAI bootcamp.',
        'This is not only a DSA program.',
      ],

      positioningItems: [
        'Not shallow AI hype',
        'Not random tutorials',
        'Not shortcut promises',
      ],

      learnItems: [
        'It is a structured career program for software engineers who want to become stronger, sharper, and more valuable in the new hiring market.',
        'You learn the durable engineering skills that companies still care about — and the AI-assisted workflows that modern engineers now need.',
      ],
    },

    curriculum: {
      title: 'What You Will Learn',

      subtitle:
        'A structured curriculum that combines durable engineering fundamentals with AI-era execution skills.',

      items: [
        {
          title: 'Engineering Foundations',
          description:
            'Problem solving, DSA, clean code, and debugging fundamentals.',
        },
        {
          title: 'Real-World Software Engineering',
          description:
            'APIs, databases, Git, testing, frontend/backend workflows, and team delivery.',
        },
        {
          title: 'AI-Assisted Engineering',
          description:
            'Prompting, context engineering, AI pair programming, AI debugging, refactoring, and verification.',
        },
        {
          title: 'System Design and Architecture',
          description:
            'Scalability, caching, queues, storage, reliability, cost, and architecture tradeoffs.',
        },
        {
          title: 'Building AI Features in Products',
          description:
            'RAG, structured outputs, AI assistants, extraction workflows, automation, and evaluation.',
        },
        {
          title: 'Agents and Automation',
          description:
            'Tool use, workflow automation, human-in-the-loop systems, and agent reliability.',
        },
        {
          title: 'Production Engineering',
          description:
            'Deployment, monitoring, observability, incident thinking, performance, and cost awareness.',
        },
        {
          title: 'Product Thinking and Ownership',
          description:
            'Feature thinking, prioritization, technical decision-making, communication, and ownership.',
        },
        {
          title: 'Interview and Career Acceleration',
          description:
            'DSA mocks, machine coding, system design mocks, AI-era interview preparation, resume, and role strategy.',
        },
        {
          title: 'Capstone and Proof of Skill',
          description:
            'Build portfolio-grade work that shows your ability to think, build, and explain.',
        },
      ],
    },

    targetAudience: {
      title: 'This program is for serious working engineers.',

      subtitle:
        'This is designed for engineers who want structured preparation, serious feedback, and a clear path to become more valuable in the AI-era market.',

      fitCards: [
        {
          title: 'For',
          type: 'for',
          items: [
            'Software engineers with 1+ years of experience',
            'Engineers worried about AI affecting their role',
            'Engineers stuck in service companies or low-growth roles',
            'Engineers who want to become stronger in DSA and system design',
            'Engineers who want to learn AI-assisted development properly',
            'Engineers preparing for better product-company opportunities',
          ],
        },
        {
          title: 'Not For',
          type: 'not-for',
          items: [
            'People looking for shortcuts',
            'People who want only prompt engineering',
            'People unwilling to practice consistently',
            'People expecting results without assignments, mocks, and effort',
            'People not serious about career growth',
          ],
        },
      ],
    },

    proof: {
      title: 'Built around practice, feedback, and proof.',

      subtitle:
        'This program is designed to move learners from passive learning to real engineering improvement.',

      items: [
        {
          title: 'Guided Labs',
          description:
            'Coding labs, AI workflow labs, debugging labs, system design labs, and project labs.',
        },
        {
          title: 'Mock Interviews',
          description:
            'DSA mocks, machine coding mocks, system design mocks, and AI-era technical interview practice.',
        },
        {
          title: 'Capstone Proof',
          description:
            'Build portfolio-grade projects that show your engineering maturity and AI-era readiness.',
        },
      ],
    },

    finalCTA: {
      title: 'Ready to check if you are becoming AI-proof?',

      description:
        'Take the readiness check and understand whether this program is the right fit for your career stage.',

      cta: {
        label: 'Check Your AI-Proof Engineer Readiness',
        href: '/qualification-form/ai-proof-engineer-readiness-check',
      },
    },
  },

  'product-company-readiness': {
    formSlug: 'product-company-readiness-check',

    tracking: {
      source: 'job_switch',
      vsl: 'B',
      landingPage: '/product-company-readiness',
      ctaText: 'Check Why You’re Not Getting Interview Calls',
    },

    topBar: {
      text: 'For software engineers applying to jobs but not getting the right interview calls',
    },

    hero: {
      badgeText: 'Product Company Readiness Check',

      titlePrefix: 'Applying More Will Not Help If You Are',
      titleHighlight: 'Not Interview-Ready',

      description:
        'If you are applying to product companies but not getting enough calls, the problem may not be only your resume. Watch this short video to understand what companies actually look for before shortlisting and hiring engineers.',

      bulletPoints: [
        'Understand why more applications may not solve the problem.',
        'Identify whether your gap is DSA, system design, projects, or communication.',
        'Check if you are actually ready for product-company interviews.',
      ],

      primaryCta: {
        label: 'Check Why You’re Not Getting Interview Calls',
        href: '/qualification-form/product-company-readiness-check',
      },

      ctaHelperText: 'Takes less than 2 minutes',

      video: {
        eyebrow: 'Watch this before applying to more roles',
        badgeText: 'Free Breakdown',
        embedUrl:
          'https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0&modestbranding=1',
        title: 'InterviewCall Product Company Readiness VSL',
        footerText:
          'This video explains why applying more may not solve your job-switch problem.',
      },
    },

    problem: {
      title:
        'More job applications do not automatically create more opportunities.',

      subtitle:
        'Many engineers keep applying to jobs every week. They change their resume, ask for referrals, and apply on LinkedIn, job portals, and company websites. But still, they do not get enough interview calls.',

      statements: [
        'The real issue is often not just the resume.',
        'It is readiness.',
        'If your preparation is weak, applying more only creates more rejection.',
      ],

      highlight:
        'Before applying to more jobs, check if you are actually product-company ready.',
    },

    marketShift: {
      title:
        'Companies are not just looking for keywords. They are looking for signals.',

      subtitle:
        'Your profile should show that you are capable of clearing interviews and working in serious engineering teams.',

      features: [
        {
          icon: '💻',
          title: 'Coding Signal',
          description:
            'Can you solve problems clearly, optimize your approach, and communicate your thinking under pressure?',
        },
        {
          icon: '🏗️',
          title: 'Engineering Signal',
          description:
            'Can you show real backend, frontend, database, project, and system understanding?',
        },
        {
          icon: '⚡',
          title: 'Modern Workflow Signal',
          description:
            'Can you use AI tools responsibly and work like a modern product engineer?',
        },
      ],
    },

    positioning: {
      title: 'That is why we built the AI-Proof Engineer Program.',

      isNotItems: [
        'This program is designed for working software engineers who want to become genuinely ready for better software engineering opportunities.',
        'It does not only focus on job links or resume changes.',
        'It helps you build the actual skills that make your profile and interview performance stronger.',
      ],

      positioningItems: [
        'Not only resume edits',
        'Not only job links',
        'Not random preparation',
      ],

      learnItems: [
        'You work on problem solving, DSA, software engineering, system design, AI-assisted development, mock interviews, and capstone-based proof of skill.',
      ],
    },

    curriculum: {
      title: 'What You Will Build Readiness In',

      subtitle:
        'The program helps you prepare for the actual skills and signals companies look for in serious engineering candidates.',

      items: [
        {
          title: 'DSA and Problem Solving',
          description:
            'Build stronger coding-round confidence through patterns, practice, and timed assessments.',
        },
        {
          title: 'Clean Code and Debugging',
          description:
            'Learn how to write maintainable code and debug real-world issues.',
        },
        {
          title: 'Backend, APIs, and Databases',
          description:
            'Understand how real software products are structured and shipped.',
        },
        {
          title: 'System Design',
          description:
            'Prepare for design discussions through architecture, scalability, reliability, and tradeoffs.',
        },
        {
          title: 'AI-Assisted Engineering',
          description:
            'Use AI for coding, debugging, testing, refactoring, and learning unfamiliar codebases.',
        },
        {
          title: 'AI Product Building',
          description:
            'Understand how AI features are built into real products through retrieval, structured outputs, and automation.',
        },
        {
          title: 'Production Thinking',
          description:
            'Learn deployment, monitoring, reliability, performance, and cost-awareness basics.',
        },
        {
          title: 'Interview Preparation',
          description:
            'Practice DSA, machine coding, system design, project explanation, and AI-era interview questions.',
        },
        {
          title: 'Resume and Profile Positioning',
          description:
            'Learn how to show your skills clearly through resume, projects, GitHub, and LinkedIn.',
        },
        {
          title: 'Capstone Proof',
          description: 'Build work that demonstrates your skill beyond claims.',
        },
      ],
    },

    targetAudience: {
      title: 'This is for engineers who want to stop applying randomly.',

      subtitle:
        'This page is for engineers who want to understand what is actually stopping them from getting better opportunities.',

      fitCards: [
        {
          title: 'For',
          type: 'for',
          items: [
            'Engineers applying to jobs but not getting enough calls',
            'Engineers getting calls but failing interviews',
            'Engineers trying to switch from service to product roles',
            'Engineers who are unsure what exactly is missing',
            'Engineers who want structured preparation instead of random learning',
            'Engineers serious about improving their interview readiness',
          ],
        },
        {
          title: 'Not For',
          type: 'not-for',
          items: [
            'People only looking for job links',
            'People expecting referrals without preparation',
            'People unwilling to fix fundamentals',
            'People who want shortcuts instead of structured practice',
            'People not serious about attending mocks and completing assignments',
          ],
        },
      ],
    },

    proof: {
      title: 'Readiness is built through practice, not hope.',

      subtitle:
        'The program is designed to diagnose your gaps, build skill, and prepare you for serious technical interviews.',

      items: [
        {
          title: 'Readiness Diagnostics',
          description:
            'Understand whether your gap is DSA, system design, projects, AI workflows, or communication.',
        },
        {
          title: 'Structured Mock Interviews',
          description:
            'Practice coding rounds, machine coding, system design, and interview communication.',
        },
        {
          title: 'Feedback and Improvement',
          description:
            'Get guided reviews, assignments, labs, and capstone-based proof.',
        },
      ],
    },

    finalCTA: {
      title: 'Before applying to more jobs, check if you are actually ready.',

      description:
        'Complete the readiness check and understand what may be stopping you from getting better opportunities.',

      cta: {
        label: 'Check Why You’re Not Getting Interview Calls',
        href: '/qualification-form/product-company-readiness-check',
      },
    },
  },

  'ai-era-market-value': {
    formSlug: 'ai-era-market-value-check',

    tracking: {
      source: 'salary_stagnation',
      vsl: 'C',
      landingPage: '/ai-era-market-value',
      ctaText: 'Check Your AI-Era Engineering Value',
    },

    topBar: {
      text: 'For software engineers whose salary and role growth have slowed down',
    },

    hero: {
      badgeText: 'AI-Era Market Value Check',

      titlePrefix: 'Your Salary Is Not Stuck Because',
      titleHighlight: 'Companies Don’t Pay',

      description:
        'Companies still pay well for engineers who create real leverage. The problem is that many engineers gain years of experience without increasing their market value. Watch this short video to understand what actually increases your value in the AI era.',

      bulletPoints: [
        'Understand why experience alone does not guarantee salary growth.',
        'Learn what companies pay more for in modern engineering roles.',
        'Check whether your current skillset is increasing or limiting your market value.',
      ],

      primaryCta: {
        label: 'Check Your AI-Era Engineering Value',
        href: '/qualification-form/ai-era-market-value-check',
      },

      ctaHelperText: 'Takes less than 2 minutes',

      video: {
        eyebrow: 'Watch this before planning your next switch or salary jump',
        badgeText: 'Free Breakdown',
        embedUrl:
          'https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0&modestbranding=1',
        title: 'InterviewCall AI-Era Market Value VSL',
        footerText:
          'This video explains why experience alone may not be enough for salary and role growth.',
      },
    },

    problem: {
      title: 'Years of experience and market value are not the same thing.',

      subtitle:
        'Many engineers work hard for years. They complete tickets, fix bugs, attend meetings, and do what the company asks them to do. But their salary barely moves.',

      statements: [
        'Companies do not pay more only because time has passed.',
        'They pay more for engineers who can create more leverage.',
        'That means solving harder problems, taking ownership, designing systems, using AI effectively, and performing well in serious interviews.',
      ],

      highlight:
        'If your market value has not increased, your salary growth will stay limited.',
    },

    marketShift: {
      title: 'AI is making this difference even sharper.',

      subtitle:
        'Basic execution is becoming faster and cheaper. High-leverage engineering is becoming more valuable.',

      features: [
        {
          icon: '⚙️',
          title: 'Basic Execution',
          description:
            'If your value is only simple implementation, your growth will stay limited.',
        },
        {
          icon: '📈',
          title: 'Market Leverage',
          description:
            'Companies pay more for engineers who solve bigger problems and reduce business risk.',
        },
        {
          icon: '⚡',
          title: 'AI-Native Growth',
          description:
            'Engineers who combine fundamentals with AI-assisted execution can move faster and create more value.',
        },
      ],
    },

    positioning: {
      title: 'That is why we built the AI-Proof Engineer Program.',

      isNotItems: [
        'This program is designed to help working engineers increase their career value in the new hiring market.',
        'It does not focus only on one topic.',
        'It helps you build the complete skill stack required to move from average execution to high-leverage engineering.',
      ],

      positioningItems: [
        'Not only DSA',
        'Not shallow AI tools',
        'Not random learning',
      ],

      learnItems: [
        'You work on problem solving, DSA, real-world engineering, system design, AI-assisted development, AI product building, production thinking, mock interviews, and capstone proof.',
      ],
    },

    curriculum: {
      title: 'What You Will Strengthen',

      subtitle:
        'Build the skills that improve your engineering value, interview readiness, and long-term career strength.',

      items: [
        {
          title: 'Problem Solving and DSA',
          description:
            'Improve your ability to solve difficult problems and explain your thinking clearly.',
        },
        {
          title: 'Software Engineering Fundamentals',
          description:
            'Strengthen APIs, backend, frontend flows, databases, testing, Git, and delivery discipline.',
        },
        {
          title: 'Debugging and Code Quality',
          description:
            'Learn how to improve, review, and debug code like a professional engineer.',
        },
        {
          title: 'System Design',
          description:
            'Build architecture thinking through scalability, reliability, caching, queues, databases, and tradeoffs.',
        },
        {
          title: 'AI-Assisted Engineering',
          description:
            'Use AI as a productivity multiplier for coding, debugging, testing, refactoring, and learning.',
        },
        {
          title: 'AI Product Building',
          description:
            'Learn how AI features are added into products through retrieval, structured outputs, assistants, and automation.',
        },
        {
          title: 'Production Engineering',
          description:
            'Understand deployment, monitoring, incidents, cost, performance, and system ownership.',
        },
        {
          title: 'Product Thinking and Ownership',
          description:
            'Learn how valuable engineers make better decisions, communicate clearly, and think beyond tickets.',
        },
        {
          title: 'Interview and Career Acceleration',
          description:
            'Prepare for DSA, machine coding, system design, AI-era technical questions, and profile positioning.',
        },
        {
          title: 'Capstone Proof of Skill',
          description:
            'Build serious project proof that shows your capability and engineering maturity.',
        },
      ],
    },

    targetAudience: {
      title: 'This is for engineers who want to increase their market value.',

      subtitle:
        'This page is for working engineers who feel their role, salary, or career growth has slowed down.',

      fitCards: [
        {
          title: 'For',
          type: 'for',
          items: [
            'Engineers stuck in the same salary band',
            'Engineers with 2–7 years of experience',
            'Engineers in service companies who want stronger product roles',
            'Engineers who feel their work is not leading to growth',
            'Engineers who want to become more valuable in the AI era',
            'Engineers who are ready to work seriously on their skills',
          ],
        },
        {
          title: 'Not For',
          type: 'not-for',
          items: [
            'People expecting salary growth without serious preparation',
            'People who want only superficial AI knowledge',
            'People unwilling to practice consistently',
            'People who are not ready to improve fundamentals',
            'People looking for shortcuts instead of capability building',
          ],
        },
      ],
    },

    proof: {
      title:
        'Market value is built through skill, proof, and communication.',

      subtitle:
        'The program is designed to help you build capability, show proof, and communicate your value better.',

      items: [
        {
          title: 'Skill Building',
          description:
            'Develop problem solving, system design, AI-assisted engineering, and production thinking.',
        },
        {
          title: 'Proof of Work',
          description:
            'Build projects, assignments, and capstone submissions that demonstrate your capability.',
        },
        {
          title: 'Interview Performance',
          description:
            'Learn how to explain your experience, projects, decisions, and skills with clarity.',
        },
      ],
    },

    finalCTA: {
      title: 'Want to know where your engineering value stands?',

      description:
        'Complete the AI-Era Engineering Value Check and understand whether this program is the right fit for your next growth stage.',

      cta: {
        label: 'Check Your AI-Era Engineering Value',
        href: '/qualification-form/ai-era-market-value-check',
      },
    },
  },
};

export type LandingPageSlug = keyof typeof landingPages;

export type LandingPageData = (typeof landingPages)[LandingPageSlug];