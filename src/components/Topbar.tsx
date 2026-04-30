import { FC } from 'react';

type TopbarProps = {
  text: string;
};

const Topbar: FC<TopbarProps> = ({ text }) => {
  return (
    <div className="bg-[#eff6ff] px-4 py-3 text-center text-sm font-extrabold text-(--color-blue-dark)">
      {text}
    </div>
  );
};

export default Topbar;