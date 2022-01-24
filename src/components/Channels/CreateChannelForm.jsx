import React, { useState } from 'react'
import {Modal,Form,Button} from "semantic-ui-react";
import {useForm} from "react-hook-form";
import {useFirebase} from "react-redux-firebase";
import { useSelector } from 'react-redux';
const CreateChannelForm = ({open,onOpen,onClose}) => {
    const firebase=useFirebase();
    const profile=useSelector((state)=>state.firebase.profile);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
//Kanali olusturan kullanicinin bilgilerine de firebase i biz reducer olarak yazmistik ve ordna bize profil bilgileri geliyordu, kullanici register y aptigi zaman, o an icin login olan kullanici ki ise onu profil bilgileri bizim redux imizda mevcuttur, yani o verilere biz redux uzerinden useSelector aracilgi ile erisebiliriz.Ayrica biz bu bilginin kesin olarak yuklendiginden emizin cunku yuklenmemis olsa biz su an ana sayfada olamayiz render bile etmesin diye PrivateRoute da ayarlamistik, orda auth bilgisini profile bilgisini varligini cek ederek yapmistik bunu
    const onSubmit = ({ name,description}) => {
      firebase.push("channels", {//channels isminde bir alan acacak firebase veritabaninda ve oraya yukleyecek, biz ne ismi verirsek o olacak burda
          name,
          description,
          createdBy: {
              name:profile.name,
              avatar:profile.avatar
          }
      })
       onClose();
    } 
    return (
    <Modal
    open={open}
    onOpen={onOpen}
    onClose={onClose}
    >
<Modal.Header>Create A New Channel</Modal.Header>
<Modal.Content>
    <Form  onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
        <input
              icon="hashtag"
              name="name"
              id="username"
              placeholder="#General"
              type="text"
             {...register("name", { required: true })}
            />
            </Form.Field>
            {errors.email && (
            <p style={{ color: "tomato" }}>Please check the name</p>)}
            <Form.Field>
            <input
              icon="hashtag"
              name="description"
              id="username"
              placeholder="#General channel where people can talk about anything"
              type="text"
              {...register("description", { required: true,minLength:10 })}
            />
        </Form.Field>
        {errors.email && (
            <p style={{ color: "tomato" }}>Please check the description</p>)}
    </Form>
</Modal.Content>
<Modal.Actions>
    <Button   color='black' onClick={()=>onClose()}> Cancel  </Button>
    <Button icon="checkmark" content="Create" color='black'   positive onClick={()=>handleSubmit(onSubmit)()}/>  
    
    {/*
    Formun disindaki bir click olayi ile biz submit olayni yapmak istiyoruz ondan dolayi cagiriken de en sonunda parantez koyacagiz
    icon="checkmark" bunu Button a attribute olarak kullanmistik ama console da ortaya cikan bir hatay i duzeltmek icin bu sekilde etkisiz hale getirdik deneyecegiz   */}
</Modal.Actions>

    </Modal>
    )
}

export default CreateChannelForm
/*
 <Form
          size="large"
          className={styles.form}
          onSubmit={handleSubmit(submitForm)}
        >
          <Form.Field>
            <input
              icon="user"
              name="username"
              id="username"
              placeholder="Username"
              type="text"
              {...register("username", { required: true })}
            />

*/