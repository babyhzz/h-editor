import { Button, Tooltip } from 'antd';
import IconFont from '@/components/IconFont';

interface SwitchButtonProps {
  iconType: string;
  title: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = (props) => {
  const { iconType, title } = props;
  return (
    <div>
      <Tooltip title={title}>
        <Button type="primary" icon={<IconFont type={iconType} style={{ color: 'red' }} />} />
      </Tooltip>
    </div>
  );
};

export default SwitchButton;
