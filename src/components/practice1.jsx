import { useState } from "react"

function Practice() {

    // const[count,setCount]=useState(0)

    // const [state, setState] = useState({
    //     count: 0,
    //     firstName: "Rewant",
    //     lastName: "Rawat"
    // })
const[form,setForn]=useState({
    name:"",
    email:"",
    password:""
})

const handleChange(e){
    const{name,value}=e.target
    setForn(prev=>({...prev,[name]:value}))
}

    const[user,setUser]=useState({
        name:"Rewant",
        address:{
            city:"jaipur",
            pin:122022
        }
    })

    function updateCity(){
        setUser(prev=>({
            ...prev,
            address:{
                ...prev.address,
                city:"indore"
            }
        }))
    }
    // const increase = () => {
    //  setState({...state,count:state.count+1})
    //  console.log("count",state.count);
    //  console.log("firstname",state.firstName);
     
     
    // }
    return (
        <>
           <div>
            <h1>User details</h1>
            <p>Name: <br />{user.name}</p>
            <p>City: <br />{user.address.city}</p>
            <p>PIN: <br />{user.address.pin}</p>
           </div>
           <button onClick={updateCity}>Update city to indore</button>
        </>
    )
}

export default Practice
