import { FC } from 'react';

type PositioningItemProps = {
    text: string
}

const PositioningItem: FC<PositioningItemProps> = ({ text }) => {
  return (
    <div className="rounded-2xl bg-white/10 p-4 text-[15px] font-extrabold text-white">
      {text}
    </div>
  );
};

export default PositioningItem;