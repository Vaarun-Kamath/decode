"use client"
import React from 'react'
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

  return (
    <section>
      
      <Navbar />

        <form id='taskForm' className="flex-container">

          <div className=''>
            <label for="taskID">Task ID: </label>
            <input type="number" id="taskID" name="taskID" onChange={} placeholder="Mention the TaskID here" required /><br />
            <label for="title">Task Title: </label>
            <input type="text" id="title" name="title" placeholder="Enter the task title here" required /><br></br>
            <label for="description">Task Description: </label><br></br>
            <textarea id="description" name="description" rows="4" cols="50" placeholder="Describe the task description here" required></textarea><br></br>
            <label for="constraints">Constraints:</label><br></br>
            <textarea id="constraints" name="constraints" rows="4" cols="50" placeholder="Specify the constraints here" required></textarea><br></br>
            <br></br>
            <br></br>
            <input type="submit" value="Submit"></input>
          </div>
          
          <div id="sampleTestCases">
            <div className="right-side">
              <h3>Sample Testcases: </h3>
                <label for="input">Input: </label>
                <textarea className="input" name="input" rows="4" cols="50" placeholder="Enter the input for testcase here" required></textarea><br></br>
                <input type="file" accept="image/*" name="inputImage" id="inputImage" />
                {/* <label for="inputImage">Upload Input Image    </label> */}
                {/* <button type="button" onclick="document.getElementById('inputImage').click()">Browse</button> */}
                <br></br>
                <br></br>
                <label for="output">Output: </label>
                <textarea className="output" name="output" rows="4" cols="50" placeholder="Enter the output for testcase here" required></textarea><br></br>
                <input type="file" accept="image/*" name="outputImage" id="outputImage" />
                {/* <label for="outputImage">Upload Output Image    </label> */}
                {/* <button type="button" onclick="document.getElementById('outputImage').click()">Browse</button> */}
                <br></br>
                <br></br>
                <label for="explanation">Explanation: </label>
                <textarea className="explanation" name="explanation" rows="4" cols="50" placeholder="Enter the explanation of the above testcase here" required></textarea><br></br>
                <button type="button" id="addTestCase">Add Test Case</button><br></br>
            </div>
        </div>
        
        </form>
        
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