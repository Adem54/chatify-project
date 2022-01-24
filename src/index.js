import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import firebase from "./firebase";
import { Provider } from "react-redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
//fbConfig i biz firebase.js de yaptik zaten onun icin ordan import edecegiz
import store from "./store/store";
import App from "./App";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";

//burda reac-redux-firebase kismini olusturagiz
// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};
//react-redux-firebase props
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};
const Root = () => {
  const history=useHistory();
  useEffect(()=>{
    //eger user varsa login olmus anlamina gelir ama eger user im gelmezse logout olmus olur
    //Bizde login olmus ise eger ana sayfaya, login olmamissa da tekrardan signup ya da login kismina yonlendirmek istiyoruz
firebase.auth().onAuthStateChanged((user)=>{
  if(user) {
 history.push("/");
  }else{
history.push("login");
  }
})
  }, []);
  return (
    <Switch>
      <PrivateRoute exact path="/">
        <App/>
      </PrivateRoute>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};
//Router in ana componentimiz olan Root componenti sarmaasi gerekiyor cunku react-router-dom dan history i kullaninca mesela, Root ta onu alabilemiz icin kullanmamiz gerekiyor
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <Root />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
/*
Her 3 router da  / bu sekilde basliyor ve App componentini yazdigimiz component te sadece yan cizgi old icin birbirine karistirabiliyor, slash old zaman bu slash signup, ve login component i ti de App componenti ile birlikte yuklenmis olur bunlarin olmamasi icin, bana / slash olunca sadece, App component i gelmesi icin, exact i da kullaniriz
*/
