import type { LayerConfig } from '@/layers/typing';

const TitleBg: React.FC<LayerConfig> = (props) => {
  const { configValues } = props;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${configValues?.backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
    />
  );
};

export default TitleBg;
