import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SwitchButton from '@/components/SwitchButton';

interface HeaderToolProps {
  // iconType: string;
  // title: string;
}

const HeaderTool: React.FC<HeaderToolProps> = (props) => {
  return (
    <div>
      <Tooltip title="search">
        {/* <Button type="primary" shape="circle" icon={<SearchOutlined />} /> */}
        <SwitchButton iconType="icon-config" title="属性配置" />
      </Tooltip>
    </div>
  );
};

export default HeaderTool;
