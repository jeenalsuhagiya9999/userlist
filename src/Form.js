import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Dashboard from './Dashboard';
/*import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';*/
function Form(props){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownText, setDropdownText] = useState("Interest");
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailId, setEmailID] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alerts, setAlerts] = useState("");
    const [text, setText] = useState("");
    const[passwordCheck, setPasswordCheck] = useState("");
    const[submit, setSubmit] = useState(false);
    const [file, setFile] = useState("");
    const submitHandler = ()=>{
     
     if(username.trim().length===0 || password.trim().length===0 || emailId.trim().length===0 || confirmPassword.trim().length===0 || dropdownText==="Interest" || file.trim().length===0){
         setAlerts("Please fill required filled")
         setPasswordCheck("");
     }
     else if(password!==confirmPassword){
         setAlerts("");
         setPasswordCheck("Confirm password is not same as password")
     } else {
         setAlerts("");
         setPasswordCheck("");
         
         props.signupHandler(username, password)
         props.AddInfoHandler( username,emailId, dropdownText)
         setSubmit(true);
     }
    }
    const usernameHandler=(e)=>{
     setUsername(e.target.value)
      if(username.trim().length>=6){
          setText("");
      } else {
        setText("username should contain atlest 6 character")
      }
    }
    const handlechange=(event)=>{
       setFile(URL.createObjectURL(event.target.files[0]));
    }
    return submit? (<Dashboard File={file}/>): (
       
     <div>
           <form> 
            <label htmlFor="username">Username*</label>
            <br></br>
            <input type="text" name="username" placeholder="Enter Username" value={username}
            onChange={usernameHandler}></input>
            <p style={{color:"red"}}>{text}</p>
            
            <label htmlFor="password">Password*</label>
            <br></br>
            <input type="password" name="password" placeholder="Enter Password" value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
            <br></br>
            <label htmlFor="confirm password">Confirm Password*</label>
            <br></br>
            <input type="password" name="confirm password" placeholder="Enter Password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
            <br></br>
            <label htmlFor="EmailId">EmailID*</label>
            <br></br>
            <input type="email" name="EmailId" placeholder="Enter Email" onChange={(e) => setEmailID(e.target.value)}></input>
            <br></br>
            <label htmlFor="img">Profile Image*</label>
            <br></br>
            <input type="file" name="img" accept="image/*" placeholder="Add photo" alt="Submit" width="50" height="50" onChange={handlechange}></input>
            <br></br>
            <label htmlFor="dropdown" >Interest*</label>
            <Dropdown className="dropdown" isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle className="dropdown" caret>
               {dropdownText}
            </DropdownToggle>
            <DropdownMenu>
        
            <DropdownItem onClick={()=>setDropdownText("Sports")}>Sports</DropdownItem>
            <DropdownItem onClick={()=>setDropdownText("Technology")}>Technology</DropdownItem>
            <DropdownItem onClick={()=>setDropdownText("News")}>News</DropdownItem>
            <DropdownItem onClick={()=>setDropdownText("Music")}>Music</DropdownItem>
            <DropdownItem onClick={()=>setDropdownText("Movies")}>Movies</DropdownItem>
            
            </DropdownMenu>
    </Dropdown>
    {props.error ? <div className="error">{props.error}</div> : null}
    
    <p style={{color:"red"}}>{alerts}</p>
    <p style={{color:"red"}}>{passwordCheck}</p>
  <button type="button"onClick={submitHandler}> Submit</button>
    </form>
    
        </div>
        
    )
}
export default Form;