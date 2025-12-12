// import React, { useState } from 'react'

// function HooksPractice() {
//     const [count, setCount] = useState(0)
//     return (
//         <div>
//             <p>count:{count}</p>
//             <button onClick={() => setCount(count + 1)}>Increase</button>
//             <button onClick={() => setCount(count - 2)}>Decrease</button>
//             <button onClick={() => setCount(0)}>Clear</button>
//         </div>
//     )
// }

// export default HooksPractice

import React, { useState } from "react";

export default function HooksPractice(){
    const[counts,setCounts]=useState([0,0,0])

    const increment =(i)=>{
        setCounts(prev=>prev.map((c,idx)=>idx===i?c+1:c))
    }

    return(
        <>
        {
            counts.map((c,i)=>(
                <div key={i}>
                    <span>{c}</span>
                    <button onClick={()=>increment(i)}>+{i}</button>
                </div>
            ))
        }
        </>
    )
}