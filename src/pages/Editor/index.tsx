import { Layout } from 'antd';
import styles from './index.less';

interface EditorProps {}

const { Header, Sider, Content } = Layout;

const Editor: React.FC<EditorProps> = (props) => {
  return (
    <div className={styles.page}>
      <div className={styles.header}></div>
      <div className={styles.content}>
        <div className={styles.lib}></div>
        <div className={styles.canvas}></div>
        <div className={styles.config}></div>
      </div>
    </div>
  );
};

export default Editor;
