import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useFirebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Menu } from "semantic-ui-react";
import { setCurrentChannel } from "../../store/actions/channel";

const ChannelList = () => {
    useFirebaseConnect([{ path: "channels" }]);
    const dispatch=useDispatch();
    const currentChannel=useSelector((state)=>state.channels.currentChannel);
    const [mounted,setMounted]=useState(false);
    const channels = useSelector((state) => state.firebase.ordered.channels);
    //channels lari firebase channels dizisi icinde key,value proeprtiesli objeler mevcut, key, value seklinde tutuyor, kendisi bir key atiyor
    console.log("channelssss: ", channels)
    useEffect(()=>{
        console.log("!mounted: ",!mounted);
        console.log("!isEmpty(channels): ", !isEmpty(channels));
        if(!mounted && !isEmpty(channels)){
          const {key,value}=channels[0];
            console.log("channels: ", channels)
         
            dispatch(setCurrentChannel({key,...value}));
            //Ya da direk setActiveChannel i calistiririz zaten ayn isi yapiyor setActiveChannel({key,...value})
           // setActiveChannel({key,...value})
            setMounted(true);
        }
//Amacim sayfa ilk render oldugu zamn birtane setAktiveChannel fonksiyonunu aktif hale getirmektir
    })
  
  //Burda firebase i dinleme islemi gerceklestirecegiz ki ordaki kanallari buraya getirebilelim bunun icin ise useFirebaseConnect,isLoaded,isEmpty ile yapacagiz
  //Biz channels alanini dinlemesini soyleyecegiz ordaki degisiklikleri bize getirecek

  //Bu kismi ekledigimiz zaman firebase reducer imiza , ki bunu redux dev tools da chrome eklentisinden gorebiliriz artik firebase objesi altina ordered altinda  channels isminde chanels bilgilileri gelecektir, ve de ordered da sirali bir sekilde gelecektir veriler, biz bu kodlari yorum satirina alirsak ordered bos gozukur acarsak dolu gozukur ,yani bizim yazdgimiz bu satir firebase icindeki veritbanimiz icinde olusturudugumz channels alanini dinliyor. Yani kisacasi redux store umuz icinde firebase-ordered-channels icerisinde bizim kanal ekle formun da ekledigimiz verileri aliyor olacagiz ve artik useSelector ile kullanabiliriz
  //Artik biz verileri ekledikten sonra bu anlik olarak dinleme sayesinde bize anlik olarak eklenen verileri sidebarimiza getiriyor olacak
  //Birde Loading ile ilgili ornegin youtube sayfasini acarken veya herhangi birsayfayi acalim ve o loading durumunda dikkat edersek sayfalariin iskelet goruntusu geliyor iste gercek uygulamalarda bu kulaniliyor


  const setActiveChannel=(channel)=>{
      dispatch(setCurrentChannel(channel));
  }
  //channels in bos veya yuklenmemis olma durumunu handle edecegiz
  if (!isLoaded(channels)) {
    return "Loading channels..";
  }
  if (isEmpty(channels)) {
    return "No channels...";
  }
  //Asagida da bos degil ise ve yuklendi ise channels larimi goster mantigi ile yapacagiz
  return (
    <Menu.Menu>
   {channels.map(({ key, value }) => {
      return  <Menu.Item key={key}
        name={value?.name} 
        as="a" 
        icon="hashtag"
        active={currentChannel?.key===key} 
        onClick={()=>setActiveChannel({key,...value})}
        />
   }
       
      )}
    </Menu.Menu>
  );
};

export default ChannelList;
