"use client"

import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

function createClassroom() {

  const [classroom_id, setClassroom_id] = useState(null) // input
  const [name, setName] = useState(null) // input
  const [section, setSection] = useState(null) // input
  const [semester, setSemester] = useState(null) // input
  const [subject, setSubject] = useState(null) // input
  const [teacher_id, setTeacher_id] = useState(null) // infered from profile

  const {push} = useRouter();


  useEffect(()=>{
    setTeacher_id(10)
  },[])

  // const handleClassroomIDChange = (event)=>{
  //   setClassroom_id(event.target.value)
  // }

  const handleClassroomNameChange = (event)=>{
    setName(event.target.value)
  }

  const handleSectionChange = (event)=>{
    setSection(event.target.value)
  }

  const handleSemesterChange = (event)=>{
    setSemester(event.target.value)
  }

  const handleSubjectChange = (event)=>{
    setSubject(event.target.value)
  }

  const handleClassroomCreation = async () => {
		try {
			const response = await fetch('http://localhost:4000/api/create-new-classroom', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					section: section,
          name: name,
          semester: semester,
          subject: subject,
          teacherId: teacher_id
				}),
			});
			if (!response.ok) {
				console.log("Error creating classroom. Please try again later.");
			} else {
				const resultsJSON = await response.json();
        const results = resultsJSON["data"];

        if(results.length < 1){
          return null;
        }

        console.log("Classroom created successfully.");
        push("/classrooms");
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			return null;
		}
	};
  

  const testButton = (event)=>{
    console.log("classroom_id: ",classroom_id)
    console.log("name: ",name)
    console.log("section: ",section)
    console.log("semester: ",semester)
    console.log("subject: ",subject)
    console.log("teacher_id: ",teacher_id)
  }

  
  return (
    <section>
      <Navbar />
      <div className='flex h-screen -mt-16 justify-center items-center bg-theme1'>
      <div className='w-1/3 h-fit p-10 flex flex-col gap-10 bg-neutral-800 rounded-md'>
					<h1 className='text-2xl'>Create Classroom</h1>
					<div className='flex flex-col w-full gap-10'>

						{/* <span className='flex w-full flex-col gap-1'>
							<p>Classroom ID</p>
							<input onChange = {handleClassroomIDChange} placeholder='Enter Classroom ID' className='outline-none rounded-sm bg-transparent border border-theme3 text-white p-2 h-10'/>
						</span> */}

						<span className='flex w-full flex-col gap-1'>
							<p>Classroom Name</p>
							<input onChange = {handleClassroomNameChange} placeholder='Enter Classroom Name' className='outline-none rounded-sm bg-transparent border border-theme3 text-white p-2 h-10'/>
						</span>

						<span className='flex w-full flex-col gap-1'>
							<p>Section</p>
							<input onChange={handleSectionChange} placeholder='Section' className='outline-none rounded-sm bg-transparent border border-theme3 text-white p-2 h-10' />
						</span>

            <span className='flex w-full flex-col gap-1'>
							<p>Semester</p>
							<input onChange={handleSemesterChange} placeholder='Semester [1-8]' className='outline-none rounded-sm bg-transparent border border-theme3 text-white p-2 h-10'/>
						</span>

            <span className='flex w-full flex-col gap-1'>
							<p>Subject</p>
							<input onChange={handleSubjectChange} placeholder='Subject' className='outline-none rounded-sm bg-transparent border border-theme3 text-white p-2 h-10' />
						</span>

						<span className='flex w-full flex-row gap-1'>
							<button className='bg-theme3 text-black w-fit p-3 rounded-sm' onClick={async ()=> { await handleClassroomCreation(); }}>Create Classroom</button>
							<button className='bg-theme4 text-black w-fit p-3 rounded-sm' onClick={testButton}>Test Button</button>
						</span>

					</div>
				</div>
      </div>
    </section>
  )
}

export default createClassroom

// CREATE TABLE `sendit`.`classroom` (
//   `classroom_id` INT NOT NULL AUTO_INCREMENT,
//   `section` CHAR(1) NULL,
//   `name` VARCHAR(50) NOT NULL,
//   `semester` INT NULL,
//   `subject` VARCHAR(20) NULL,
//   `teacher_id` VARCHAR(15) NOT NULL,
//   PRIMARY KEY (`classroom_id`),
//   FOREIGN KEY (teacher_id) REFERENCES `sendit`.`teacher` (teacher_id)
//   );