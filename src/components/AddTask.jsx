import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full bg-emerald-100 rounded-3xl shadow">
      <div className="pt-2 pb-3 relative">
        <h2 className="font-bold text-4xl text-slate-950 text-center">
          New Task
        </h2>
        <button
          aria-expanded={isOpen}
          onClick={() => setIsOpen((s) => !s)}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-200 text-center bg-slate-700 p-2 rounded-2xl hover:bg-slate-400 hover:text-slate-700"
        >
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      </div>

      {isOpen && (
        <div className="pl-4 pr-4 pb-4 pt-1 space-y-4 bg-emerald-100 rounded-3xl shadow w-full">
          <input
            className="outline-slate-950 w-full bg-slate-700 text-left text-slate-200 p-2 rounded-2xl"
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="outline-slate-950 w-full bg-slate-700 text-left text-slate-200 p-2 rounded-2xl resize-none"
            placeholder="Description..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            rows="1"
            style={{ overflow: "hidden", height: "40px" }}
          />
          <input
            className="outline-slate-950 w-full bg-slate-700 text-left text-slate-200 p-2 rounded-2xl"
            type="date"
            placeholder="Deadline..."
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <button
            onClick={() => {
              if (!title.trim() || !description.trim() || !deadline.trim()) {
                setTitle("");
                setDescription("");
                setDeadline("");
                return alert(
                  "Please enter the task title, description, and deadline."
                );
              }
              props.onSubmitTaskClick(title, description, deadline);
              setTitle("");
              setDescription("");
              setDeadline("");
            }}
            className="hover:bg-slate-700 hover:text-slate-200 cursor-pointer w-full text-2xl text-center bg-slate-800 text-slate-300 p-2 rounded-2xl"
          >
            Submit...
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTask;
