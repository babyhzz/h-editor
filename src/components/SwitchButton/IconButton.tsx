import IconFont from '@/components/IconFont';
import { Tooltip } from 'antd';
import styles from './index.less';

interface IconButtonProps {
  iconType: string;
  title?: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { iconType, title, onClick } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Tooltip title={title}>
      <div className={styles.button} onClick={handleClick}>
        {<IconFont type={iconType} />}
      </div>
    </Tooltip>
  );
};

export default IconButton;
