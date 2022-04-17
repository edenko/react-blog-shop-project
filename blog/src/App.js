/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '리액트 독학']);
  let [like, setLike] = useState(0);
  let [modal, setModal] = useState(false);
  let [clickTitle, setClickTitle] = useState(0);
  let blogTitle = {color:'white', fontSize:23};
  let [inputValue, setInputValue] = useState('');
  function changeTitleFunc() {
    var newArray = [...title];
    newArray[0] = '여자 코트 추천';
    setTitle( newArray.sort() );
  }

  return (
    <div className="App">
      <div className='black-nav'>
        <div style={blogTitle}>개발 Blog</div>
        <button className='btn-nav' onClick={changeTitleFunc}>버튼</button>
      </div>

      { title.map(function(data, i){
        return (
        <div className="list" key={i}>
          <h3 onClick={()=>{setClickTitle(i)}}>
            <span onClick={()=>{setModal(!modal)}}>
              {data}
            </span>
            <span className='like-icon' onClick={()=>{setLike(like+1)}}>
              👍🏻
            </span>
            {like}
          </h3>
          <p>2월 18일 발행</p>
          <hr />
        </div>
        )
      }) }

      {/* <input onChange={(e)=>{setInputValue(e.target.value)}}></input> */}

      <div className="publish">
        <input onChange={(e)=>{setInputValue(e.target.value)}} />
        <button onClick={()=>{
          let arrayCopy = [...title];
          arrayCopy.unshift(inputValue);
          setTitle(arrayCopy);
        }}>저장</button>
      </div>

      {
        modal === true 
        ? <Modal title={title} clickTitle={clickTitle}/> 
        : null
      }
    </div>
  );
}

function Modal(props){
  return (
    <div className="modal">
      <h2>{props.title[props.clickTitle]}</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
