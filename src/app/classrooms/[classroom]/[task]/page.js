"use client"
import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar";
import CodeEditor from "../../../../components/CodeEditor";
import { useSearchParams  } from "next/navigation";

//* http://localhost:3000/classrooms/assignments/task?classroom=CLASSROOMID&task=TASKID is used to access this page, where ID is the ID of the Task
export default function Task() {
	
	const searchParams = useSearchParams()
	const [taskID,setTaskID] = useState(null)
	const [task,settask] = useState(null)
	const [title,setTitle] = useState("")
	const [description,setDescription] = useState("")

	const Gettask = async () => {

		const response = await fetch('http://localhost:4000/api/get-task', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				taskID: searchParams.get('task'),
			}),
		});

		if (!response.ok) {
			console.log("Error fetching classrooms. Please try again later.");
		} else {
			var results = await response.json();		
			results = results['data'][0];

			var needed_format = {
				title: results['questions']['title'],
				description: results['questions']['description'],
				testcase: results['solutions']['TestCase'],
				constraints: [results['questions']['constraints']],
			}

			console.log(needed_format);

			return JSON.stringify(needed_format);
		}
    }

    const savetask = async () => {
        const data = await Gettask();
        settask(JSON.parse(data))
    }

	useEffect(()=>{ 
        setTaskID(searchParams.get('task'))
        savetask();
	},[])

    useEffect(()=>{
        console.log("task Changed")
        console.log(task?.title)
        if (task != null){
            setTitle(task.title)
            setDescription(task.description)
        }

    },[task])



	return (
		<section className="max-h-screen flex gap-3 flex-col bg-neutral-900 text-theme1 overflow-y-auto scrollbar-none">
			<Navbar />
			<div className="flex gap-2 flex-row h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-thumb-rounded-md">

				<div className="flex gap-2 flex-col w-1/2 h-full"> {/* LEFT PORTION */}
					<CodeEditor />
				</div>

				<div className="bg-theme1 p-3 flex rounded-md w-1/2 overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-thumb-rounded-md"> {/* RIGHT PORTION */}
					{task == null?'Loading...':(
					<div>
						<div>
							<span className="flex flex-col gap-4 justify-center items-center">
								<h1 className="text-xl">{title}</h1>
								<p className="text-xs">TaskID: {taskID}</p>
							</span>
							<br />
						</div>
						<br/>
						<div>
							Description
							<hr />
							<br />
							{description}
						</div>
						<br/>
						<div>
							Example Cases
							<hr />
							<br />
							{task.testcase.map((examplecase,_) => (
								<div key={_} className="bg-zinc-800 p-3 m-10 mt-0 ml-0 rounded-lg h-fit">
									<span>
										<p className="font-bold">Input:</p> 
										{examplecase.Input}
									</span>
									<span>
										<p className="font-bold">Output:</p>
										{examplecase.Output}
									</span>
									<span>
										<p className="font-bold">Explaination:</p>
										{examplecase.Explaination}
									</span>
								</div>
							))}
						</div>
						<br/>
						<div>
							Constraints
							<hr />
							<br />
							{task.constraints.map((constraint,_) => (
							<div key={_} className="bg-zinc-800 p-3 m-10 mt-0 ml-0 rounded-lg h-fit">
								<span>
								<p className="font-bold">Constraint {_+1}:</p> {constraint}
								</span>
							</div>
							))}
						</div>
					</div>
					)}
				</div>
			</div>
		</section>
	)
}