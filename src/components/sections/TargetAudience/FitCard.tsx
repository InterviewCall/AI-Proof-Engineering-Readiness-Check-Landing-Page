import { FC } from 'react';

type FitCardProps = {
    title: string
    items: string[],
    type: 'for' | 'not-for'
}

const FitCard: FC<FitCardProps> = ({ title, items, type }) => {
  return (
    <div className="rounded-3xl border border-(--color-border) bg-white p-7 shadow-(--shadow-card) max-sm:p-5.5">
      <h3 className="mb-4.5 text-2xl font-black text-[#020617]">
        {title}
      </h3>

      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-2.75 text-[15px] font-semibold text-[#334155]"
          >
            {type === 'for' ? (
              <span className="mt-px grid h-5.75 w-5.75 min-w-5.75 place-items-center rounded-full bg-(--color-green) text-sm font-black text-white">
                ✓
              </span>
            ) : (
              <span className="mt-px grid h-5.75 w-5.75 min-w-5.75 place-items-center rounded-full bg-[#fee2e2] text-sm font-black text-[#b91c1c]">
                ×
              </span>
            )}

            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitCard;