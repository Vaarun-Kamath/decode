"use client"
import React, { useEffect } from 'react'
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import 'flowbite';

function createAssignment() {
	const [selectedTask, setSelectedTask] = useState([]);
	const [selectedClassroom, setSelectedClassroom] = useState([]);
	const [assignmentId, setAssignmentId] = useState(undefined);
	const [deadline, setDeadline] = useState(undefined);

	const tasks = [ //! GET THIS USING SQL
		{
			taskId: '3929A',
			taskTitle: 'Nice Title',
			taskDescription: 'good description',
			constraints: 'no constraints :)',
			numCases: 3,
			cases:[]
		},
		{
			taskId: '37838A',
			taskTitle: 'Job 3',
			taskDescription: '3 Dostor',
			constraints: 'opsara',
			numCases: 2,
			cases:[]
		},
		{
			taskId: '2901B',
			taskTitle: 'Ultery',
			taskDescription: 'Poluchol',
			constraints: 'helaychi',
			numCases: 9,
			cases:[]
		},
		
	]

	const classrooms = [{ //! GET FROM SQL
		classroomId: 3,
		section: 'J',
		name: `Big Data Classroom`,
		semester: 5,
		subject: 'Big Data',
		teacher: 'FN LN'
	},{
		classroomId: 5,
		section: 'G',
		name: `MI Classroom`,
		semester: 5,
		subject: 'Machine Intelligence',
		teacher: 'some name'
	},{
		classroomId: 6,
		section: 'G',
		name: `MI Classroom`,
		semester: 5,
		subject: 'Machine Intelligence',
		teacher: 'some name'
	},{
		classroomId: 5,
		section: 'G',
		name: `MI Classroom`,
		semester: 5,
		subject: 'Machine Intelligence',
		teacher: 'some name'
	},{
		classroomId: 5,
		section: 'G',
		name: `MI Classroom`,
		semester: 5,
		subject: 'Machine Intelligence',
		teacher: 'some name'
	},{
		classroomId: 5,
		section: 'G',
		name: `MI Classroom`,
		semester: 5,
		subject: 'Machine Intelligence',
		teacher: 'some name'
	},{
		classroomId: 5,
		section: 'G',
		name: `MI Classroom`,
		semester: 5,
		subject: 'Machine Intelligence',
		teacher: 'some name'
	},{
		classroomId: 5,
		section: 'G',
		name: `MI Classroom`,
		semester: 5,
		subject: 'Machine Intelligence',
		teacher: 'some name'
	},{
		classroomId: 5,
		section: 'G',
		name: `MI Classroom`,
		semester: 5,
		subject: 'Machine Intelligence',
		teacher: 'some name'
	},{
		classroomId: 5,
		section: 'G',
		name: `MI Classroom`,
		semester: 5,
		subject: 'Machine Intelligence',
		teacher: 'some name'
	},{
		classroomId: 5,
		section: 'G',
		name: `MI Classroom`,
		semester: 5,
		subject: 'Machine Intelligence',
		teacher: 'some name'
	},{
		classroomId: 5,
		section: 'G',
		name: `MI Classroom`,
		semester: 5,
		subject: 'Machine Intelligence',
		teacher: 'some name'
	},]

	const handleSelectTask = (event, taskId)=>{
		// console.log(selectedTask.filter(val=>{return val == taskId}))
		if(selectedTask.find((val)=>{
			return val === taskId
		}) != undefined){
			const newSelection = selectedTask.filter((val)=>{
				return val !== taskId
			})
			setSelectedTask(newSelection);
		}else{
			setSelectedTask([...selectedTask, taskId]);
		}
	}

	const handleSelectClassroom = (event, classroomID)=>{
		if(selectedClassroom.find((val)=>{
			return val === classroomID
		}) != undefined){
			const newSelection = selectedClassroom.filter((val)=>{
				return val !== classroomID
			})
			setSelectedClassroom(newSelection);
		}else{
			setSelectedClassroom([...selectedClassroom, classroomID]);
		}
	}

	const handleAssignmentCreation = ()=>{
		if(selectedClassroom.length == 0){
			alert("Atleast 1 Classroom must be selected")
		}
		else if(selectedTask.length == 0){
			alert("Atleast 1 Task must be selected")
		}
		else if(assignmentId == undefined){
			alert("Assignment ID cannot be empty")
		}
		else if(deadline == undefined){
			alert("Deadline not set properly")
		}else{
			//* TODO Send SQL query to create assignment
		}
	}

	const testButton = ()=>{
		console.log("ID: ",assignmentId);
		console.log("Tasks: ",selectedTask);
		console.log("Classrooms: ",selectedClassroom);
		console.log("Deadline: ",deadline);
	}

	const today = new Date();

	const handleAssignmentChange = (event)=>{
		setAssignmentId(event.target.value);
	}

	const handleDeadlineChange = (event)=>{
		setDeadline(event.target.value);
	}


	return (
		<section className='min-h-screen w-screen flex flex-col'>
     		<Navbar />
			<div className='flex h-screen -mt-16 justify-center items-center'>
				<div className='w-1/3 h-3/4 p-10 flex flex-col gap-10 bg-neutral-800 rounded-md'>
					<h1 className='text-2xl'>Create Assignment</h1>
					<div className='flex flex-col w-full gap-10'>
						<span className='flex w-full flex-col gap-1'>
							<p>Assignment ID</p>
							<input onChange = {handleAssignmentChange} placeholder='Enter Assignment ID' className='outline-none rounded-sm bg-transparent border border-theme3 text-white p-2 h-10'/>
						</span>
						<span className='flex w-full flex-col gap-1'>
							<p>Assignment Deadline</p>
							<input onChange={handleDeadlineChange} type='datetime-local' min={`${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}T${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`} placeholder='Enter Assignment Deadline' className='outline-none rounded-sm bg-transparent border border-theme3 text-white p-2 h-10' />
						</span>
						<span className='flex w-full flex-col gap-1 relative'>
							<button id="dropdownHelperButton" data-dropdown-toggle="dropdownHelper" className="text-black bg-theme3 hover:bg-theme3 focus:outline-none focus:bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-theme3 dark:hover:bg-theme3 dark:focus:bg-theme3" type="button">
								Select Tasks
								<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
								</svg>
							</button>
							<div id="dropdownHelper" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-[#FFD369] absolute right-0 top-12 w-60 dark:bg-gray-700 dark:divide-gray-600">
								<ul className="p-2 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHelperButton">
									{tasks.map((value,key)=>(
										<li key={key}>
											<div className="flex select-none p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
												<div className="flex items-center h-5">
													<input onClick={event =>handleSelectTask(event, value.taskId)} id="helper-checkbox-1" aria-describedby="helper-checkbox-text-1" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
												</div>
												<div className="ms-2 text-sm">
													<label className="font-medium text-gray-900 dark:text-gray-300">
														<div>{value.taskTitle}</div>
														<p id="helper-checkbox-text-1" className="text-xs font-normal text-gray-500 dark:text-gray-300">{value.taskDescription}</p>
													</label>
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						</span>
						<span className='flex w-full flex-col gap-1'>
							
							<button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-black bg-theme3 hover:bg-theme3 focus:outline-none focus:bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-theme3 dark:hover:bg-theme3 dark:focus:bg-theme3" type="button">Select Classroom
								<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
								</svg>
							</button>

							<div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-[#FFD369] absolute right-0 top-12 w-60 dark:bg-gray-700 dark:divide-gray-600">
								<ul className="p-2 py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
									{classrooms.map((value,key)=>(
										<li key={key}>
											<div className="flex select-none p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
												<div className="flex items-center h-5">
													<input onClick={event =>handleSelectClassroom(event,value.classroomId)} id="helper-checkbox-1" aria-describedby="helper-checkbox-text-1" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
												</div>
												<div className="ms-2 text-sm">
													<label className="font-medium text-gray-900 dark:text-gray-300">
														<div>{value.name}</div>
														<p id="helper-checkbox-text-1" className="text-xs font-normal text-gray-500 dark:text-gray-300">{value.subject}</p>
													</label>
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						</span>
						<span className='flex w-full flex-row gap-1'>
							<button className='bg-theme4 text-black w-fit p-3 rounded-sm' onClick={handleAssignmentCreation}>Create Assignment</button>
							<button className='bg-theme4 text-black w-fit p-3 rounded-sm' onClick={testButton}>Test Button</button>
						</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default createAssignment