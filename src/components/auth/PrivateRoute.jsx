import React from 'react'
import {Route} from "react-router-dom";
import {isLoaded,isEmpty} from "react-redux-firebase";
import {useSelector} from "react-redux";
import Fallback from '../Fallback';
const PrivateRoute = ({children, ...rest}) => {
    const auth=useSelector((state)=>state.firebase.auth)
    return (
       <Route {...rest}
       render={()=>isLoaded(auth) && !isEmpty(auth) ? children 
    : <Fallback/>}
       />
    )
}
export default PrivateRoute

/*
 <PrivateRoute exact path="/">
        <App/>
      </PrivateRoute>
      PrivateRoute u Route gibi kullanabilmek icin birkere react-router-dom dan Route a ihtiyacim var
      PrivateRoute umuz bir App children prop u aliyor ayni zamanda exact, path gibi de proplar aliyor.Bu propslari PrivateRoute umuzun props alanindan belirtmeliyiz
const PrivateRoute = (children, ...rest)
children i bu sekilde aliyoruz cunku PrivateRoute icinde lazim olacak kullanacagiz, ve geri kalan diger props lar olan, exact,path gibi propslarin hepsini icine alsin diye de ...rest seklinde kullaniriz
Ardinda return olarak tabiki Route dondurmesi gerekiyor ve ayni zamanda prop olarak dondurudugu ...rest i ayni sekilde prop olarak Route icine vermem gerekiyor, children i ise kullanacagiz sayfa yonlendirmsini ayarlarken
Tabi bu Route  icerisinde bir de render alani var, render edilmesi gerekiyor, render bir fonksiyondur aslinda Route islemimiz icerisinde
PrivateRoute umuz kisaca sunu yapacak benim user imiz authenticate oldu mu yani login oldu mu eger login oldu ise ornegin App componentini dondur olmadi ise de Login componentini dondur gibi birsey
useSelector araciligi ile de redux-store daki profil bilgisini alacagiz
   Kullanici login oldugu zaman bizim reducer olarak koydugumuz firebase icerisindeki auth propertisine profil bilgimiz gelmis olacak
   Auth bilgimizi, profil bilgimizi biz redux-dev-tools chrome eklentimizden de bu auth,profilbilginin gelip gelmedigini cek edbiliriz...
    isLoaded(auth) auth kismi yuklendi ise   !isEmpty(auth) ayni zamanda gelen auth bos ta degil ise children i render et yani App componentimizi render et cunku kullanici login olmus, degil ise de bir fallback ui render et bu da muhtemelen bir uyari mesaji verecegiiz birsey olacak.
    Burda su kisma dikkat edelim burda children yaparak biz aslinda bu isi dinamik yapmis olduk yani PrivateRouter sadece App componentine ozel bir componet degil, biz ayni zamanda ornegin bir de Dashboard componentini ornegin kullanici giris yapmadiigi surece erisemesin istersek o zaman onun icinde PrivateRoute kullanacagiz
    /*
      <PrivateRoute exact path="/">
        <App/>
      </PrivateRoute>
     <PrivateRoute exact path="/">
        <Dashboard/>
      </PrivateRoute>

       <Route {...rest}
       render={()=>isLoaded(auth) && !isEmpty(auth) ? children 
    : <div>Loading</div>}
       />
       Bir tane Fallback.jsx olusturacagiz, components klasoru icerisinde ve biz bunun icerisnden Loading turu bir alan gostermek istiyoruz...
    */
