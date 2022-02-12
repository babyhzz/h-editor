import styles from './index.less';
import thumbMap from '@/assets/thumb';
import { useDrag } from 'ahooks';
import { useRef } from 'react';

interface ComponentThumbProps {
  template: ComponentTemplate;
}

const ComponentThumb: React.FC<ComponentThumbProps> = (props) => {
  const { template } = props;
  const dragRef = useRef<HTMLDivElement>(null);

  useDrag(template, dragRef, {
    onDragStart: () => {},
    onDragEnd: () => {},
  });

  return (
    <div key={template.type} ref={dragRef}>
      <div className={styles.thumbContainer}>
        <div className={styles.thumbHeader}>{template.name}</div>
        <div className={styles.thumbContent}>{<img src={thumbMap[template.type]} />}</div>
      </div>
    </div>
  );
};

export default ComponentThumb;
