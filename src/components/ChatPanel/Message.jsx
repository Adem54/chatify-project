import React from "react";
import moment from "moment";
import { Comment, Image } from "semantic-ui-react";
import styles from "./message.module.css";

const Message = ({ message }) => {
  const timeFromNow = (timestamp) => moment(timestamp).fromNow();
  //Bu sekilde biz mesajin ne zaman yazildigi ile ilgili zamani donuyor

  //messages alan i icerisine ChatPanel de hem text  hem de image gonderilebilir,bazen sadece text gonderileilir bazen de sadece image gonderilebilir
  //Gelen mesaj objesi icinde image alan i  var mi onu  kontrol ediyoruz, varsa true gelecek, yoksa false dondurecek
  const isMedia = (message) => message.hasOwnProperty("image");
  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar} />
      <Comment.Content>
        <Comment.Author as="a">{message.user.name}</Comment.Author>
        <Comment.Metadata> {timeFromNow(message.timestamp)} </Comment.Metadata>
        {isMedia(message) ? (
          <Image src={message.image} className={styles.image} />
        ) : (
          <Comment.Text>{message.content}</Comment.Text>
        )}
      </Comment.Content>
    </Comment>
  );
};

export default Message;
