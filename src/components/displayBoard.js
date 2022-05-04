import React, { useState } from 'react';
import styled from "styled-components";

function DisplayBoard() {
  // hooks
  const [displayText, setDisplayText] = useState('Click to Start');

  // style
  const Display = styled.section`
    align-content: center;
    margin: auto;
    padding: 4em;
    width: 30%;
    aspect-ratio: 9/16;
    background: papayawhip;
  `;

  const DisplayMessage = styled.div `
    display: flex;
    justify-content: center;
    position: relative;
    top:50%;
  `;

  // components
  const StartScreen = () => {
    return (
      <DisplayMessage
        onClick={(e) => {handleClick(e, "start")}}>
        {displayText}
      </DisplayMessage>
    )
  }

  // functions
  const handleClick = (e, msg) => {
    e.preventDefault();
    if (msg === "start") {
      setDisplayText('Game Start!');
    }
  };


  return (
    <Display>
      <StartScreen/>
    </Display>
  );
}

export default DisplayBoard;
