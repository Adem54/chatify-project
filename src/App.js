import React from 'react'
import { useSelector } from 'react-redux';
import {Button, Grid} from "semantic-ui-react";
import ChatPanel from './components/ChatPanel/ChatPanel';
import SidePanel from './components/SidePanel/SidePanel';

const App = () => {
  const currentChannel=useSelector((state)=>state.channels.currentChannel);
  return (
   <Grid columns="2" style={{background:"#eee", height:"100vh"}}>
    
     <Grid.Column width="3">
 {/* Sidebar */}
 <SidePanel/>
     </Grid.Column>
     <Grid.Column width="13">
       {/* Chatpanel */}
   {currentChannel &&    <ChatPanel currentChannel={currentChannel}/>}
     </Grid.Column>
   </Grid>
  )
}

export default App
