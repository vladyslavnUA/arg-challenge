import './App.css';
import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import styled from '@emotion/styled';

function App() {

  const Button = styled.button`
    color: rgb(46, 132, 143);
  `

  const UnlikeButton = styled.button`
    color: rgb(145, 63, 25);
  `

  const ClearButton = styled.button`
    color: rgb(57, 30, 177);
  `

  const [data, setData] = React.useState(null);
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch(err => console.log(err));
  }, []);

  let mesData = '';
  if (count < 0) {
    mesData = 'No one likes negatives! Let\'s keep it at zero.';
    setCount(0);
  }

  function refreshIt() {
    window.location.reload();
    let rando = Math.floor(Math.random() * 45);
    setCount(rando);
  }

  // using react's local storage to store the updated count each page refresh
  React.useEffect(() => {
    const parsedCount = Number(localStorage.getItem("count") || 0)
    setCount(parsedCount)
  }, [])

  React.useEffect(() => {
    localStorage.setItem("count", count)
  }, [count])
  
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>Simple Picture App <Button onClick={() => refreshIt()} style={{backgroundColor: "rgb(58, 167, 211)", color:"white", height: "50px", borderRadius: "15px"}}>Refresh <i class="fas fa-sync-alt"></i></Button></h1>
        <h4>Current Like Count: {count}</h4>
        
        <p>Do You Like This Photograph?</p>
        <img src="https://picsum.photos/200/300" className="App" id="theimg"></img>
        <p>
          {mesData}
        </p>

        <ButtonGroup aria-label="Basic example">
          <Button onClick={() => setCount(count + 1)}>👍 Like</Button>
          <ClearButton onClick={() => setCount(0)}>🗑 Clear</ClearButton>
          {/* <Button>What</Button>{' '} */}
          <UnlikeButton onClick={() => setCount(count - 1)}>👎 Dislike</UnlikeButton>
        </ButtonGroup>
      </header>
    </div>
  );
}

export default App;