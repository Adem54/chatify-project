import {createStore, applyMiddleware} from "redux";
import  {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./rootReducer";

//bos bir initialstate olarak bos bir obje veriyoruz store da henuz verimiz yok..Ve de composeDevTools umuzu da cagiriyoruz ki store umu reduxdevtools ile debug edebiliyoruz
const store=createStore(rootReducer, {}, composeWithDevTools())
export default store;