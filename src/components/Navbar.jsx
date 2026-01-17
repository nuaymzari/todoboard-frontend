import { useTasks } from "../contexts/TaskContext"

export default function NavBar() {

    const {handleSetAction} = useTasks();

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-10 py-3">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-xl">view_kanban</span>
                    </div>
                    <h2 className="text-lg font-extrabold leading-tight tracking-tight">Todo Board</h2>
                </div>
                {/* <label className="flex flex-col min-w-64 h-10">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-[#f0f4f4] dark:bg-slate-800/50">
                        <div className="text-[#638887] dark:text-slate-400 flex items-center justify-center pl-4">
                            <span className="material-symbols-outlined text-xl">search</span>
                        </div>
                        <input className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 placeholder:text-[#638887] dark:placeholder:text-slate-500 text-sm font-normal" placeholder="Search tasks, people, or tags..." />
                    </div>
                </label> */}
            </div>
            <div className="flex items-center gap-6">
                {/* <div className="flex -space-x-3">
                    <div className="size-8 rounded-full border-2 border-white dark:border-slate-900 bg-cover bg-center" data-alt="Avatar of team member Alex" style={{backgroundImage:""}}></div>
                    <div className="size-8 rounded-full border-2 border-white dark:border-slate-900 bg-cover bg-center" data-alt="Avatar of team member Sarah" style={{backgroundImage:""}}></div>
                    <div className="size-8 rounded-full border-2 border-white dark:border-slate-900 bg-cover bg-center" data-alt="Avatar of team member Jordan" style={{backgroundImage:""}}></div>
                    <div className="size-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">+2</div>
                </div> */}
                <button className="flex items-center gap-2 cursor-pointer rounded-lg h-10 px-5 bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-sm"
                    onClick={()=>handleSetAction("task/add", null)}
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>New Task</span>
                </button>
                {/* <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border border-slate-200 dark:border-slate-600" data-alt="User profile picture" style={{backgroundImage:""}}></div> */}
            </div>
        </header>
    )
}


