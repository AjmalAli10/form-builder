'use client'
import { useEffect, useState } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setEnabled(true);
    });

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return (
      <div style={{ visibility: 'hidden' }}>
        <Droppable {...props} isDropDisabled={true} isCombineEnabled={false} ignoreContainerClipping={false}>
          {children}
        </Droppable>
      </div>
    );
  }

  return (
    <Droppable {...props} isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
      {children}
    </Droppable>
  );
}; 