'use client'
import{useState} from 'react'
import { taskmanagementObject } from './models/taskmanagement';
import{v4 as uuid} from 'uuid';

const Home: React.FC = () => {
  const[taskmanagement, settaskmanagement] = useState<string>('');
  const[taskmangements, settaskmanagements]=useState<taskmanagementObject[]>([]);
  const addtaskmanagement = () => {
    settaskmanagements([{id:uuid(), value:taskmanagement, done:false}, ...taskmangements])
    settaskmanagement("");
  }
  const deletetaskmanagement = (id:string) => {
    let updatedtaskmanagements = [...taskmangements]
    let selectedtaskamangementIdx = taskmangements.findIndex((taskmanagement)=> taskmanagement.id === id)
    updatedtaskmanagements.splice(selectedtaskamangementIdx, 1)
    settaskmanagements(updatedtaskmanagements)
  }
  const marktaskmanagementDone = (id:string)=>{
    settaskmanagements(taskmangements.map(taskmanagement => taskmanagement.id=== id ? {...taskmanagement, done:true}:taskmanagement))
    settaskmanagement("");
  }
 
  return (
  <>
    <header className='bg-slate-800 p-4 text-center text-3xl text-slate-200'>
      <h2>Task Management app</h2>
    </header>
    <main className='p-5'>
    <input 
    type = "text"
    placeholder="Enter a new Task"
    className={'p-2 rounded-lg mr-5 text-slate-900 text-center'}
    onChange={(e)=> settaskmanagement(e.target.value)}
    value={taskmanagement}
    />
    <button
    className='border-2 border-slate-800 rounded-lg p-2'
      onClick={() => addtaskmanagement()}
      >Add Task</button>
    <button
    className='border-2 border-slate-800 rounded-lg p-2'
      onClick={() => deletetaskmanagement(taskmanagement)}
      >Delete Task</button>
    <ul className='mt-4'>{
        taskmangements.map(taskmanagement => (
          <li 
          onClick={()=> marktaskmanagementDone(taskmanagement.id)}
          className={`text-3xl ml-5 cursor-pointer ${ taskmanagement.done ? 'line-through' : 'no-underline'}`}
          >
            {taskmanagement.value}
          </li>
        ))
      }        
    </ul>
    </main>
  </>
  )
}

export default Home;