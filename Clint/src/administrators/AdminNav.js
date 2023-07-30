import React from "react";

export default function AdminNav (){
    return(
        <div className="adminnav" style={{margin:'0', display:'flex', justifyContent:'space-between',alignItems:'center', color:'white', backgroundColor:'black', padding:'1rem'}}>
            <h3>Home</h3>
            <span>sign Out</span>
        </div>
    )
}