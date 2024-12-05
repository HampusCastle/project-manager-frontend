import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Task } from '../types/Task';

const statuses = ["TODO", "IN_PROGRESS", "COMPLETED"];

interface TaskColumns {
  [key: string]: Task[];
}

interface ProjectTaskBoardProps {
  tasks: Task[];
  updateTaskStatus: (taskId: string, status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED', projectId: string, title: string, description: string) => Promise<Task>;
  handleDeleteTask: (taskId: string) => void;
  handleUpdateTask: (updatedTask: Task) => void;
  projectId: string;
}

const ProjectTaskBoard: React.FC<ProjectTaskBoardProps> = ({ tasks, updateTaskStatus, handleDeleteTask, handleUpdateTask, projectId }) => {
  const [taskColumns, setTaskColumns] = useState<TaskColumns>({
    TODO: tasks.filter((task) => task.status === "TODO"),
    IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
    COMPLETED: tasks.filter((task) => task.status === "COMPLETED"),
  });

  useEffect(() => {
    setTaskColumns({
      TODO: tasks.filter((task) => task.status === "TODO"),
      IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
      COMPLETED: tasks.filter((task) => task.status === "COMPLETED"),
    });
  }, [tasks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId as keyof TaskColumns;
    const destColumn = destination.droppableId as keyof TaskColumns;

    const movedTask = taskColumns[sourceColumn][source.index];
    movedTask.status = destColumn as 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

    const newColumns: TaskColumns = { ...taskColumns };
    newColumns[sourceColumn].splice(source.index, 1);
    newColumns[destColumn].splice(destination.index, 0, movedTask);

    setTaskColumns(newColumns);

    updateTaskStatus(movedTask.id, movedTask.status, projectId, movedTask.title, movedTask.description);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board grid grid-cols-1 md:grid-cols-3 gap-4">
        {statuses.map((status) => (
          <div key={status} className={`task-column ${status === "TODO" ? 'bg-blue-200' : status === "IN_PROGRESS" ? 'bg-yellow-200' : 'bg-green-200'} p-4 rounded-md`}>
            <h3 className={`text-xl font-semibold mb-4 text-center ${status === "TODO" ? 'text-blue-600' : status === "IN_PROGRESS" ? 'text-yellow-600' : 'text-green-600'}`}>
              {status === "TODO" ? 'To Do' : status === "IN_PROGRESS" ? 'In Progress' : 'Completed'}
            </h3>
            <Droppable droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-column-content"
                >
                  {taskColumns[status].map((task: Task, index: number) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-card bg-white p-4 rounded-lg shadow-sm mb-2 cursor-pointer"
                        >
                          <TaskCard
                            task={task}
                            onDelete={handleDeleteTask}  
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ProjectTaskBoard;