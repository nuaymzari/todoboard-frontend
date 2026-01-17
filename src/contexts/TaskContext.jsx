import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();
const BASE_URL = "http://10.0.0.30:8081"

function TaskProvider({ children }) {
    const [taskData, setTaskData] = useState([]);
    const [addingTaskTo, setAddingTaskTo] = useState(null);
    const [action, setAction] = useState("")

    
    // Implement correct error and loading states later

    async function getTaskData() {
        try {
            const res = await fetch(`${BASE_URL}/tasks`)
            const data = await res.json();
            setTaskData(data?.taskData);
            // setTaskData(data)
        } catch (e) {
            console.error("Error: " + e)
        }
    }

    useEffect(function () {
        getTaskData()
    }, [])


    function handleSetAction(action, id=null){
        switch (action){
            case "task/add": {
                setAction("task/add")
                setAddingTaskTo(id);
                break;
            }
            case "person/add": {
                setAction("person/add")
                break;
            }
            case "": {
                setAction("")
                break;
            }
            default: {
                throw new Error("Invalid action")
            }
        }
    }


    async function handleAddTask(task) {
        // title, user, priority, description

        // id here is the user's id, not task id
        const { id, taskName, description, priority } = task

        // console.log(task)
        try {


            const res = await fetch(`${BASE_URL}/tasks`,
                {
                    method: 'POST',
                    body: JSON.stringify({ "name": taskName, description, priority, "person_id": id }),
                    headers: {'Content-Type': 'application/json'},
                }
            )

            getTaskData();



        } catch (e) {
            console.error("Error: " + e)
        }
        setAction("")
    }

    async function handleRemoveTask(id) {
        // each task has its own unique id

        try {

            // First get the other tasks of that user
            const res = await fetch(`${BASE_URL}/tasks/${id}`,
                {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                }
            )

            getTaskData(); // Update screen with new data that was added to server



        } catch (e) {
            console.error("Error: " + e)
        }
        setAction("")
    }

    async function handleAddPerson(name) {
        try {

            // First get the other tasks of that user
            const res = await fetch(`${BASE_URL}/people`,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name})
                }
            )

            getTaskData(); // Update screen with new data that was added to server



        } catch (e) {
            console.error("Error: " + e)
        }
        setAction("")
    }

    async function handleDeletePerson(id) {
        try {

            const res = await fetch(`${BASE_URL}/people/${id}`,
                {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                }
            )

            getTaskData(); // Update screen with new data that was added to server



        } catch (e) {
            console.error("Error: " + e)
        }
    }






    return <TaskContext.Provider value={
        {
            taskData,
            handleSetAction, action, // For action currently being done in UI, like "person/add" and "task/add"

            handleAddTask, handleRemoveTask, addingTaskTo, // If "Add task" button is pressed beneath a specific person's list, this "addingTaskTo" state will hold their id (to fill out form)
            handleAddPerson, handleDeletePerson,
        }
    }>
        {children}
    </TaskContext.Provider>
}

function useTasks() {
    const context = useContext(TaskContext);
    if (context === undefined) throw new Error("TaskContext was used where it was not provided")
    return context;
}

export { TaskProvider, useTasks }