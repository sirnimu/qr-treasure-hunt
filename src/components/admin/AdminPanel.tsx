import { Typography } from "@mui/material";
import BasePage from "../ui/BasePage";
import TaskForm from "./TaskForm";
import { useGetTasks } from "../hooks/useGetTasks";

const AdminPanel = () => {
  const { tasks } = useGetTasks();

  return (
    <BasePage>
      <Typography variant="h2">Užduotys</Typography>

      {tasks.map((task) => (
        <TaskForm key={task.index} task={task} />
      ))}
    </BasePage>
  );
};

export default AdminPanel;
