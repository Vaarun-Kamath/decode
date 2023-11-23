"use client"

import React from 'react'
import { useSearchParams  } from "next/navigation";
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

//* use http://localhost:3000/classrooms/assignments?classroom=someID to access this page
function TaskDisplay() {
	const [tasks, setTasks] = useState(null);
    const searchParams = useSearchParams()
	console.log("searchParams.get('classroom')",searchParams.get('classroom'))

	const getTasks = async () => {
		const response = await fetch('http://localhost:4000/api/get-tasks-for-assignment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				assignmentId: searchParams.get('assignment'),
			}),
		});
		if (!response.ok) {
			console.log("Error fetching classrooms. Please try again later.");
		} else {
			var results = await response.json();
			results = results['data'];
			console.log("results",results);
			// for (var i = 0; i < results.length; i++) {
			// 	questions.push({
			// 		taskID: results[i]['questions']['title'],
			// 		title: results[i]['questions']['title'],
			// 		description: results[i]['questions']['description'],
			// 	});
			// }
			// console.log(questions);
			// return JSON.stringify(questions);
			return results
		}
	}

	const saveTasks = async ()=>{
		const data = await getTasks();
		setTasks(data)
	}
	useEffect(()=>{
		saveTasks();
	},[])
	return (
		<section className="min-h-screen min-w-full flex gap-2 flex-col bg-neutral-900 text-theme1">
			<Navbar />
			<div className='flex-1 min-w-full flex justify-center flex-wrap gap-3'>
				{tasks == null?
					<div className="flex items-center justify-center w-56 h-56 rounded-lg">
						<div role="status">
							<svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
							<span className="sr-only">Loading...</span>
						</div>
					</div>
					:
					(tasks.map((task, key)=>(
                        // {questions: {…}, solutions: {…}, task_marks: 1}
                        // questions: {title: 'hellow', constraints: 'weg', description: 'haloe'}
						<div key={key} className="max-w-sm p-6 h-80 flex flex-wrap flex-col justify-between rounded-md border border-gray-600">
							{console.log(task)}
                            <a href={'http://localhost:3000/classrooms/assignments/assignment/task?classroom=1&assignment=1&task='+task.task_id}>
								<h5 className="mb-2 text-2xl font-bold tracking-tight text-theme1">{task.questions.title.substr(0,20)}</h5>
							</a>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.questions.description.substr(0,20)}</p>
							<a href={'http://localhost:3000/classrooms/assignments/assignment/task?classroom=1&assignment=1&task='+task.task_id} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-theme1">
								View Task
								<svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
								</svg>
							</a>
						</div>
					)))
				}
			</div>
			
		</section>
	)
}

export default TaskDisplay