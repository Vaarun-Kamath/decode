export default function GetAssignment(){
	return JSON.stringify({
		title: "Two Sum",
		description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

		You may assume that each input would have exactly one solution, and you may not use the same element twice.
		
		You can return the answer in any order.
		
		`,
		testcase:{
			Example1:{
				Input: "nums = [2,7,11,15], target = 9",
				Output: "[0,1]",
				Explaination: "Because nums[0] + nums[1] == 9, we return [0, 1]."
			},
			Example2:{
				Input: "nums = [3,2,4], target = 6",
				Output: "[1,2]"
			},
			Example3:{
				Input: "nums = [2,7,11,15], target = 9",
				Output: "[0,1]"
			},
		},
		constraints:{
			constraint1: "2 <= nums.length <= 10^4",
			constraint2: "-10^9 <= nums[i] <= 10^9",
			constraint3: "-10^9 <= target <= 10^9",
		}
	})
}


// export default function GetAssignment() {
// 	const [assignment, setAssignment] = useState('')
// 	const getAssignment = async ()=>{
// 		fetch('https://raw.githubusercontent.com/Vaarun-Kamath/decode/master/public/Assignments/Assignment1.md')
// 		.then((res)=>res.text())
// 		.then((md)=>setAssignment(md))
// 	}
// 	useEffect(()=>{
// 		getAssignment()
// 	},[])
// 	return (
// 		<div>
// 			<ReactMarkdown>{assignment}</ReactMarkdown>
// 		</div>
//   	)
// }