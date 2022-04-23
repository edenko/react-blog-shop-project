import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App2';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore, combineReducers} from 'redux';

// let store = createStore(()=>{ return [{id : 0, name : '멋진신발', quan : 2}]  })
let basicState = [{id : 0, name : '간지신발', quan : 2}];
function reducer(state = basicState, action){
  if(action.type === 'addCart') {
    let copy = [...state];
    copy.push(action.payload);
    return copy
  }
  
  if (action.type === 'addCount') {
    let copy = [...state];
    copy[0].quan++;
    return copy
  } else if(action.type === 'subCount') {
    let copy = [...state];
    copy[0].quan--;
    return copy
  }else {
    return state
  }
}
// let store = createStore(reducer);

let alertDefault = true;
function reducer2(state = alertDefault, action){
  if(action.type === 'closeAlert') {
    return false
  } else {
    return state
  }
}
let store = createStore(combineReducers({reducer, reducer2}));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
        {/* <App2/> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
