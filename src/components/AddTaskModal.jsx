import { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import { useEffect } from "react";

export default function AddTaskModal() {

    const { handleSetAction, taskData, handleAddTask, addingTaskTo } = useTasks();

    const [title, setTitle] = useState("");
    const [user, setUser] = useState(addingTaskTo);
    const [priority, setPriority] = useState("low");
    const [description, setDescription] = useState("");

    const canSubmit = title && user && priority;


    // For allowing escape key to exit form:

    useEffect(function() {
        console.log("effect called")
        function callback(e) {
            if(e.code === 'Escape') {
                handleSetAction("", null)
            }
        }

        document.addEventListener('keydown', callback);

        return function() {
            document.removeEventListener('keydown', callback)
        }

    }, [handleSetAction])



    // HTML forms: when enter is pressed, automatically clicks first button in form
    // Setting type of button to "button" will skip that button
    
    function handleSubmit(e) {
        e.preventDefault(); // No reloading
        if (canSubmit) {
            handleAddTask({taskName: title, id: user, priority, description})
        }
    }

    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40" aria-hidden="true"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-6">
                    <div className="w-full max-w-xl bg-white dark:bg-card-dark rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Create New Task</h3>
                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                onClick={()=>handleSetAction("", null)}
                                type="button" 
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="px-8 py-6 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Task Title</label>
                                <input
                                    className="w-full h-11 px-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400 outline-none" placeholder="e.g., Clean litter box" type="text" 
                                    onChange={(e)=>{setTitle(e.target.value)}}
                                    value={title}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Assign to User</label>
                                    <div className="relative">
                                        <select
                                            className="appearance-none w-full h-11 pl-4 pr-10 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm text-slate-700 dark:text-slate-300 outline-none"
                                            onChange={(e)=>setUser(e.target.value)}
                                            value= {user}
                                        >
                                            <option value="" selected disabled hidden>-- Choose here --</option>
                                            {
                                            taskData.map((user)=>{
                                                return <option value={user.id}
                                                    key={user.id}
                                                >{user.personName}
                                                </option>
                                            })
                                            
                                            }
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <span className="material-symbols-outlined text-xl">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Priority</label>
                                    <div className="relative">
                                        <select className="appearance-none w-full h-11 pl-4 pr-10 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm text-slate-700 dark:text-slate-300 outline-none"
                                            onChange={(e)=>{setPriority(e.target.value)}}
                                            value={priority}
                                        >
                                            <option value="low">Low</option>
                                            <option selected="" value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <span className="material-symbols-outlined text-xl">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Task Description</label>
                                <textarea
                                    className="w-full p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400 outline-none resize-none"
                                    placeholder="Briefly describe what needs to be done..." rows="4"
                                    onChange={(e)=>setDescription(e.target.value)}
                                    value={description}
                                    >
                                        
                                    </textarea>
                            </div>

                            <button
                            type="submit"
                            disabled={!canSubmit}
                            className={`flex items-center disabled justify-center gap-2 cursor-pointer rounded-lg h-10 px-5 bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-sm
                                    disabled:bg-gray-400 disabled:cursor-not-allowed
                                `}
                            onClick={(e)=>{
                                handleSubmit(e)
                            }}>Add new task</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );
}