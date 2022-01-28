import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface HeaderToolProps {}

const HeaderTool: React.FC<HeaderToolProps> = (props) => {
  return (
    <div>
      <Tooltip title="search">
        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
    </div>
  );
};

export default HeaderTool;
