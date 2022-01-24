import React, { useState } from 'react'
import { Popup,Menu,Item, Icon } from 'semantic-ui-react'
import ChannelList from '../Channels/ChannelList';
import CreateChannelForm from '../Channels/CreateChannelForm';
import UserPanel from '../UserPanel/UserPanel';
const SidePanel = () => {
    const [open,setOpen]=useState(false);
    const handleOpen=()=>{
        setOpen(true);
     }
     const handleClose=()=>{
         setOpen(false);
     }
    return (
/*Dikey menu-vertical(Menu default olarak horizontal gelir) */
     <>
        <Menu
        vertical
        inverted
        secondary
        color="blue"        
        fixed='left'
        style={{width:"346px", fontSize:"1.3rem"}}
        > <Menu.Item>
               <UserPanel/>
            </Menu.Item>
            <Menu.Item>
                <Menu.Header>
                    Channels
                    <span style={{float:"right"}}>
                    {/* Create a new Channel */}
                    <Popup
                  content="Create New Channel"
                   size="mini"
                    trigger={<Icon name="add" onClick={(event)=>handleOpen()}/>}
                    /> 
                    </span>
                </Menu.Header>
                {/* Channels */}
               <ChannelList/>
            </Menu.Item>
        </Menu>
        {
            /* CreateChannelForm */
        }
            <CreateChannelForm open={open} onOpen={handleOpen} onClose={handleClose} />
       

     </>
    )
}

export default SidePanel
