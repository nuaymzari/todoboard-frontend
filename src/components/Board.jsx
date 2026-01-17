import { useTasks } from "../contexts/TaskContext";
import Column from "./Column";

export default function Board() {

    const {taskData, handleSetAction} = useTasks();

    return (
        <main className="flex-1 px-10 py-8 overflow-x-auto custom-scrollbar flex gap-6 items-start">

            
            {
                taskData?.map((person)=>{
                    return <Column person={person} key={person.id}/>
                })
            }

            <div className="column-width flex flex-col pt-1">
                <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-400 dark:text-slate-500 transition-all font-bold text-sm"
                    onClick={()=>handleSetAction("person/add")}
                >
                    <span className="material-symbols-outlined">add_circle</span>
                    <span>Add Person</span>
                </button>
            </div>
        </main>
    )
}