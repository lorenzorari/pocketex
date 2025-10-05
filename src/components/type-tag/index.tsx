import { SVG } from '@/components/SVG';

interface Props {
  value: string;
  className?: string;
}

const TypeTag = ({ value }: Props) => {
  const src = `/assets/svg/pokemon-types/${value}.svg`;
  const tagStyle = {
    '--color-type-1': `var(--color-${value}-1)`,
    color: 'var(--color-type-1)',
  } as React.CSSProperties;

  return (
    <div className="flex size-[2.4rem] items-center justify-center rounded-full bg-white">
      <SVG style={tagStyle} className="block size-full p-[.4rem]" src={src} />
    </div>
  );
};

export default TypeTag;
