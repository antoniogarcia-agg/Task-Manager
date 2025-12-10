import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onTaskClick(taskID) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskID) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskID) {
    const newTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(newTasks);
  }

  function onSubmitTaskClick(taskTitle, taskDesc, taskDL) {
    const newTask = {
      id: v4(),
      title: taskTitle,
      description: taskDesc,
      deadline: taskDL,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 flex justify-center p-7 overflow-y-scroll">
      <div className="w-[700px] space-y-4">
        <h1 className="mb-8 text-6xl text-slate-400 font-bold text-center">
          Task Manager
        </h1>
        <AddTask onSubmitTaskClick={onSubmitTaskClick} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
