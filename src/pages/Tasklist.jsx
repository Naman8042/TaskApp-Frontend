import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Tasklist = () => {
  const navigate = useNavigate() 
  const[tasks,setTasks] = useState([]) 
  
  
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('https://task-2ngl.onrender.com/tasks');
      setTasks(response.data);
      console.log(response.data)
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`https://task-2ngl.onrender.com/tasks/${id}`);
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
      <h1 className='text-3xl lg:text-5xl text-center py-[1%] '>Task List</h1>
      <div className='h-[10%] w-full flex justify-center items-center px-[5%] my-[1%]'>
      <div className='h-full w-full flex justify-center items-center rounded-2xl'>
      <button onClick={handleCreate} className='bg-red-400 px-[2%] py-[0.75%] text-white text-xl rounded-3xl'>Create New Task</button>
      </div>
      </div>
      <div className='md:px-[5%] px-[1%]'>
        <div className='bg-white w-full rounded-2xl py-[1%]'>
        
        <div className='flex w-full justify-between px-[2%] md:px-[4%] text-lg font-semibold'>
            <h1 className='w-[25%] text-center text-sm md:text-lg '>Title</h1>
            <h1 className='text-center w-[25%] text-sm md:text-lg'>Status</h1>
            <h1 className='text-center w-[25%] text-sm md:text-lg'>Due Date</h1>
            <p className='w-[12.5%]'></p>
            <p className='w-[12.5%]'></p>
        </div>    
        {tasks.map(task => (
        <div key={task._id} className='flex justify-between items-center px-[2%] md:px-[4%] py-[1.5%]'>
          <h2 className='w-[25%] text-center text-xs md:text-lg font-semibold'>{task.title}</h2>
          <p className='w-[25%] text-center flex justify-center items-center'>
            <p className='md:w-[50%] w-[90%]  bg-blue-400 p-[3%] text-white text-xs md:text-lg rounded-xl'>
            {task.status}
            </p>
            </p>
          <p className='w-[25%] text-center text-xs md:text-lg'>{new Date(task.dueDate).toLocaleDateString()}</p>
          <div className='w-[25%] flex flex-col md:flex-row justify-end md:justify-start md:items-start items-center gap-2'>
          <button onClick={() => handleEdit(task._id)} className='md:w-[40%] w-[90%] bg-blue-400 p-[0.6%] text-white text-xs md:text-lg rounded-xl'>Edit</button>
          <button onClick={() => deleteTask(task._id)} className='md:w-[40%] w-[90%]  bg-blue-400 p-[0.6%] text-white text-xs md:text-lg rounded-xl'>Delete</button>
          </div>
        </div>
      ))}
        </div>
      </div>
    </div>
  )
}

export default Tasklist
