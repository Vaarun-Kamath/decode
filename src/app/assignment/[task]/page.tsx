"use client"
import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import CodeEditor from "../../CodeEditor";
import { CodeBlock } from "react-code-blocks";
import { useSearchParams  } from "next/navigation";

//http://localhost:3000/assignment/task1?task=ID is used to access this page, where ID is the ID of the Task
export default function Task() {

    const GetAssignment = ()=>{
        return JSON.stringify({
            title: "Two Sum",
            description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    
            You may assume that each input would have exactly one solution, and you may not use the same element twice.
            
            You can return the answer in any order.
            
            `,
            testcase:[
                {
                    Input: "nums = [2,7,11,15], target = 9",
                    Output: "[0,1]",
                    Explaination: "Because nums[0] + nums[1] == 9, we return [0, 1]."
                },
                {
                    Input: "nums = [3,2,4], target = 6",
                    Output: "[1,2]",
                    Explaination: "None"
                },
                {
                    Input: "nums = [2,7,11,15], target = 9",
                    Output: "[0,1]",
                    Explaination: "None"
                },
            ],
            constraints:[
                "2 <= nums.length <= 10^4",
                "-10^9 <= nums[i] <= 10^9",
                "-10^9 <= target <= 10^9",
            ]
        })
    }

    const searchParams = useSearchParams()
	const [taskID,setTaskID] = useState<any>(null)
	const [assignment,setAssignment] = useState<any>(null)
    const [title,setTitle] = useState<any>("")
    const [description,setDescription] = useState<any>("")
    // const [testcase,setTestcase] = useState<any>(null)
    // const [constraints,setConstraints] = useState<any>(null)

    const saveAssignment = ()=>{
        const data = GetAssignment();
        setAssignment(JSON.parse(data))
    }

	useEffect(()=>{ 
		// console.log("Getting assignments...");
        setTaskID(searchParams.get('task'))
        saveAssignment();
	},[])

    useEffect(()=>{
        console.log("Assignment Changed")
        console.log(assignment?.title)
        if (assignment != null){
            setTitle(assignment.title)
            setDescription(assignment.description)
            // setTestcase(assignment.testcase)
            // setConstraints(assignment.constraints)
        }

    },[assignment])



	return (
		<section className="min-h-screen min-w-full flex gap-2 flex-col bg-neutral-900 text-theme1">
			<Navbar />
			<div className="flex-1 flex w-full gap-2 flex-row">

				<div className=" w-full flex gap-2 flex-col">
					<div className="w-full bg-theme1 h-fit rounded-md flex items-center p-3 gap-3 flex-row-reverse">
						<a href='#' className="w-16 bg-green-500 h-fit p-1 rounded-sm text-sm mr-2 flex justify-center">Submit</a>
						<a href='#' className="w-16 bg-neutral-800 h-fit p-1 rounded-sm text-sm mr-2 flex justify-center">Run</a>
					</div>
					<div className="h-full bg-theme1 pt-4">
                        <CodeEditor />
                    </div>
				</div>
				<div className="bg-theme1 w-full p-3 flex rounded-md">
					{/* <ProblemDescription /> */}
                    {assignment == null?'Loading...':(
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
                                {assignment.testcase.map((examplecase:any) => (
                                    <div className="bg-zinc-800 p-3 m-10 mt-0 ml-0 rounded-lg h-fit">
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
                                {assignment.constraints.map((constraint:any,_:any) => (
                                    <div className="bg-zinc-800 p-3 m-10 mt-0 ml-0 rounded-lg h-fit">
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


