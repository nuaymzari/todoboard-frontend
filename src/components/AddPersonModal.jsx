import { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import { useEffect } from "react";

export default function AddTaskModal() {

    const { handleAddPerson, handleSetAction } = useTasks();

    const [name, setName] = useState("");
    
    const canSubmit = name;
    
    
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

    
    function handleSubmit(e) {
        e.preventDefault(); // No reloading
        if (canSubmit) {
            handleAddPerson(name)
        }
    }

    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40" aria-hidden="true"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-6">
                    <div className="w-full max-w-xl bg-white dark:bg-card-dark rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add New Person</h3>
                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            type="button"
                                onClick={()=>handleSetAction("", null)}
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="px-8 py-6 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Person Name</label>
                                <input
                                    className="w-full h-11 px-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400 outline-none" placeholder="e.g., Snowy Owl" type="text" 
                                    onChange={(e)=>{setName(e.target.value)}}
                                    value={name}
                                />
                            </div>
                            

                

                            <button
                            type="submit"
                            disabled={!canSubmit}
                            className={`flex items-center disabled justify-center gap-2 cursor-pointer rounded-lg h-10 px-5 bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-sm
                                    disabled:bg-gray-400 disabled:cursor-not-allowed
                                `}
                            onClick={()=>{
                                handleSubmit();
                            }}>Add Person</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );
}