import { updateTaskStatus, deleteTask } from '../services/api';
import { toastSuccess, toastError } from '../services/toastConfig'

const Task = ({ task, projectId }: { task: any, projectId: string }) => {
  const handleStatusChange = async (status: string) => {
    try {
      await updateTaskStatus(projectId, task.id, status, task.title, task.description);
      toastSuccess('Uppgiftens status uppdaterad');
    } catch (err) {
      toastError('Fel vid uppdatering av uppgift');
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(projectId, task.id);
      toastSuccess('Uppgiften raderad');
    } catch (err) {
      toastError('Fel vid borttagning av uppgift');
    }
  };

  return (
    <div className="task">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <div>
        <button onClick={() => handleStatusChange('IN_PROGRESS')}>In Progress</button>
        <button onClick={() => handleStatusChange('COMPLETED')}>Complete</button>
        <button onClick={handleDeleteTask}>Delete</button>
      </div>
    </div>
  );
};

export default Task;