import { Button } from "@nextui-org/button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownwardRounded";
import { Card } from "@nextui-org/react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { useMemo } from "react";

import { StrictModeDroppable } from "@/components/strict-mode-droppable.tsx";

interface OrderedListProps<T> {
  id: string;
  canManuallyOrder: boolean;
  displayElement: (elem: T) => JSX.Element;
  elements: Array<T>;
  getKey: (elem: T) => string;
  setElements: (elements: Array<T>) => void;
}

export default function OrderedList<T>({
  id,
  canManuallyOrder,
  displayElement,
  elements,
  getKey,
  setElements,
}: OrderedListProps<T>) {
  const ids = useMemo(() => elements.map((elem) => getKey(elem)), [elements]);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (!result.destination) return;

        const newElements = new Array(...elements);

        const [reorderedItem] = newElements.splice(result.source.index, 1);

        newElements.splice(result.destination.index, 0, reorderedItem);

        setElements(newElements);
      }}
    >
      <StrictModeDroppable droppableId={id}>
        {(provided) => (
          <ul
            className={"flex flex-col"}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {elements.map((elem, i) => (
              <Draggable
                key={ids[i]}
                draggableId={ids[i]}
                index={i}
                isDragDisabled={!canManuallyOrder}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    className="my-1"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card className="flex flex-row justify-center items-center">
                      <div className="flex-grow w-max h-min mx-2.5">
                        {displayElement(elem)}
                      </div>

                      {canManuallyOrder ? (
                        <>
                          <Button
                            isIconOnly
                            isDisabled={i <= 0}
                            variant="light"
                            onClick={() =>
                              setElements([
                                ...elements.slice(0, i - 1),
                                elements[i],
                                elements[i - 1],
                                ...elements.slice(i + 1),
                              ])
                            }
                          >
                            <ArrowUpwardIcon />
                          </Button>
                          <Button
                            isIconOnly
                            isDisabled={i >= elements.length - 1}
                            variant="light"
                            onClick={() =>
                              setElements([
                                ...elements.slice(0, i),
                                elements[i + 1],
                                elements[i],
                                ...elements.slice(i + 2),
                              ])
                            }
                          >
                            <ArrowDownwardIcon />
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}

                      <Button
                        isIconOnly
                        color="danger"
                        variant="light"
                        onClick={() =>
                          setElements([
                            ...elements.slice(0, i),
                            ...elements.slice(i + 1),
                          ])
                        }
                      >
                        <CloseRoundedIcon />
                      </Button>
                    </Card>
                  </li>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </ul>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
