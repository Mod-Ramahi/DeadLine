import React from "react";

export default function InviteFriend (){
    return(
        <div style={{marginTop:'8rem', height:'15rem', display:'flex', flexDirection:'column', width:'40%', gap:'2rem', padding:'20rem'}}>
            <label htmlFor="friendemail">Enter Your Friend's Email Address</label>
            <input type="email" id="friendemail"/>
            <button>Invite</button>
        </div>
    )
}