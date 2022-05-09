import React, { useCallback } from 'react';
import { DragDropContext, DragStart, DragUpdate, Droppable, DropResult } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { useDebouncedCallback } from 'use-debounce';

// store
import useAppSelector from '@hooks/store/useAppSelector';
import { constructorSliceActions } from '@store/constructor/constructorSlice';
import useDispatchActions from '@hooks/store/useDispatchActions';
import {
  selectCalculatorElements,
  selectConstructorElements,
  selectIsConstructorMode,
} from '@store/constructor/selectors';

// components
import Wrapper from '@components/partials/Wrapper/Wrapper';
import Header from '@components/partials/Header/Header';
import Calculator from '@containers/blocks/Calculator/Calculator';
import ConstructorParts from '@containers/blocks/ConstructorParts/ConstructorParts';

// styles
import styles from '@components/App.module.scss';

// schema
import ConstructorElement from '@schema/Constructor';
import { draggingSliceActions } from '@store/dragging/draggingSlice';

export enum DroppableAreas {
  'constructorParts' = 'constructorParts',
  'calculator' = 'calculator',
}

function App() {
  // store
  const { addElement, removeElement, sortElements, setDroppableDestinationIndex } = useDispatchActions({
    ...constructorSliceActions,
    ...draggingSliceActions,
  });
  const constructorElements = useAppSelector(selectConstructorElements);
  const calculatorElements = useAppSelector(selectCalculatorElements);
  const isConstructorMode = useAppSelector(selectIsConstructorMode);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      // if we build calculator from parts
      if (
        source.droppableId === DroppableAreas.constructorParts &&
        destination?.droppableId === DroppableAreas.calculator
      ) {
        const draggingPart = constructorElements[source.index];
        const targetIndex = destination.index;

        const clonedPart = new ConstructorElement(draggingPart.component, false, draggingPart.id);

        addElement({ element: clonedPart, targetIndex });
        setDroppableDestinationIndex({
          destinationDropIndex: null,
          draggingId: null,
          draggingSourceId: null,
          draggingIndex: null,
        });
      }

      // if we dragging parts from builded calculator to constructor for removing parts
      if (
        source.droppableId === DroppableAreas.calculator &&
        destination?.droppableId === DroppableAreas.constructorParts
      ) {
        const draggingPart = calculatorElements[source.index];

        removeElement({
          targetId: draggingPart.id,
          parentId: draggingPart.parentId,
        });
      }

      // if we dragging parts inside builded calculator
      if (source.droppableId === DroppableAreas.calculator && destination?.droppableId === DroppableAreas.calculator) {
        sortElements({
          draggedIndex: source.index,
          targetIndex: destination.index,
        });
      }
    },
    [constructorElements, addElement, setDroppableDestinationIndex, calculatorElements, removeElement, sortElements],
  );

  const onDragUpdate = useDebouncedCallback((initial: DragUpdate) => {
    setDroppableDestinationIndex({
      destinationDropIndex: initial.destination?.index ?? null,
      draggingId: initial.draggableId ?? null,
      draggingSourceId: (initial.source?.droppableId as keyof typeof DroppableAreas) ?? null,
      draggingIndex: initial.source?.index ?? null,
    });
  }, 100);

  const onDragStart = useCallback(
    (initial: DragStart) => {
      setDroppableDestinationIndex({
        destinationDropIndex: null,
        draggingId: initial.draggableId,
        draggingSourceId: null,
        draggingIndex: initial.source.index,
      });
    },
    [setDroppableDestinationIndex],
  );

  return (
    <Wrapper>
      <Header />

      <main
        className={clsx(styles.content, {
          [styles.content_runtimeMode]: !isConstructorMode,
        })}
      >
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate} onDragStart={onDragStart}>
          <Droppable droppableId={DroppableAreas.constructorParts}>
            {(provided) => (
              <section ref={provided.innerRef}>
                <ConstructorParts />

                <span style={{ display: 'none' }}>{provided.placeholder}</span>
              </section>
            )}
          </Droppable>

          <Droppable droppableId={DroppableAreas.calculator}>
            {(provided, snapshot) => (
              <section
                className={clsx({
                  [styles.content_calculator]: !isConstructorMode,
                })}
              >
                <Calculator ref={provided.innerRef} isDragOver={snapshot.isDraggingOver} />
                <span style={{ display: 'none' }}>{provided.placeholder}</span>
              </section>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </Wrapper>
  );
}

export default App;
