import React, { useEffect, useRef, useState } from "react";
import {
  Segment,
  Header,
  Icon,
  Comment,
  Form,
  Input,
  Button,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useForm } from "react-hook-form";
import { useFirebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import Message from "./Message";
import { v4 as uuidv4 } from "uuid";
import { scryRenderedDOMComponentsWithTag } from "react-dom/cjs/react-dom-test-utils.development";

const ChatPanel = ({ currentChannel }) => {
  useFirebaseConnect([
    {
      path: `messages/${currentChannel.key}`,
      storeAs: "channelMessages", //Dinledigmiz kisma yeni isimlendirme yapacagiz, cunku biz aslinda bir subDirectory yani channel/messages gibi bir kismi degil de onun altinda bir key i dinledigim icin bu sekilde bir isimlndirme yapiyoruz
    },
  ]);
  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);
  const currentUserUid = useSelector((state) => state.firebase.auth.uid);
  const channelMessages = useSelector(
    (state) => state.firebase.ordered.channelMessages
  );
  console.log("channelMessages: ", channelMessages);
  const [searchTerm, setSearchTerm] = useState("");

  //Mesajlarimizi yazacagimiz state content state idir
  const [content, setContent] = useState("");
  console.log("content: ", content);

  const fileInputRef = useRef(null);
  const messagesEndRef=useRef(null);


  useEffect(()=>{
messagesEndRef.current.scrollIntoView({
    behaviour:"smooth",
    block:"end",
})
  });

  //HandleSubmit ile yapmak istedigimiz sey yeni bir mesaj uretip content state ini kullanarak firebase e yollamak
  //Dikkat edelim veri gonderme ve veri alma isleminde state ler uzerinden yapyoruz bu islemleri ve  her zaman o veri gelmis mi veya icinde veri var mi, bos mu , dolu mu bunlari check ederek yapmaliyiz bu verilerin degisme durumlarini goz onune almaliyiz, yani eger content bos ise o zaman veri yoksa gondermene de gerek yok ama content dolu ile yani mesaj varsa o zaman gonder, biz mesaj icerigi content i biz yaziyor olacagiz ama firebase e sadec bu sekilde gondermeyecegiz cunku dikkat edelim mesaj lar geldiginde mesaj bilgisi, kim tarafindan yazildigi vs bilgilieri ile geliyor buna dikkat edelim, timestatp i biz firebase den alacagiz
  //   timestap:firebase.database.ServerValue.TIMESTAMP, gonderdigimiz mesajimiz veritabanina kaydoldugu zaman timestamp verisi otomatik olarak olusturuluyor olacak
  //id yi de burdan gonderecegiz-  const currentUserUid=useSelector(state=>state.firebase.auth.uid)
  const handleSubmit = (event) => {
    event.preventDefault();
    if (content !== "") {
      const message = {
        content,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          id: currentUserUid,
          name: profile.name,
          avatar: profile.avatar,
        },
      };
      firebase.push(`messages/${currentChannel.key}`, message).then(() => {
        setContent("");
      });
    }
  };

  const uploadMedia = (event) => {
    //Bir kere 1 dosya yuklemesine izin verecegiz
    const file = event.target.files[0];
    console.log("file: ", file);
    if (file) {
      //Dosyalari firebase Storega alanina kaydedecegiz
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`chat/public/${uuidv4()}.jpg`);
      //random bir uid olusturacagiz- npm i --save uuidv4  uuid() random bir string olusturuyoruz
      return fileRef
        .put(file)
        .then((snap) => {
          fileRef.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
            sendMediaMessage(downloadURL);
          });
        })
        .catch((error) => {
          console.log("error upploading file ", error);
        });
    }
  };

  const sendMediaMessage = (url) => {
    //Mesaj olusturma isleminde yaptigigmi gibi bir mesaj olusturacagiz ama icerik image olacak
    const message = {
      image: url,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUserUid,
        name: profile.name,
        avatar: profile.avatar,
      },
    };

    firebase.push(`messages/${currentChannel.key}`, message).then(() => {
      console.log("Media message sendt");
    });
  };
//Resme gore degil arama content text ler icinde, text lere gore arama
  const filterMessages=()=>{
    const regex=new RegExp(searchTerm, "gi");//key insensitive-kucuk harf buyuk harf farketmesin diyourz
    const searchResults=[...channelMessages].reduce((acc,message)=>{
      if(message.value.content && message.value.content.match(regex) ||
      (message.value.user && message.value.user.name.match(regex))//Kullanici aramasi da yapmak istiyoruz yani biz bizim aradigimiz kullanicinin yazdigi mesajlari gormek istiyoruz
      ){
        acc.push(message)//searchResultta gecen mesajlar dan herhanngi birinde search kutusuna girilen mesaj da o ifadeler geciyorsa onlari acumulatora push et
      }
      return acc;
    },[])
    return searchResults;
  }
  const renderedMessages=searchTerm !== "" ? filterMessages() :channelMessages;
  return (
    <React.Fragment>
      {/* Messages Header */}
      <Segment clearing>
        <Header as="h3" floated="left">
          <span>
            <Icon name="hashtag" />
            {currentChannel.name}
          </span>
        </Header>
        {/* Search Messages 
            Hem mesaji yazan kullanici bilgisini arayacak 
            Hem de mesaj icerigini ariyor olabilecek
            */}
        <Header as="h3" floated="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </Header>
      </Segment>
      {/*  Burasi da mesajlari gosterecegimiz alan */}
      <Segment
        clearing
        style={{ position: "fixed",  top: "55", bottom: "70", width: "81%" }}
      >
        <Comment.Group
          style={{ height: "78vh", overflowY: "auto", maxWidth: "100%" }}
        >
          {/* overflowY:"auto" height olarak yani Y ekseninde normal yukseklik asildigi zaman, yani mesajlarim arttigi zaman scroll ekle demek */}
          {/*Simdi burda channelMessages seklinde gelen mesajlarimizi filtereleyecegiz yani arama search yapilmasini saglayacagiz ondan dolayi onu artik renderedMessages yapacagiz */}
          {renderedMessages &&
            renderedMessages.map(({ key, value }) => (
              <Message key={key} message={value} />
            ))}
            <div ref={messagesEndRef}/>
        </Comment.Group>
      </Segment>
      {/* Send new messages */}
      <Segment 
        style={{ position: "fixed",  bottom: 0, width: "85%", display: "flex" }}
      >
        {/* Dosya mesaji gonderebilecegi bir button-yani resim vs yukleyebilecek mesaj a */}{" "}
        <Button icon onClick={() => fileInputRef.current.click()}>
          <Icon name="add" />
          <input
            type="file"
            name="file"
            ref={fileInputRef}
            onChange={uploadMedia}
          />
        </Button>
        {/* Mesajimizi yazacagimiz alan burasi, bir form icerisine yaziyoruz mesajimizi */}
        <Form onSubmit={handleSubmit} size="large" style={{ flex: "1" }}>
          <Input
            fluid
            name="message"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            labelPosition="left"
            placeholder={`send message to #${currentChannel.name} channel`}
          />
        </Form>
      </Segment>
    </React.Fragment>
  );
};

export default ChatPanel;

/*
  <Form.Field>
            <input
              icon="message"
              name="message"
              id="message"
              placeholder={`send message to #${currentChannel.name} channel`}
              type="text"
              {...register("contentMessage")}
            />
          </Form.Field>
*/
