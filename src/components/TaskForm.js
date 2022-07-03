import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../features/tasks/taskSlice';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

function TaskForm() {

    const [task, setTask] = useState({
        title: "",
        description: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const tasks = useSelector((state) => state.tasks);

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(task.id) {
            dispatch(updateTask(task))
        } else {
            dispatch(addTask({
                ...task,
                id: uuidv4()
            }))
        }
        
        setTask({
            title: "",
            description: ""
        });
        navigate("/")
    }

    const handleBack = (e) => {
        e.preventDefault();
        navigate("/")
    }

    useEffect(() => {
        if(params.id) {
            setTask(tasks.find( task => task.id === params.id ));
        }
    }, [params.id, tasks])
    

  return (
    <div>
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mb-2">
            <div>
                <label htmlFor="title" className="block text-xs font-bold">Title</label>
                <input type="text" name="title" onChange={handleChange} value={task?.title} placeholder="title" className="w-full p-2 rounded-md bg-zinc-600 mb-2" />
            </div>
            <div>
                <label htmlFor="description" className="block text-xs font-bold">Description</label>
                <textarea name="description" onChange={handleChange} value={task?.description} placeholder="description" className="w-full p-2 rounded-md bg-zinc-600 mb-2"></textarea>
            </div>
            <div className="flex gap-x-2">
                <button className="bg-indigo-600 px-2 py-1">Save</button>
                <button className="bg-zinc-600 px-2 py-1" onClick={handleBack}>Back</button>
            </div>
        </form>
    </div>
  )
}

export default TaskForm