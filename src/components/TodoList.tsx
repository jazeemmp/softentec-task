import React, { useState } from "react";
import { MdDeleteForever, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Task {
  register_no: string;
  name: string;
  total_mark: number;
  completed: boolean;
}

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(0);
  const [newTask, setNewTask] = useState<Partial<Task>>({});
  const [toggleDark,setToggleDark] = useState<boolean>(false)

  const handleNext = () => {
    if (step === 0) {
      if(!inputValue) return;
      setNewTask({ register_no: inputValue });
    } else if (step === 1) {
      if(!inputValue) return;
      setNewTask((prev) => ({ ...prev, name: inputValue }));
    } else if (step === 2) {
      if(!inputValue) return;
      const task: Task = {
        register_no: newTask.register_no || "",
        name: newTask.name || "",
        total_mark: Number(inputValue),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask({});
      setInputValue("");
      setStep(0);
      return;
    }
    setInputValue("");
    setStep(step + 1);
  };

  const removeTask = (register_no: string) => {
    setTasks(tasks.filter((task) => task.register_no !== register_no));
  };

  const toggleCompletion = (register_no: string) => {
    setTasks(
      tasks.map((task) =>
        task.register_no === register_no
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <div className={`flex flex-col gap-6 items-center justify-center  h-screen ${toggleDark ? "bg-[#121212] text-white " : "bg-[#faf9f6]"}`}>
      <div className={`shadow-md md:w-[500px] w-[90%] p-4 px-6 rounded-3xl ${toggleDark ? "bg-[#272626]" : "bg-[#fff]"}`}>
        <h2 className={`text-3xl text-center font-bold mb-4`}>To-Do List</h2>
        <div className="mb-4">
          <input
            type={step === 2 ? "number" : "text"}
            placeholder={
              step === 0
                ? "Enter Register No"
                : step === 1
                ? "Enter Task Name"
                : "Enter Total Mark"
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`border-2  outline-[#4dacff] p-2 mr-2 w-full text-xl rounded ${toggleDark ? "text-[#fff] border-[#5a5a5a]" : "text-gray-400 border-[#d2d2d2]"} `}
          />
          <button
            onClick={handleNext}
            className="bg-[#4dacff]  rounded-bl-2xl mb-5 rounded-tr-2xl  text-xl  p-2 mt-4 w-full"
          >
            {step < 2 ? "Next" : "Add Task"}
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.register_no}
              className={`p-4 border-2 border-[#bebebe] rounded mb-6   flex relative justify-between  items-center ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {" "}
              <div className=" flex gap-4 items-center justify-center">
                <button onClick={() => toggleCompletion(task.register_no)}>
                  {task.completed ? (
                    <FaRegCheckCircle className="text-2xl text-green-400" />
                  ) : (
                    <MdOutlineRadioButtonUnchecked className="text-2xl text-gray-400" />
                  )}
                </button>
                <div className="text-lg">
                  <span className="absolute -top-4 bg-[#4dacff] text-white rounded px-4  left-1/2 -translate-x-1/2">
                    {task.register_no}
                  </span>
                 <span className="capitalize">
                 {task.name} - ({task.total_mark})
                 </span>
                </div>
              </div>
              <button onClick={() => removeTask(task.register_no)}>
                <MdDeleteForever className="text-2xl text-red-600" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={()=>setToggleDark(!toggleDark)} className={` cursor-pointer font-semibold rounded-md px-4 py-2 text-xl ${toggleDark ? "bg-[#fff] text-black" : "bg-[#272626] text-white"}`}>Change Style</button>
      <Link to="/paginated-data" className="text-2xl text-blue-400 underline">Task 3 (Pagination)</Link>
    </div>
  );
};

export default ToDoList;
