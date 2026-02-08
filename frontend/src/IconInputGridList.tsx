import IconInputBox from './IconInputBox';
import type { IconInputBoxProps } from './IconInputBox';

export interface IconInputGridSection {
  title?: string;
  inputs: IconInputBoxProps[];
}

export interface IconInputGridListProps {
  grids: IconInputGridSection[];
}

const IconInputGridList = ({ grids }: IconInputGridListProps) => {
  return (
    <>
      {grids.map(({ title, inputs }, gridIndex) => (
        <section className="icon-input-grid" key={`grid-${gridIndex}`}>
          {title && <h2 className="icon-input-grid-title">{title}</h2>}
          {inputs.map((inputConfig, inputIndex) => (
            <IconInputBox
              key={`${inputConfig.iconType}-${gridIndex}-${inputIndex}`}
              {...inputConfig}
            />
          ))}
        </section>
      ))}
    </>
  );
};

export default IconInputGridList;

