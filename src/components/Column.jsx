import { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import Card from "./Card";

export default function Column({person}) {

    const {personName, id, tasks} = person;
    const {handleSetAction, handleDeletePerson} = useTasks();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="column-width flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">{personName.at(0)}</div>
                        <h3 className="font-bold text-sm tracking-tight">{personName}</h3>
                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{tasks.length}</span>
                    </div>

                    <div className="relative">

                    <button 
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        onClick={()=>setIsMenuOpen(true)}
                        ><span className="material-symbols-outlined text-lg">more_horiz</span></button>


                    {isMenuOpen && (
                        <>
                        {/* Invisible backdrop to close menu when clicking outside */}
                        <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
                        
                        <div className="absolute right-0 mt-2 w-36 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg z-20 overflow-hidden">
                            <div className="flex flex-col py-1">
                                
                                <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                    onClick={()=>handleDeletePerson(id)}
                                >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </>
                )}
                </div>
                </div>
                <div className="flex flex-col gap-3">

                    {
                        tasks.map((task)=>{
                            return <Card task={task} key={task.id}/>
                        })
                    }
                    


                    <button 
                        onClick={()=>handleSetAction("task/add",id)}
                        className="group flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium">
                        <span className="material-symbols-outlined text-sm">add</span>
                        <span>Add Task</span>
                    </button>
                </div>
            </div>
    )
}