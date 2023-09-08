import React from "react";
import Navbar from "./Navbar";
import CodeEditor from "./CodeEditor";



export default function Home() {
  // var editorContainer = document.getElementById('container');
  // const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

	return (
		<section className="min-h-screen min-w-full flex gap-2 flex-col bg-neutral-900 text-theme1">
			<Navbar />
			<div className="flex-1 flex w-full gap-2 flex-row">

				<div className="bg-theme1 w-full flex gap-2 flex-col">
					<div className="w-full h-10 flex items-center p-3">
						Helper Buttons
					</div>
					<CodeEditor />
				</div>
				<div className="bg-theme1 w-full p-3 flex items-center justify-center">
					Testcases
				</div>
				
			</div>
		</section>
	)
}
