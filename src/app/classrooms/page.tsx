import React from 'react'
import Navbar from '@/components/Navbar'
// posts -> assignments

export default function Classrooms() {

	return (
		<section className="min-h-screen min-w-full flex gap-2 flex-col bg-neutral-900 text-theme1">
			<Navbar />
			<div className="giod grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
				<p>Testing</p>
				<p>Testing</p>
				<p>Testing</p>
			</div>
		</section>
	)
}


// export async function getAssignments(){
// 	const files = fs.readdirSync('/Assignments');
// 	const posts = files.map((fileName)=>{
// 		const slug = fileName.replace('.md','');
// 		const readFile = fs.readFileSync(`Assignments/${fileName}`,'utf-8');
// 		const { data : frontmatter } = matter(readFile); 
// 		// Frontmatter is the data recieved from the markdown file which is at the top [ --- Data --- ] <- this one
// 		return {
// 			slug,
// 			frontmatter
// 		}
// 	})
// 	console.log(posts)
// 	return {
// 		props:{
// 			posts
// 		}
// 	}

// }

//! Below code to print boxes 

// {assignment?.map(({slug,frontmatter})=>(
// 	<div key = {slug} className='border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col'>
		
// 		<Link href={`/post/${slug}`}>
// 			<a>
// 				{/* <Image 
// 				width={650}
// 				height={340}
// 				alt={frontmatter.title}
// 				src = {`/${frontmatter.socialImage}`}
// 				/> */}
// 				<h1 className='p-4'>{frontmatter.title}</h1>
// 			</a>
// 		</Link>
// 	</div>
// ))}