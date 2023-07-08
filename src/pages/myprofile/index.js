import React from "react";
import './MyProfile.scss'
import MyUserProfile from "../../components/myuserprofile/MyUserProfile";
import { Users } from "../../data/Users";

export default function MyProfile (){
    const user = Users.find(user => user.id === 1)
    return(
        <MyUserProfile user={user}/>
    )
}