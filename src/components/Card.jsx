import { useTasks } from "../contexts/TaskContext";

export default function Card({task}) {

    const {handleRemoveTask} = useTasks();
    const {taskName, description, priority, id} = task;

    return (
        <div className="group flex flex-col gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-grab active:cursor-grabbing">
            <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded
                    ${priority == "high" ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : ""}    
                    ${priority == "medium" ? "bg-primary/10 dark:bg-primary/20 text-primary" : ""}    
                    ${priority == "low" ? "bg-slate-100 dark:bg-slate-800 text-slate-500" : ""}    
                `}>
                    {
                    (priority == "high") && "High Priority" ||
                    (priority == "medium") && "Medium Priority" ||
                    (priority == "low") && "Low Priority"
                    }
                </span> 
                                                                                                    {/* bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 "for High Priority" */}
                                                                                                    {/* bg-primary/10 dark:bg-primary/20 text-primary "for Medium Priority" */}
                                                                                                    {/* bg-slate-100 dark:bg-slate-800 text-slate-500 "and Low Priority" */}
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                onClick={()=>{handleRemoveTask(id)}}
                            >
                                <span className="material-symbols-outlined">check</span>
                            </button>
            </div>

            <div className="flex flex-col gap-1">
                <h4 className="font-bold text-[#111818] dark:text-white leading-tight">{taskName}</h4>
                <p className="text-sm text-[#638887] dark:text-slate-400 line-clamp-2">{description}</p>
            </div>

            {/* <div className="flex items-center justify-between mt-1 pt-3 border-t border-slate-50 dark:border-slate-800/50">
                <div className="flex items-center gap-3 text-slate-400">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">chat_bubble</span>
                        <span className="text-[10px] font-bold">0</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">attach_file</span>
                        <span className="text-[10px] font-bold">0</span>
                    </div>
                </div>
                <div className="size-6 rounded-full bg-cover bg-center" data-alt="Assignee Alex"></div>
            </div> */}
        </div>
    )
}