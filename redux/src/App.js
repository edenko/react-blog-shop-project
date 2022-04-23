import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar,Nav,NavDropdown,Container,Table,Form,Button,FormControl } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';

function App(props) {
  let state = useSelector((state)=>state);
  let dispatch = useDispatch();

  let [shoes, setShoes] = useState();
  let marginRight = {marginRight:5};
  
  useEffect(()=>{
    axios.get('https://codingapple1.github.io/shop/data2.json')
      .then((result)=>{setShoes(result.data)})
      .catch();
  },[]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Redux Test</Navbar.Brand>
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

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
        { state.reducer.map((a,i)=>{
          return (
          <tr key={i}>
            <td>{a.id}</td>
            <td>{a.name}</td>
            <td>{a.quan}</td>
            <td>
              <Button variant="outline-dark" onClick={()=>{dispatch({type: 'subCount'})}}> - </Button>
              <Button variant="outline-dark" onClick={()=>{dispatch({type: 'addCount'})}}> + </Button>
            </td>
          </tr>
          )
        })  }
        </tbody>
      </Table>

      {
        state.reducer2 === true
        ? (<div className="my-alert">
            <p>지금 구매하시면 20% 할인</p>
            <Button variant="primary" onClick={()=>{dispatch({type: 'closeAlert'})}}> 닫기 </Button>
          </div>)
        : null
      }

      <br />
      <Button 
        variant="warning" 
        onClick={()=>{
          dispatch({type: 'addCart', payload: {id: 1, name: '새로운상품', quan: 1}})
        }}
      >장바구니 추가하기</Button>
    </div>
  );
}

// function stateToProps(state) {
//   return {
//     state : state.reducer,
//     openAlert : state.reducer2
//   }
// }
// export default connect(stateToProps)(App);
// userSelector Hook
export default App;
