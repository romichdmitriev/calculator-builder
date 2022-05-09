import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Draggable } from 'react-beautiful-dnd';

// store
import useDispatchActions from '@hooks/store/useDispatchActions';
import useAppSelector from '@hooks/store/useAppSelector';
import { selectCalculatorElements, selectIsConstructorMode } from '@store/constructor/selectors';
import { constructorSliceActions } from '@store/constructor/constructorSlice';
import selectDraggingInfo from '@store/dragging/selectors';

// styles
import styles from 'src/containers/blocks/Calculator/Calculator.module.scss';

// components
import * as CalculatorParts from '@components/blocks';

// assets
import { ReactComponent as AddIcon } from '@icons/drag-component.svg';

// utils
import { DroppableAreas } from '@components/App';
import { CONSTRUCTOR_ELEMENTS } from '@utils/datasets';

type CalculatorProps = {
  isDragOver?: boolean;
};

// eslint-disable-next-line prefer-arrow-callback
const Calculator = forwardRef<HTMLDivElement, CalculatorProps>(function Calculator({ isDragOver }, ref) {
  /* store */
  const elements = useAppSelector(selectCalculatorElements);
  const isConstructorMode = useAppSelector(selectIsConstructorMode);
  const draggingInfo = useAppSelector(selectDraggingInfo);
  const displayContructorPartId = CONSTRUCTOR_ELEMENTS.find((item) => item.component === 'Display')?.id ?? null;

  /* store actions */
  const { removeElement } = useDispatchActions(constructorSliceActions);

  /* return calculator part to constructor on double click and on double touch */
  const handleOnDoubleClickCalculatorParts = (targetId: string, parentId: string) => () => {
    if (!isConstructorMode) return;

    removeElement({
      targetId,
      parentId,
    });
  };

  const handleOnDoubleTouchCalculatorParts = (targetId: string, parentId: string) => {
    let counter = 0;
    let timeout;

    return () => {
      counter += 1;

      // eslint-disable-next-line no-return-assign
      timeout = setTimeout(() => (counter = 0), 160);

      // handle two touches
      if (counter === 2) {
        counter = 0;
        removeElement({
          targetId,
          parentId,
        });
        clearTimeout(timeout);
      }
    };
  };

  /* get active line classes, where part will be included */
  const isPartFromConstructor = draggingInfo.draggingSourceId === DroppableAreas.constructorParts;

  const getActiveLineClassesFromConstructor = (index: number, displayId: string | null) => {
    const targetDestination = draggingInfo.destinationDropIndex;

    return {
      [styles.calculator__item_line]:
        isDragOver &&
        index === (targetDestination ?? 0) - 1 &&
        displayId !== draggingInfo.draggingId &&
        isPartFromConstructor,
      [styles.calculator__item_lineStart]:
        isDragOver && !index && !targetDestination && displayId !== draggingInfo.draggingId && isPartFromConstructor,
    };
  };

  return (
    <div
      ref={ref}
      className={clsx(styles.calculator, {
        [styles.calculator_empty]: !elements.length,
        [styles.calculator_dragOver]: !elements.length && isDragOver && isPartFromConstructor,
      })}
    >
      {elements.length !== 0 &&
        elements.map((item, index) => {
          const Component = CalculatorParts[item.component];

          return (
            <Draggable
              key={item.id}
              draggableId={item.id}
              index={index}
              isDragDisabled={!isConstructorMode || item.component === 'Display'}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...provided.draggableProps}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...provided.dragHandleProps}
                  onDoubleClick={handleOnDoubleClickCalculatorParts(item.id, item.parentId as string)}
                  onTouchStart={handleOnDoubleTouchCalculatorParts(item.id, item.parentId as string)}
                  className={clsx(
                    styles.calculator__item,
                    getActiveLineClassesFromConstructor(index, displayContructorPartId),
                    {
                      [styles.calculator__item_lineStart]:
                        isDragOver &&
                        index === 0 &&
                        draggingInfo.draggingId === displayContructorPartId &&
                        isPartFromConstructor,
                    },
                  )}
                >
                  <Component key={item.id} disabled={isConstructorMode} />
                </div>
              )}
            </Draggable>
          );
        })}

      {!elements.length && (
        <>
          <AddIcon />

          <p className={styles.calculator__text}>
            <span className={styles.calculator__text_pink}>Перетащите сюда</span>
            <span>любой элемент из левой панели</span>
          </p>
        </>
      )}
    </div>
  );
});

export default Calculator;
