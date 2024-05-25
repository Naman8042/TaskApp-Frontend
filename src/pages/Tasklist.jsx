import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Tasklist = () => {
  const navigate = useNavigate() 
  const[tasks,setTasks] = useState([]) 
  
  
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:4000/tasks');
      setTasks(response.data);
      console.log(response.data)
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:4000/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };
  
  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  };

  const handleCreate = () => {

    navigate("/create")
  };
  return (
    <div className='bg-gray-200 h-full'>
      <h1 className='text-5xl text-center py-[1%] '>Task List</h1>
      <div className='h-[10%] w-full flex justify-center items-center px-[5%] my-[1%]'>
      <div className='h-full w-full flex justify-center items-center rounded-2xl'>
      <button onClick={handleCreate} className='bg-red-400 px-[2%] py-[0.75%] text-white text-xl rounded-3xl'>Create New Task</button>
      </div>
      </div>
      <div className='px-[5%]'>
        <div className='bg-white w-full rounded-2xl py-[1%]'>
        
        <div className='flex w-full justify-between  px-[4%] text-lg font-semibold'>
            <h1 className='w-[20%] text-center'>Title</h1>
            <h1 className='text-center w-[20%]'>Status</h1>
            <h1 className='text-center w-[20%]'>Due Date</h1>
            <p className='w-[10%]'></p>
            <p className='w-[10%]'></p>
        </div>    
        {tasks.map(task => (
        <div key={task._id} className='flex justify-between items-center px-[4%] py-[1.5%]'>
          <h2 className='w-[20%] text-center text-lg font-semibold'>{task.title}</h2>
          <p className='w-[20%] text-center flex justify-center items-center'>
            <p className='w-[50%] bg-blue-400 p-[3%] text-white text-base rounded-xl'>
            {task.status}
            </p>
            </p>
          <p className='w-[20%] text-center text-base'>{new Date(task.dueDate).toLocaleDateString()}</p>
          <button onClick={() => handleEdit(task._id)} className='w-[10%]  bg-blue-400 p-[0.6%] text-white text-base rounded-xl'>Edit</button>
          <button onClick={() => deleteTask(task._id)} className='w-[10%]  bg-blue-400 p-[0.6%] text-white text-base rounded-xl'>Delete</button>
        </div>
      ))}
        </div>
      </div>
    </div>
  )
}

export default Tasklist
