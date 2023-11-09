"use client"
import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar";
import CodeEditor from "../../../../components/CodeEditor";
import { useSearchParams  } from "next/navigation";

//* http://localhost:3000/classrooms/assignments/task?classroom=CLASSROOMID&task=TASKID is used to access this page, where ID is the ID of the Task
export default function Task() {

    const Gettask = ()=>{
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
	const [taskID,setTaskID] = useState(null)
	const [task,settask] = useState(null)
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    // const [testcase,setTestcase] = useState<any>(null)
    // const [constraints,setConstraints] = useState<any>(null)

    const savetask = ()=>{
        const data = Gettask();
        settask(JSON.parse(data))
    }

	useEffect(()=>{ 
		// console.log("Getting tasks...");
        setTaskID(searchParams.get('task'))
        savetask();
	},[])

    useEffect(()=>{
        console.log("task Changed")
        console.log(task?.title)
        if (task != null){
            setTitle(task.title)
            setDescription(task.description)
            // setTestcase(task.testcase)
            // setConstraints(task.constraints)
        }

    },[task])



	return (
		<section className="min-h-screen flex gap-2 flex-col bg-neutral-900 text-theme1 scrollbar">
			<Navbar />
			<div className="flex gap-2 flex-row">

				<div className="flex gap-2 flex-col w-1/2 h-full"> {/* LEFT PORTION */}
					<CodeEditor />
				</div>

				<div className="bg-theme1 p-3 flex rounded-md h-full w-1/2"> {/* RIGHT PORTION */}
					{task == null?'Loading...':(
					<div className="overflow-hidden">
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






// import React, { useEffect, useState } from "react";
// import CodeEditorWindow from "@/app/CodeEditor";
// import axios from "axios";
// // import { classnames } from "../utils/general";
// import languageOptions from '../constants/languageOptions'
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { defineTheme } from "../lib/defineTheme";
// import useKeyPress from "../hooks/useKeyPress";
// // import Footer from "./footer";
// import OutputWindow from "./OutputWindow";
// import CustomInput from "./CustomInput";
// import OutputDetails from "./OutputDetails";
// import {LanguagesDropdown} from './languageDropdown'
// import {ThemeDropdown} from "./themeDropdown"

// const javascriptDefault = `// some comment`;

// const Landing = () => {
//   const [code, setCode] = useState(javascriptDefault);
//   const [customInput, setCustomInput] = useState("");
//   const [outputDetails, setOutputDetails] = useState(null);
//   const [processing, setProcessing] = useState(null);
//   const [theme, setTheme] = useState("cobalt");
//   const [language, setLanguage] = useState({
//     id: 63,
//     name: "JavaScript (Node.js 12.14.0)",
//     label: "JavaScript (Node.js 12.14.0)",
//     value: "javascript",
//   });

//   const enterPress = useKeyPress("Enter");
//   const ctrlPress = useKeyPress("Control");

//   const onSelectChange = (sl) => {
//     console.log("selected Option...", sl);
//     setLanguage(sl);
//   };
  

//   useEffect(() => {
//     if (enterPress && ctrlPress) {
//       console.log("enterPress", enterPress);
//       console.log("ctrlPress", ctrlPress);
//       handleCompile();
//     }
//   }, [ctrlPress, enterPress]);
//   const onChange = (action, data) => {
//     switch (action) {
//       case "code": {
//         setCode(data);
//         break;
//       }
//       default: {
//         console.warn("case not handled!", action, data);
//       }
//     }
//   };
//   const handleCompile = () => {
//     // We will come to the implementation later in the code
//   };

//   const checkStatus = async (token) => {
//     // We will come to the implementation later in the code
//   };

//   function handleThemeChange(th) {
//     // We will come to the implementation later in the code
//   }
//   useEffect(() => {
//     defineTheme("oceanic-next").then((_) =>
//       setTheme({ value: "oceanic-next", label: "Oceanic Next" })
//     );
//   }, []);

//   const showSuccessToast = (msg) => {
//     toast.success(msg || `Compiled Successfully!`, {
//       position: "top-right",
//       autoClose: 1000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   };
//   const showErrorToast = (msg) => {
//     toast.error(msg || `Something went wrong! Please try again.`, {
//       position: "top-right",
//       autoClose: 1000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   };

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
//       <div className="flex flex-row">
//         <div className="px-4 py-2">
//           <LanguagesDropdown onSelectChange={onSelectChange} />
//         </div>
//         <div className="px-4 py-2">
//           <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
//         </div>
//       </div>
//       <div className="flex flex-row space-x-4 items-start px-4 py-4">
//         <div className="flex flex-col w-full h-full justify-start items-end">
//           <CodeEditorWindow
//             code={code}
//             onChange={onChange}
//             language={language?.value}
//             theme={theme.value}
//           />
//         </div>

//         <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
//           <OutputWindow outputDetails={outputDetails} />
//           <div className="flex flex-col items-end">
//             <CustomInput
//               customInput={customInput}
//               setCustomInput={setCustomInput}
//             />
//             <button
//               onClick={handleCompile}
//               disabled={!code}
//               className="border border-cyan-400 p-5"
//             >
//               {processing ? "Processing..." : "Compile and Execute"}
//             </button>
//           </div>
//           {outputDetails && <OutputDetails outputDetails={outputDetails} />}
//         </div>
//       </div>
//     </>
//   );
// };
// export default Landing;