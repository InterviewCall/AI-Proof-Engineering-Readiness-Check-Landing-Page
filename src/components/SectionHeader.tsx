import { FC } from 'react';

type SectionHeaderProps = {
    title: string;
    subtitle: string
    dark?: boolean
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, subtitle, dark = false}) => {
  return (
    <div className="mx-auto w-[min(1180px,92%)]">
      <h2
        className={`mb-4 text-center text-[clamp(32px,4vw,48px)] font-black leading-[1.1] tracking-[-1.1px] ${
          dark ? 'text-white' : 'text-[#020617]'
        }`}
      >
        {title}
      </h2>

      <p
        className={`mx-auto mb-11 max-w-197.5 text-center text-lg ${
          dark ? 'text-[#cbd5e1]' : 'text-(--color-muted)'
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;