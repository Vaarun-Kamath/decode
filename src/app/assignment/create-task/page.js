"use client"
import React, { useEffect } from 'react'
import Navbar from '@/app/Navbar'
import { useState } from 'react';

function Tasks() {

  const [taskid, setTaskId] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [constraints, setConstraints] = useState('');
  const [numCases, setNumCases] = useState(1);
  const [hiddenSwitch, setHiddenSwitch] = useState(1);
  const [task, setTask] = useState({
    taskId: '',
    taskTitle: '',
    taskDescription: '',
    constraints: '',
    numCases: 1,
    cases:[]
  });
  
  const sendIt = async ()=>{ 
		const options = {
			method: 'POST',
			url: 'http://localhost:4000/assignment/create-new-assignment',
			body: {
				submissions: [
					// TO-DO
				]
			}
		};

		try {
			const response = await axios.request(options);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	}

  const updateTaskId = (event)=>{
    task['taskId'] = event.target.value
    setTaskId(event.target.value)
  }

  const updateTaskTitle = (event)=>{
    task.taskTitle = event.target.value
    setTaskTitle(event.target.value)
  }

  const updateTaskDescription = (event)=>{
    task.taskDescription = event.target.value
    setTaskDescription(event.target.value)
  }

  const updateConstraints = (event)=>{
    task.constraints = event.target.value
    setConstraints(event.target.value)
  }
  
  useEffect(()=>{
    task.numCases = numCases
  },[numCases])

  const updateNumCases = ()=>{
    setTask({
      ...task,
      cases:[
        ...task.cases,
        {
          "id": numCases,
          "Input":"", 
          "Output": "", 
          "Explanation":"",
          "Hidden": 0
        }
      ]
    });
    setNumCases(numCases+1)
  }

  const updatetask = (event, key, type)=>{
    var data = task.cases.filter(data => {return data['id'] == key})[0];
    // console.log("Old Data: ",data)
    data[type] = event.target.value
    // console.log("New Data: ",data)
  }

  const removetask = (event, key)=>{
    if(task.cases.length == 1){
      console.log("Must have atleast 1 test case")
      alert("Must have atleast 1 case")
    }else{
      let index, count = 0;
      let taskList = [...task.cases];
      task.cases.map((el) =>
        el['id'] === key ? (index = count) : count++
      );
      taskList.splice(index, 1);
      setTask({ cases: taskList });
      // console.log("Deleting", key)
      // delete task.cases.filter(data => {return data['id'] == key})[0]
    }
  }

  const toggleHidden = (event, key)=>{
    console.log('Switch hidden', key);
    setHiddenSwitch(!hiddenSwitch);
    var data = task.cases.filter(data => {return data['id'] == key})[0];
    data["Hidden"] = data["Hidden"]?0:1;
  }
  
  const testButton = ()=>{
    console.log(task)
  }

  useEffect(()=>{
    setTask({
      cases:[
        ...task.cases,
        {"id": 0, "Input": "", "Output": "", "Explanation":"", "Hidden": 0}
      ]
    });
  },[])
  
  return (
    <section className='min-h-screen flex flex-col gap-3'>
      <Navbar />
      <div className='flex gap-1 flex-row min-h-screen -mt-20 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
        <div className='flex gap-10 flex-col w-1/2 h-full p-24'>
          <div className='flex flex-col '>
            <label>Task ID: </label>
            <input 
            className='outline-none p-2 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2'
            id="taskID" 
            name="taskID" 
            onChange={updateTaskId} 
            placeholder="Mention the TaskID here" 
            required />
          </div>

          <div className='flex flex-col'>
            <label >Task Title: </label>
            <input 
            className='outline-none p-2 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2'
            id="title" 
            // name="title" 
            onChange={updateTaskTitle} 
            placeholder="Enter the task title here" 
            required />
          </div>

          <div className='flex flex-col'>
            <label >Task Description: </label>
            <textarea 
            className='outline-none p-2 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2 resize-none'
            id="description" 
            name="description" 
            rows={5}
            onChange={updateTaskDescription} 
            // rows="4" 
            // cols="50" 
            placeholder="Describe the task description here" 
            required>
            </textarea>
          </div>

          <div className='flex flex-col'>
            <label >Constraints:</label>
            <textarea 
            className='outline-none p-2 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2 resize-none'
            id="constraints" 
            name="constraints" 
            rows={5}
            onChange={updateConstraints} 
            // rows="4" 
            // cols="50" 
            placeholder="Specify the constraints here" 
            required>
            </textarea>
          </div>
          <div className='flex justify-center items-center flex-row gap-3'>
            <button className='bg-theme3 text-black w-32 p-2 rounded-sm'>Create Task</button>
            <button className='bg-theme4 text-black w-32 p-2 rounded-sm' onClick={updateNumCases}>+ Test Case</button>
            <button className='bg-theme4 text-black w-32 p-2 rounded-sm' onClick={testButton}>Test State</button>
          </div>
          
        </div>

        <div className='flex gap-10 flex-col w-1/2 h-full p-24'>
          <div className='w-full grid place-items-center grid-cols-2 gap-5'>
            {
              task == null?(
                <div className="flex items-center justify-center w-56 h-56 rounded-lg">
                  <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ):(
                task.cases.map((val, i) => (
                  <div key = {val['id']} className='flex flex-col gap-3 rounded-sm w-full p-4 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_0px_0px_30px_3px_rgba(25,25,25,0.6)]'>
                    <div className='flex flex-col'>
                      <label >Input: </label>
                      <textarea 
                      className="outline-none p-1 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2 resize-none" 
                      name="input" 
                      placeholder="Enter input" 
                      onChange={event => updatetask(event, val['id'], "Input")}
                      required></textarea>
                    </div>
                    <div className='flex flex-col'>
                      <label >Output: </label>
                      <textarea 
                      className="outline-none p-1 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2 resize-none" 
                      name="output" 
                      placeholder="Enter expected output" 
                      onChange={event => updatetask(event, val['id'], "Output")}
                      required></textarea>
                    </div>
                    <div className='flex flex-col'>
                      <label >Explanation: </label>
                      <textarea 
                      className="outline-none p-1 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2 resize-none" 
                      name="output" 
                      placeholder="Enter explanation" 
                      onChange={event => updatetask(event, val['id'], "Explanation")}
                      required></textarea>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      <button onClick={event => removetask(event, val['id'])} className='bg-red-600 text-theme1 p-2 rounded-sm w-20'>Remove</button>
                      <button onClick={event => toggleHidden(event, val['id'])} className={(val['Hidden'] == 1?"bg-slate-600 ":" bg-green-500 ") + 'text-white p-2 rounded-sm w-36'}>{val['Hidden']? "Hidden":"Mark as Hidden"}</button>
                    </div>
                  </div>
                ))
              )
            }
          </div>
        </div>
      </div>
        
    </section>
  );
}

export default Tasks;