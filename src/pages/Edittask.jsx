import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Edittask = () => {
  const navigate = useNavigate()  
  const{id} = useParams() 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  
  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const response = await axios.get(`https://task-2ngl.onrender.com/tasks/${id}`);
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setDueDate(new Date(task.dueDate).toISOString().split('T')[0]);
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title, description, status, dueDate };

    if (id) {
      toast.success("Updated Successfully")
      await axios.put(`https://task-2ngl.onrender.com/tasks/${id}`, task);
      navigate("/")
    } else {
      await axios.post('https://task-2ngl.onrender.com/tasks', task);
      toast.success("Created Successfully")
      navigate("/")
    }

  };


  return (
    <div className='bg-gray-200 h-screen'>
      <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col h-screen'>
      <h1 className='text-center text-3xl py-[2%] '>{id ? 'Edit Task' : 'Create Task'}</h1>
        <div className='flex gap-3 w-full justify-center my-[1%] items-center'>
          <label className='text-xl md:w-[10%] w-[50%]'>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className='md:w-[20%] w-[40%] p-[0.5%] rounded-xl' />
        </div>
        <div className='flex gap-3 w-full justify-center my-[1%] items-center'>

          <label className='text-xl md:w-[10%] w-[50%]' >Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='md:w-[20%] w-[40%] p-[0.5%] rounded-xl' />
        </div>
        <div className='flex gap-3 w-full justify-center my-[1%] items-center'>
          <label className='text-xl md:w-[10%] w-[50%]'>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className='md:w-[20%] w-[40%] p-[0.5%] rounded-xl'>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className='flex gap-3 w-full justify-center my-[1%] items-center'>
          <label className='text-xl md:w-[10%] w-[50%]'>Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className='md:w-[20%] w-[40%] p-[0.5%] rounded-xl'/>
        </div>
        <div className='flex gap-3 w-full justify-center md:my-[1%] my-[2%] items-center'>
        <button type="submit"  className='bg-red-400 text-white px-[3%] py-[0.5%] rounded-xl'>{id ? 'Update Task' : 'Create Task'}</button>
        </div>
        
      </form>
    </div>
  )
}

export default Edittask
