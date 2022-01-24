import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { Form, Button, Grid, Message } from "semantic-ui-react";
import styles from "./signup.module.css";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const firebase = useFirebase();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [fbErrors, setFbErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const submitForm = ({ username, email, password }) => {
    //Burda parametreye gelen formData bizim form alanlarimzi iceren bir obje idi ve biz de destrcting ile yazdik obje icindeki elemanlari
    setSubmitting(true); //submit oldugunda, true olsun ve buton disabled olsun
    setFbErrors([]); //Her submit oldugunda hata mesajlarimiz sifirlanmis olsun...
    //kayit aninda user im icin bir avatar olusturalim yeni bir user olusturacagiz, createUser methodu ile ki bu bize firebase kutuphanesinden geliyor bunu firebase dokumantasyonundan da gorebiliriz
    const [first, last] = username.split(""); //Bu ikisini ayir demis oluoruz yani Adem Erbas gelince first Adem, last Erbas olacak ve A ve E nin basharflerinden bir avata olusturacak
    //createUser icerisine credentials yani kullanici bilgilerini ve, profile alani da mevcut ki projili guncellemek icin kullanabiliriz
    firebase
      .createUser(
        {
          email,
          password,
        },
        {
          name: username, //profil bilgimde name bilgisi ve avatar bilgisi tutmak istiyorum onun icinde Ui avatar.com a gidersek ordan da inceleyebiliriz ve bu sitede belli url adresleri ile otomatik avatar olusturuyor biz de bunlardan yararlanacagiz
          //https://ui-avatars.com/api/?name=ademerbas&background=random&color=fff bu bize AE seklidne bir avatar uretiyor
          avatar: `https://ui-avatars.com/api/?name=${first}+ ${last}&background=random&color=fff `,
        }
      ) //Bu bir promise islemi old. icin then ile gelecek veriyi then ile aliriz, ve bize gelen veri userInfo yu veriyor
      .then((user) => {
        console.log("user: ", user);
        setSubmitting(false); //artik islemimiz bitiyor
      })
      .catch((error) => {
        console.log("error: ", error);
        setFbErrors([{message:error.message}])
        setSubmitting(false);
      });
  };

  const displayErrors=()=>{
   return fbErrors.map((error,index)=><p key={index}>{error.message}</p>)
  }
  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      className={styles.container}
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <h1 className={styles.formHeader}>
          Chatify
          <span>.io</span>
        </h1>
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
          </Form.Field>
          {errors.username && (
            <p style={{ color: "tomato" }}>Please check the First Name</p>
          )}
          <Form.Field>
            <input
              icon="mail"
              name="email"
              id="email"
              placeholder="Email adress"
              type="email"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          </Form.Field>
          {errors.email && (
            <p style={{ color: "tomato" }}>Please check the Email</p>
          )}
          <Form.Field>
            <input
              name="password"
              id="password"
              placeholder="Password"
              type="password"
              {...register("password", { required: true, minLength: 6 })}
            />
          </Form.Field>
          {errors.password && (
            <p style={{ color: "tomato" }}>Please check the Password</p>
          )}
          <Button color="purple" fluid size="large" disabled={submitting}>
            Sign Up
          </Button>
        </Form>
        {
          fbErrors.length>0 && (
            <Message error>{displayErrors()}</Message>
          )
        }
        <Message>
          You har already an account?
          <Link to="/login"> Sign In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
