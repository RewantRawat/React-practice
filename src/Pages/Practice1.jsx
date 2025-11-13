import React, { useState } from 'react'
import { datas } from '../Data/data'

function Practice1() {
    const[search,setSearch]=useState("")
  return (
   <>
    <div>
        <label>Search</label>
        <input type="text"placeholder='Search here'value={search} onChange={(e)=>{setSearch(e.currentTarget.value)}} />
    </div>
    <div>
        {
            datas.filter((d)=>{
                if(d.name.includes(search)){
                    return true
                }
            }).map((d)=>{
                return <h1 key={d.id}>{d.name}</h1>
            })
        }
    </div>
   </>
   
  )
}

export default Practice1