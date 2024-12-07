'use client'
import { useEffect, useState } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Droppable {...props} isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
      {children}
    </Droppable>
  );
}; 