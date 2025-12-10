import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Tasks(props) {
  const navigate = useNavigate();

  function onViewDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    query.set("deadline", task.deadline);
    navigate(`/task?${query.toString()}`);
  }

  function formatDate(dateString) {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="w-full bg-emerald-100 rounded-3xl shadow">
      <h2 className="pt-2 text-center font-bold text-4xl text-slate-950">
        Your Tasks
      </h2>
      <ul className="space-y-3 p-4">
        {props.tasks.map((task) => (
          <li key={task.id} className="flex gap-1">
            <button
              onClick={() => props.onTaskClick(task.id)}
              className={`cursor-pointer text-slate-200 text-left bg-slate-700 p-2 rounded-2xl w-full ${
                task.completed && "line-through"
              }`}
            >
              {task.title}
            </button>

            <div className="whitespace-nowrap text-slate-200 text-left bg-slate-700 p-2 rounded-2xl ">
              {formatDate(task.deadline)}
            </div>

            <button
              onClick={() => onViewDetailsClick(task)}
              className="cursor-pointer text-slate-200 text-center bg-slate-700 p-2 rounded-2xl hover:bg-slate-400 hover:text-slate-700"
            >
              <ChevronRightIcon />
            </button>

            <button
              onClick={() => props.onDeleteTaskClick(task.id)}
              className={`cursor-pointer text-slate-200 text-center bg-slate-700 p-2 rounded-2xl hover:bg-slate-400 hover:text-slate-700 ${
                task.completed && "line-through"
              }`}
            >
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
