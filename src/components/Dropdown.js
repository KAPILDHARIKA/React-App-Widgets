import { useState, useEffect, useRef } from "react";
import React from 'react';


const Dropdown = ({ label, options, selected, onSelectedChange}) => {
 const [open , setOpen] = useState(false);
 const ref = useRef();
 
 useEffect(() => {
  const onBodyClick = (event) => {
   if (ref.current && ref.current.contains(event.target)){  //contains helps us to check if one dom element comes under another
       return;
    }
    setOpen(false);
  };

  document.body.addEventListener('click', onBodyClick);
    
    return () => {
       document.body.removeEventListener('click', onBodyClick);
   };  
},[]);

const renderedOptions = options.map((option)=> {
if (option.value ===selected.value){
   return null;
}
return  (<div key={option.value} onClick={()=>onSelectedChange(option)} className="item">
      {option.label}
      </div>);
}); 
  
  return (
       <div ref={ref} className="ui form">
         <div className="field">
           <label className="label">{label}</label>
            <div onClick={() => setOpen(!open)} className={`ui selection dropdown ${ open?'visible active' : ''}`}>
                 <i className="dropdown icon"></i>
                 <div className="text">{selected.label}</div>
                 <div className={`menu ${open?'visible transition': ''}`}>
                    {renderedOptions}
                 </div>
            </div>
            <br></br>
            {!label ? <label style={{'color':selected.value}} className="label">{ `${selected.value?`This text is ${selected.value}!`:''}`}</label>
             : ''
             }
         </div>
       </div>
 );
};


export default Dropdown;