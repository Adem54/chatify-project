import { combineReducers } from "redux";
import { reducer as firebase } from "react-redux-firebase";
import channelReducer from "./reducers/channelReducer";

//firebase i reducer olarak import ediyoruz bu alanda
//Reducerlar pure fonksiyonlardir,state ve action alan ve  yeni state i donduren pure fonksiyonlardir, yani hep ayni parametre ile cagirdigimizda hep ayn sonucu donduren fonks
const rootReducer = combineReducers({
  firebase,
channels:channelReducer
  //user:userReducer,
});
//redux store objemiz firebase,user ve channels diye alanlarimiz olusmus oluyor
export default rootReducer;
