import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import {Icon} from "semantic-ui-react";
const UserPanel = () => {
    const firebase=useFirebase();
    const profile=useSelector((state)=>state.firebase.profile)
    //Profile in privateRoute dan dolayi kesin olarak yuklendigini biliyoruz ondan dolayi isEmpty dememize gerek yok
   const signOut=()=>{
       firebase.logout();
   }
   
    return (
        <div  style={{padding:"2px", display:"flex", justifyContent:"space-between"}}>
            <p>{profile?.name}</p>
            <div>
               <Icon name="sign out" onClick={()=>signOut()} />
            </div>
        </div>
    )
}
export default UserPanel
