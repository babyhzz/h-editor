import IconFont from '@/components/IconFont';
import { useControllableValue } from 'ahooks';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

interface SwitchButtonProps {
  iconType: string;
  title?: string;
  value?: boolean;
  onChange?: (value: boolean) => void | undefined;
}

const SwitchButton: React.FC<SwitchButtonProps> = (props) => {
  const { iconType, title } = props;

  const [state, setState] = useControllableValue<boolean>(props, {
    defaultValue: false,
  });

  return (
    <Tooltip title={title}>
      <div
        className={classNames(styles.button, {
          [styles.buttonActive]: state,
        })}
        onClick={() => setState(!state)}
      >
        {<IconFont type={iconType} />}
      </div>
    </Tooltip>
  );
};

export default SwitchButton;
