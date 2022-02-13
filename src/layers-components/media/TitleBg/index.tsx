const TitleBg: LayerComponent = (props) => {
  const { comProps } = props;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${comProps?.backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
    />
  );
};

export default TitleBg;
