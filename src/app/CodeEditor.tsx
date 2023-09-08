"use client"
import React from 'react'
import ReactDOM from 'react-dom';
import Editor from '@monaco-editor/react';
import * as monaco from '@monaco-editor/react'

// List of Languages supported by Monaco Editor
// abap,azcli,bat,bicep,cameligo,clojure,coffee,cpp,csharp,csp,css,cypher,dart,dockerfile,ecl,elixir,flow9,freemarker2,fsharp,go,graphql,handlebars,hcl,html,ini,java,javascript,julia,kotlin,less,lexon,liquid,lua,m3,markdown,mdx,mips,msdax,mysql,objective-c,pascal,pascaligo,perl,pgsql,php,pla,postiats,powerquery,powershell,protobuf,pug,python,qsharp,r,razor,redis,redshift,restructuredtext,ruby,rust,sb,scala,scheme,scss,shell,solidity,sophia,sparql,sql,st,swift,systemverilog,tcl,test,twig,typescript,vb,wgsl,xml,yaml


function CodeEditor() {
    return (
		<Editor 
			theme='vs-dark' 
			defaultLanguage='python'
			options={{
				fontSize: 18,
				minimap: {
					maxColumn: 0,
				},
				scrollbar:{
					useShadows: true,
				},
			}}
		/>
    )
}

export default CodeEditor
