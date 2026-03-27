import { useEffect, useState } from "react"
import '../styles/todo.css'

export default function Todo() {

    type TaskType = {
        id: string
        task: string,
        completed: boolean
    }

    const initialTask: TaskType = {
        id: '',
        task: '',
        completed: false
    }

    const initialTasks = () : TaskType[] => {
        const localStorageTasks = localStorage.getItem('tasks');
        return localStorageTasks? JSON.parse(localStorageTasks) : []
    }

    const [taskForm, setTaskForm] = useState<TaskType>(initialTask)
    const [tasks, setTasks] = useState<TaskType[]>(initialTasks)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskForm((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTask : TaskType = {
            ...taskForm,
            id: crypto.randomUUID()
        }
        setTasks(prev => [...prev, newTask])
        setTaskForm(initialTask)
    }

    const isEmptyForm = (): boolean => {
        return taskForm.task.trim() === ''
    }

    const toggleTask = (id: string) => {
        setTasks(prev => prev.map(task => task.id === id ? {...task, completed: !task.completed} : task ))
    }

    const removeTask = (id: string) => {
        setTasks(prevTasks => prevTasks.filter(task=> task.id !== id))
    }

    useEffect(() => { 
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },[tasks])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-96 p-8 space-y-6">
                <h1 className="text-2xl font-bold text-center tracking-tight text-gray-700">Todo App</h1>

                <form className="flex mb-4 gap-2" onSubmit={handleSubmit}>
                    <input
                        id="task"
                        name="task"
                        type="text"
                        value={taskForm.task}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2 rounded-lg bg-white/70 focus:outline-none focus:bg-white"
                        placeholder="Escribe una tarea..."
                    />
                    <button
                        type="submit"
                        disabled={isEmptyForm()}
                        className="px-4 py-2 rounded-lg bg-green-400 text-white hover:bg-green-500 active:scale-95 transition disabled:opacity-40"
                    >
                        Añadir
                    </button>
                </form>

                <ul className="overflow-hidden">
                    {
                        tasks.length === 0 && (
                            <p className="text-sm text-gray-400 text-center py-6">Theres no Task yet </p>
                        )
                    }
                    <div className="max-h-80 overflow-y-auto">
                        {tasks.map((task) => (
                            <li key={task.id} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition group">
                                <span 
                                    className={task.completed ? "line-through text-gray-400 opacity-70 cursor-pointer" : "cursor-pointer"}
                                    onClick={()=> toggleTask(task.id)}
                                    >
                                    {task.task}
                                </span>
                                <button
                                    type="button"
                                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition"
                                    onClick={()=> {removeTask(task.id)}}
                                >
                                    X
                                </button>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    )
}
