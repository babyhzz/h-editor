import { LayerConfig } from '@/layers/typing';

interface BasicTitleProps extends LayerConfig {}

const BasicTitle: React.FC<BasicTitleProps> = (props) => {
  const { view, configValues } = props;

  return (
    <div
      style={{
        width: view.w,
        height: view.h,
        lineHeight: view.h,
      }}
    >
      {configValues.text}
    </div>
  );
};

export default BasicTitle;
