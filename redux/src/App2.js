import './App.css';
import { useEffect, memo } from 'react';
import axios from 'axios';

function App2(props) {  
  return (
    <>
      <Parent name="eden" age="20"></Parent>
    </>
  );
}

function Parent(props) {
  return (
    <div>
      <Child1 name={props.name}></Child1>
      <Child2 age={props.age}></Child2>
    </div>
  )
}

function Child1() {
  useEffect(()=>{console.log('랜더링1')}, []); 
  return <div>111</div>
}

let Child2 = memo(function() {
  useEffect(()=>{console.log('랜더링2')}, []);
  return <div>222</div>
})

export default App2;
