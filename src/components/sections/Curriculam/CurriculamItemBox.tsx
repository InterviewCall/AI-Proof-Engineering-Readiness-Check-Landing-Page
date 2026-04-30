import { FC } from 'react';

type CurriculamItemProps = {
    title: string,
    order: number
    description: string
};

const CurriculamItemBox: FC<CurriculamItemProps> = ({ title, order, description }) => {
    return (
        <div className="grid grid-cols-[44px_1fr] items-start gap-3.5 rounded-[18px] border border-(--color-border) bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)] max-sm:grid-cols-1">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-(--color-blue) text-[15px] font-black text-white">
                {order}
            </div>

            <div>
                <h3 className="mb-1 text-lg font-black text-[#020617]">
                    {title}
                </h3>

                <p className="text-[15px] text-(--color-muted-light)">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default CurriculamItemBox;