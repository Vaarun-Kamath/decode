"use client"
import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import Editor from "@monaco-editor/react";

const CodeEditor = () => {

	
	const [codeText, setCodeText] = useState("");
	const [customInput, setCustomInput] = useState("");
	const [outputText, setOutputText] = useState("");
 
	const editorRef = useRef(null);
	const outputTextRef = useRef(null);

	const handleEditorChange = (value) => {
		setCodeText(value);
	};

	const handleCustomInputChange = (event)=>{
		setCustomInput(event.target.value);
	}

	const runIt = async ()=>{ //* CUSTOM INPUTS
		console.log("Sending: " + codeText);
		const options = {
			method: 'POST',
			url: 'https://judge0-ce.p.rapidapi.com/submissions',
			params: {
				wait: 'true',
				fields: '*'
			},
			headers: {
				'content-type': 'application/json',
				'Content-Type': 'application/json',
				'X-RapidAPI-Key': 'cf27838f5fmshb9cf98550ad1e42p1e31a2jsnb79b3eb2df2d',
				'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
			},
			data: {
				"language_id": 71, // Python Language
				"source_code": codeText,
				stdin: customInput, //! TODO Custom Input 
			},
		};
		try {
			const response = await axios.request(options);
			outputTextRef.current.value = response.data.stdout
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	}


	const sendIt = async ()=>{ //* TESTCASE INPUT
		const options = {
			method: 'POST',
			url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
			params: {
				wait: 'true',
				fields: '*'
			},
			headers: {
				'content-type': 'application/json',
				'Content-Type': 'application/json',
				'X-RapidAPI-Key': 'cf27838f5fmshb9cf98550ad1e42p1e31a2jsnb79b3eb2df2d',
				'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
			},
			data: {
				submissions: [
					{
						'language_id': 71,
						'source_code': codeText,
						// 'stdin': '' //! TODO TESTCASE INPUT
					},
					{
						'language_id': 71,
						'source_code': codeText,
						// 'stdin': '' //! TODO TESTCASE INPUT
					},
					{
						'language_id': 71,
						'source_code': codeText,
						// 'stdin': '' //! TODO TESTCASE INPUT
					}
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

	const handleEditorDidMount = (editor /* Editor instance */, monaco /* Monaco instance */)=>{
		editorRef.current = editor;
		// console.log("Editor Mounted")
		// console.log(editorRef)
	}

	useEffect(()=>{
		console.log("outputTextRef: ");
		console.log(outputTextRef);
	},[outputTextRef])

	return (
		<>
			<div className=" bg-theme1 pt-4">
				<div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
					<Editor
						height="83vh"
						width={`100%`}
						language={"python"}
						onChange={handleEditorChange}
						theme='vs-dark' 
						defaultValue="print('Hello World')"
						onMount={handleEditorDidMount}
					/>
				</div>
			</div>
			<div className="bg-theme1 rounded-md flex items-center p-3 gap-3 flex-row-reverse">
				<button onClick={sendIt} className="w-16 bg-green-500 h-fit p-1 rounded-sm text-sm mr-2 flex justify-center">Submit</button>
				<button onClick={runIt} className="w-16 bg-neutral-800 h-fit p-1 rounded-sm text-sm mr-2 flex justify-center">Run</button>
			</div>
			<br />
			<div className="flex gap-2 flex-col ml-2">
				<p>Input:</p>
				<textarea id="custom-input" placeholder="Enter Custom Input" onChange={handleCustomInputChange} className="text-theme1 bg-transparent outline-none border border-theme2 p-4"/>
				<p>Output:</p>
				<textarea ref={outputTextRef} id="output" disabled placeholder="Output" className="text-theme1 bg-transparent border border-theme2 p-4"/>
			</div>
		</>
	);
};
export default CodeEditor;