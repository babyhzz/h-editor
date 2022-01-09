import IconFont from '@/components/IconFont';
import { templateMap } from '@/layers';
import type { LayerTemplate } from '@/layers/typing';
import styles from './index.less';
import thumbMap from './thumbMap';

interface ComponentThumbProps {
  template: LayerTemplate;
}

const ComponentThumb: React.FC<ComponentThumbProps> = (props) => {
  const { template } = props;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(template));
    // TODO: dropEffect的区别是什么
    // e.dataTransfer.dropEffect = 'move';
    // e.dataTransfer.setDragImage()
  };

  return (
    <div key={template.type} draggable onDragStart={handleDragStart}>
      <div className={styles.thumbContainer}>
        <div className={styles.thumbHeader}>{template.name}</div>
        <div className={styles.thumbContent}>{<img src={thumbMap[template.type]} />}</div>
      </div>
    </div>
  );
};

export default ComponentThumb;
