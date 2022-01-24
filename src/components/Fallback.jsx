import React from 'react'
import {Dimmer,Loader,Image,Segment,Icon} from "semantic-ui-react";
const Fallback = () => {
    return (
       <Segment style={{height:"100vh"}}>
           <Dimmer active>
               <Loader/>
           </Dimmer>
           <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' /> {""}
       </Segment>
    )
}
export default Fallback
/*
googl dan semantic ui react loader seklinde arama yaparsak semanti-ui sitesinde loading icin kullanilan Image yi direk aliriz ve bu bize boyle donen bir yuvarlak ile loading ifadesini hareketli resim ile vermis oluyor
<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
*/