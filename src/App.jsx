import Board from "./components/Board"
import NavBar from "./components/Navbar"
import AddTaskModal from "./components/AddTaskModal"
import AddPersonModal from "./components/AddPersonModal"
import { TaskProvider, useTasks } from "./contexts/TaskContext"

function App() {

  const {action} = useTasks();

  return (
    <>
        <NavBar />
        <Board />
        {(action == "task/add") && <AddTaskModal/>}
        {(action == "person/add") && <AddPersonModal/>}
    </>
  )
}

export default App
