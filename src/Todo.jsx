import { useState } from "react"
import './Dodo.css'
import axios from "axios"
import { useEffect } from "react"

function Todo(){

const [task,addtask] = useState("")
const [todo,addtodo] = useState([])
const[complete,setcomplete]=useState([])
const [updatetask,setupdate]= useState()
useEffect(()=>{
      axios.get("http://localhost:5000/get")
     .then((res)=>{
     addtodo(res.data)
   
   
   console.log(res.data)
    })},[]

)
const settask = () => {
  

  if (!task.trim()) {
    alert("task is empty?");
    return;
  }

  axios.post("http://localhost:5000/post", { task: task })
    .then(() => {
      addtask("");   // clear input
      return axios.get("http://localhost:5000/get");
    })
    .then((res) => {
      addtodo(res.data);
    });
};
const deleted = (id) => {
  axios.delete(`http://localhost:5000/delete/${id}`)
    .then(() => {
      return axios.get("http://localhost:5000/get");
    })
    .then((res) => {
      addtodo(res.data);
    });
}
const update = (e) => {
 
  setupdate(e.id)
  addtask(e.task)
}
const completed = (id) => {
  setcomplete((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  )}
  const updatetodo = () => {

  if (!task.trim()) {
    alert("task is empty?");
    return;
  }

  axios.put(`http://localhost:5000/put/${updatetask}`, {
     task
  })
  .then(() => {
    addtask("");
    setupdate(null);
    return axios.get("http://localhost:5000/get");
  })
  .then((res) => {
    addtodo(res.data);
  })
  .catch((err) => console.log(err));
};

return(

<div className="container mt-5">
     <h1 className="hed">ToDo List</h1>

<div className="row">
    
<div className="formbox">
{/* Add Task Container */}
<div className="col-md-4">
<div className="card p-3 shadow">

<h4 className="text-center mb-3">Add Task</h4>

<input
className="form-control2 mb-2"
value={task}
onChange={(e)=>addtask(e.target.value)}
placeholder="Enter task on your mind"
/>

<button type="button" className="btn2 btn-primary w-100" onClick={settask} disabled={!task.trim() || updatetask}>
Add Task
</button>
<button
type="button"
className="upbtn"
onClick={updatetodo}
disabled={!updatetask}
>
Update
</button>


</div>
</div>
<hr/>

{/* Added Task Container */}
<div className="col-md-8">
<div className="card p-3 shadow">

<h4 className="text-center mb-3">Task List</h4>

{todo.map((e)=>(
<div key={e.id} className="alert alert-secondary">
<p className="tasktext">
  <span
style={{
  textDecoration: complete.includes(e.id) ? "line-through" : "none",
  color: complete.includes(e.id) ? "red" : "black"
}}
>{e.task}  </span><button onClick={()=>deleted(e.id)} disabled={complete.includes(e.id)}>Delete</button> 
  <button onClick={()=>update(e)}disabled={complete.includes(e.id)}>Edit</button>   
   <button onClick={()=>completed(e.id)}>{complete.includes(e.id) ? "Undo" : "Completed"}</button>  </p>
</div>
))}

</div>
</div>
</div>
</div>

</div>

)

}

export default Todo