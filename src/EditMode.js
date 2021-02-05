import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
function EditMode(props){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownText, setDropdownText] = useState("Interest");
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [emailId, setEmailID] = useState("");
    const [text, setText] = useState("");
    const [username, setUsername] = useState("");

    const usernameHandler=(e)=>{
        setUsername(e.target.value)
         if(username.trim().length>=6){
             setText("");
         } else {
           setText("username should contain atlest 6 character")
         }
       }
    
    
     const saveEditedItem = () => {
        props.editHandler(username, emailId,dropdownText);
        props.setEditMode(false);
      };
    return(
        <div>
            <label htmlFor="username">Username*</label>
            <br></br>
            <input type="text" name="username" placeholder="Enter Username" value={username}
            onChange={usernameHandler}></input>
            <br></br>
            {text}
            <br></br>
            <label htmlFor="EmailId">EmailID*</label>
            <br></br>
            <input type="email" name="EmailId" placeholder="Enter Email" onChange={(e) => setEmailID(e.target.value)}></input>
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
    <button onClick={saveEditedItem}>save</button>
        </div>
    )
}
export default EditMode;