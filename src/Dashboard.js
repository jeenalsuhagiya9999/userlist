
import React, { useState, useEffect } from 'react';
import EditMode from './EditMode';


function Dashboard(props) {
    const [username, setUsername]= useState([]);
    const [emailId,setemailId] = useState([]);
    const [interest, setInterest] = useState([]);
    const [id, setId] = useState();
    const [allusername, setAllUsername]= useState([]);
    const [allemailId,setAllemailId] = useState([]);
    const [allinterest, setAllInterest] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const deleteHandler = () => {
       
      fetch(`http://localhost:9999/user/${id}`, {
        method: "DELETE", credentials: "include"  
      }).then((r) => {
        console.log("Got successfully DELETE");
        
    })}
   
    useEffect(() => {
      fetch("http://localhost:9999/info", { credentials: "include"  })
        .then((r) => r.json())
        .then((list) => {
          
           
           list.map((value,idx)=>{
              setUsername(olditem=>[...olditem, list[idx].userName])
              setemailId(olditem=>[...olditem, list[idx].emailId])
              setInterest(olditem=>[...olditem, list[idx].interest])
              
              
          })
          
        });
    }, []);
    useEffect(() => {
      fetch("http://localhost:9999/allinfo", { credentials: "include"  })
        .then((r) => r.json())
        .then((alllist) => {
          
          alllist.map((value,idx)=>{
              setAllUsername(olditem=>[...olditem, alllist[idx].userName])
              setAllemailId(olditem=>[...olditem, alllist[idx].emailId])
              setAllInterest(olditem=>[...olditem, alllist[idx].interest])
              
          })
          
        });
    }, []);
    const editHandler = (username1,emailId1,interest1) => {
      const idToEdit = id;
      fetch(`http://localhost:9999/user/${idToEdit}`, {
        method: "PUT",
        body: JSON.stringify({ userName: username, emailId, interest }),
        headers: {
          "Content-Type": "application/json",
        },
         credentials: "include"  
      })
        .then((r) => r.json())
        .then((resp) => {
          console.log("Got successfully response from PUT", resp);
           setUsername(username1)
           setemailId(emailId1)
           setInterest(interest1)
        });
    };
        /*<td key= {`${image[idx]}${idx}image`}><img style={{height:"80px", width:"80px"}} src={props.File}></img></td>*/
    return(
      <div>
      {editMode?( <EditMode editHandler={editHandler} setEditMode={setEditMode}/>): (<div>
          <img style={{height:"80px", width:"80px"}} src={props.File}></img>
          
          <table>
           <thead>
            <tr>

                <th>Username</th>
                <th>EmailID</th>
                <th>Interest</th>
                <th>Actions</th>   
            </tr>
            </thead>
            <tbody>
            
         
              <tr> 
                  <td >{username}</td>
                  <td >{emailId}</td>
                  <td >{interest}</td>
                  <td>
                  <button onClick={()=>setEditMode(true)}>Edit</button>
                  <button onClick={deleteHandler}>Delete</button>
                  </td>
                  
                  
              </tr>
              {allusername.map((value,idx)=>(
              <tr>
                   <td key= {`${allusername[idx]}${idx}allusers`}>{allusername[idx]}</td>
                  <td key= {`${allemailId[idx]}${idx}allids`}>{allemailId[idx]}</td>
                  <td key={`${allinterest[idx]}${idx}allinterest`}>{allinterest[idx]}</td>
                  <td>
                  <button onClick={()=>setEditMode(true)}>Edit</button>
                  <button onClick={deleteHandler}>Delete</button>
                  </td>
              </tr>
          )
          )}
          
          
          </tbody>
        
    
            
       </table>
     </div>)}
     </div> )
            
}
export default Dashboard;