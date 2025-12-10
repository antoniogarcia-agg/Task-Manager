import { ChevronLeftIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function TaskPages() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const deadline = searchParams.get("deadline");
  const navigate = useNavigate();

  function onReturnClick() {
    navigate(`/`);
  }

  function formatDate(dateString) {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="w-screen h-screen bg-slate-950 flex justify-center p-7">
      <div className="space-y-4">
        <div className="pb-8 flex w-full justify-center items-center relative">
          <button
            onClick={() => onReturnClick()}
            className="cursor-pointer text-slate-200 text-center bg-slate-700 p-2 rounded-2xl hover:bg-slate-400 hover:text-slate-700 absolute left-0 bottom-8.5"
          >
            <ChevronLeftIcon />
          </button>
          <h1 className="text-6xl text-slate-400 font-bold text-center">
            Task details
          </h1>
        </div>
        <div className="w-[500px] space-y-6 p-6 rounded 3xl bg-emerald-100 text shadow">
          <h1 className="text-left font-bold text-4xl text-slate-950">
            {title}
          </h1>

          <p className="text-left font-bold text-2xl text-slate-700">
            Description: {description}
          </p>

          <p className="text-left font-bold text-2xl text-slate-700">
            Deadline: {formatDate(deadline)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskPages;
