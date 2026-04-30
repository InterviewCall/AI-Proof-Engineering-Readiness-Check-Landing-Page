import { FC } from 'react';

type HeroBulletProps = {
    text: string
};

const HeroBullet: FC<HeroBulletProps> = ({ text }) => {
  return (
    <div className="flex items-start gap-3 text-base font-semibold text-[#1e293b]">
      <span className="mt-px grid h-5.75 w-5.75 min-w-5.75 place-items-center rounded-full bg-(--color-green) text-sm font-black text-white">
        ✓
      </span>
      <span>{text}</span>
    </div>
  );
};

export default HeroBullet;