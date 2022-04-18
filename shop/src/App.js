import './App.css';
import { Navbar,Nav,NavDropdown,Container,Form,Button,FormControl } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import data from './Data';
import styled from 'styled-components'
import './Detail.scss';
import {CSSTransition} from 'react-transition-group';

function App() {
  let [shoes, setShoes] = useState(data);
  let Box = styled.div`
    padding:20px;
    background-color:#777;
    color : ${ props => props.color1 };
  `;
  let [alert, setAlert] = useState(true); 
  let [stock, setStock] = useState([10,11,12]);

  // [] : 컴포넌트 로드 때만 한번 딱 실행, 
  // [alert] : 1. Detail컴포넌트 로드가 될 때 & 2. alert라는 state가 변경이 될 때만 실행
  useEffect(()=>{
    let timer = setTimeout(()=>{setAlert(false)}, 2000);
    return ()=>{clearTimeout(timer)};
  }, []);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Shopping Mall</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className='jumbotron'>
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
        <p>
        <Button 
          variant="primary"
          onClick={()=>{
            axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{console.log(result.data)})
              .catch((error)=>{console.log(error)})
          }}
        >더보기</Button>
        </p>
      </div>

      {/* styled-components */}
      {/* <div className='container'>
        <Box color1='blue'>asdf</Box>
        <Box color1={'red'}>asdf</Box>
      </div> */}
      
      { 
        alert === true 
        ? (<Detail></Detail>) 
        : null 
      }

      <Tab></Tab>
  
      <div className="container">
        <div className="row">
          { 
            shoes.map((a, i)=>{
             return <Card shoes={shoes[i]} i={i} stock={stock} setStock={setStock} key={i}/>
            })
          }
        </div>
      </div>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg' } width="100%"/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
      <Info stock={props.stock}></Info>
      <Button 
        variant="warning"
        onClick={()=>{props.setStock([9,10,11])}}
      >주문하기</Button>
    </div>
  )
}

function Info(props) {
  return (
    <p>재고 : {props.stock[0]}</p>
  )
}

function Detail() {
  return (
    <div>
      <div className="my-alert">
        <p>재고가 얼마 남지 않았습니다</p>
      </div>
    </div>
  )
}

function Tab() {
  let [pushTab, setPushTab] = useState(0);
  let [switch1, setSwitch1] = useState(false);

  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{setSwitch1(false); setPushTab(0)}}>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{setSwitch1(false); setPushTab(1)}}>Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={()=>{setSwitch1(false); setPushTab(2)}}>Option 3</Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={switch1} classNames="wow" timeout={1000}>
        <TabContent pushTab={pushTab} setSwitch1={setSwitch1}/>
      </CSSTransition>
    </div>
  )
}

function TabContent(props){
  useEffect( ()=>{
    props.setSwitch1(true); //탭 내용 컴포넌트가 로드될 때 true
  });

  if (props.pushTab === 0){
    return <div>내용0</div>
  } else if (props.pushTab === 1){
    return <div>내용1</div>
  } else if (props.pushTab === 2){
    return <div>내용2</div>
  }
}

export default App;
