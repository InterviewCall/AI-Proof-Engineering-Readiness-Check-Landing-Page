'use client';

import dynamic from 'next/dynamic';

const QualificationFormClient = dynamic(
    () => import('@/components/QualificationFormClient'),
    {
        ssr: false,
        loading: () => (
            <main className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,rgba(37,99,235,0.12),transparent_30%),var(--form-bg)] px-4 py-9 text-(--form-text) max-sm:p-0">
                <section className="mx-auto w-[min(820px,100%)] overflow-hidden rounded-3xl border border-(--form-border) bg-(--form-white) shadow-(--form-shadow) max-sm:min-h-screen max-sm:rounded-none max-sm:border-0">
                    <div className="p-8">
                        <div className="skeleton mb-4 h-10 w-3/4"></div>
                        <div className="skeleton mb-8 h-5 w-full"></div>
                        <div className="skeleton h-72 w-full"></div>
                    </div>
                </section>
            </main>
        )
    }
);

function QualificationFormPage() {
    return (
        <QualificationFormClient />
    );
}

export default QualificationFormPage;