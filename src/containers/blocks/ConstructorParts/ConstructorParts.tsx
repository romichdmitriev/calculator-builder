import React, { FC } from 'react';
import clsx from 'clsx';
import { Draggable } from 'react-beautiful-dnd';

// store
import useAppSelector from '@hooks/store/useAppSelector';
import { selectConstructorElements, selectIsConstructorMode } from '@store/constructor/selectors';

// styles
import styles from 'src/containers/blocks/ConstructorParts/ConstructorParts.module.scss';

// components
import * as CalculatorParts from '@components/blocks';

interface ConstructorProps {}

const ConstructorParts: FC<ConstructorProps> = () => {
  const isConstructorMode = useAppSelector(selectIsConstructorMode);
  const elements = useAppSelector(selectConstructorElements);

  return (
    <div
      className={clsx(styles.constructor, {
        [styles.constructor_hidden]: !isConstructorMode,
      })}
    >
      {elements.map((item, index) => {
        const Component = CalculatorParts[item.component];
        return (
          <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={!item.active}>
            {(provided, snapshot) => (
              <>
                <div
                  ref={provided.innerRef}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...provided.draggableProps}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...provided.dragHandleProps}
                  style={{
                    opacity: !item.active ? 0.4 : 1,
                    ...provided.draggableProps.style,
                    transform: snapshot.isDragging ? provided.draggableProps.style?.transform : 'translate(0px, 0px)',
                  }}
                >
                  {item.component === 'Display' ? (
                    <Component key={item.id} disabled defaultValue="0" showDefaultValue />
                  ) : (
                    <Component key={item.id} disabled />
                  )}
                </div>

                {snapshot.isDragging && (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <div className={styles.constructor__dragItemClone}>
                    <Component key={item.id} disabled />
                  </div>
                )}
              </>
            )}
          </Draggable>
        );
      })}
    </div>
  );
};

export default ConstructorParts;
