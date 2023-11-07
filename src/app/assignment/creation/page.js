"use client"
import React, { useEffect } from 'react'
import Navbar from '@/app/Navbar'
import { useState } from 'react';

function Tasks() {

  const [taskid, setTaskId] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [Taskdescription, setTaskDescription] = useState('')
  const [constraints, setConstraints] = useState('')
  const [numCases, setNumCases] = useState(1)
  // const [taskid, setTaskId] = useState('')
  // const [taskid, setTaskId] = useState('')
  // const [taskid, setTaskId] = useState('')
  // const [taskid, setTaskId] = useState('')
  
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
    setTaskId(event.target.value)
    // console.log(event.target.value)
  }
  const updateTaskTitle = (event)=>{
    setTaskTitle(event.target.value)
    // console.log(event.target.value)
  }
  const updateTaskDescription = (event)=>{
    setTaskDescription(event.target.value)
    // console.log(event.target.value)
  }
  const updateConstraints = (event)=>{
    setConstraints(event.target.value)
    console.log(event.target.value)
  }
  const updateNumCases = ()=>{
    setNumCases(numCases+1)
  }
  useEffect(()=>{
    console.log(numCases)
  },[numCases])
  


  return (
    <section className='min-h-screen'>
      <Navbar />
      <div className='flex gap-3 flex-row flex-1'>
        <div className='flex gap-10 flex-col w-1/2 h-full p-24'>
          <div className='flex flex-col '>
            <label>Task ID: </label>
            <input 
            className='outline-none p-1 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2'
            id="taskID" 
            name="taskID" 
            onChange={updateTaskId} 
            placeholder="Mention the TaskID here" 
            required />
          </div>

          <div className='flex flex-col'>
            <label >Task Title: </label>
            <input 
            className='outline-none p-1 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2'
            id="title" 
            // name="title" 
            onChange={updateTaskTitle} 
            placeholder="Enter the task title here" 
            required />
          </div>

          <div className='flex flex-col'>
            <label >Task Description: </label>
            <textarea 
            className='outline-none p-1 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2'
            id="description" 
            name="description" 
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
            className='outline-none p-1 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2'
            id="constraints" 
            name="constraints" 
            onChange={updateConstraints} 
            // rows="4" 
            // cols="50" 
            placeholder="Specify the constraints here" 
            required>
            </textarea>
          </div>
          <div className='flex justify-center items-center flex-row gap-3'>
            <button className='bg-theme3 text-black w-24 p-2 rounded-sm'>Submit</button>
            <button className='bg-theme4 text-black w-32 p-2 rounded-sm' onClick={updateNumCases}>+ Test Case</button>
          </div>
          
        </div>

        <div className='flex flex-1 h-96 flex-wrap'>
          <div className="flex flex-col gap-3 border border-theme3 w-1/2 p-4">
            <div className='flex flex-col'>
              <label >Input: </label>
              <textarea 
              className="outline-none p-1 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2 resize-none" 
              name="input" 
              placeholder="Enter the input for testcase here" 
              required></textarea>
            </div>
            <div className='flex flex-col'>
              <label >Output: </label>
              <textarea 
              className="outline-none p-1 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2 resize-none" 
              name="output" 
              placeholder="Enter the output for testcase here" 
              required></textarea>
            </div>
            <div className='flex flex-col'>
              <label >Explaination: </label>
              <textarea 
              className="outline-none p-1 rounded-sm placeholder-white placeholder-opacity-30 bg-transparent border border-theme2 resize-none" 
              name="output" 
              placeholder="Enter the output for testcase here" 
              required></textarea>
            </div>
          </div>
        </div>      
      </div>
        
    </section>
  );
}

/*window.addEventListener("load", function () {
  document.getElementById("addTestCase").addEventListener("click", function () {
      const sampleTestCases = document.getElementById("sampleTestCases");
      const newTestCase = document.querySelector(".testCase").cloneNode(true);
      sampleTestCases.appendChild(newTestCase);
  });
});*/

export default Tasks;