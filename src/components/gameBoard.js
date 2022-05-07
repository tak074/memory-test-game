import React, { useState, useEffect } from 'react';
import './gameBoard.css';
// import styled from "styled-components";

function GameBoard() {
  // hooks
  const [dotVal, setDotVal] = useState([1,2]);
  const [roundNum, setRoundNum] = useState(1);
  const [solution, setSolution] = useState([]);
  const [buttonClassName, setButtonClassName] = useState('vis');
  const [message, setMessage] = useState('');

  // variables
  const clickedColor = 'gray';
  const warningColor = 'red';
  const failMessage = 'oops. Better luck next time.';
  const visTimePeriod = 1000;

  // generating random numbers for dots
  useEffect(() => {
    let randomNums = [];
    let currNumLib = {};
    let dotMax = 50;

    const test = () => {
      setTimeout(handleLightOut, visTimePeriod);
    }

    // update the highest number based on round number
    if (roundNum < 10) {
      dotMax = 10;
    } else if (roundNum < 20) {
      dotMax = 20;
    }

    for (let i = 0; i < roundNum; i++) {
      let currNum = getRandomInt(dotMax);
      while (currNumLib[currNum]) {
        currNum = getRandomInt(dotMax);
      }
      randomNums.push(currNum);
      currNumLib[currNum] = true;
    }
    setDotVal(randomNums);
    setSolution(Object.keys(currNumLib));

    // make dots invisible few seconds after initial load
    test();
  },[roundNum]);



  // components
  const Bubbles = () => {
    let populated = dotVal.map((ele) => {
      return (
        <button
          disabled = {buttonClassName !== 'invis'}
          className={buttonClassName}
          onClick={handleClick}
        >{ele}</button>
      )
    })

    return (
      <div>
        {populated}
      </div>
    )
  }

  // functions
  const handleClick = (e) => {
    e.preventDefault();
    const currVal = e.target.innerHTML;

    if (solution[0] === currVal) {
      e.target.style.color = clickedColor;
      e.target.style.backgroundColor = clickedColor;
      e.target.style.pointerEvents = 'none';

      let temp = solution;
      temp.shift();
      setSolution(temp);

      if (temp.length === 0) {
        console.log('finished!');
        handleSuccessRound();
      }
    } else {
      handleFail();
    }
  };

  const handleFail = () => {
    setMessage(failMessage);
    setTimeout(handleReset, 2000);
  }


  const handleSuccessRound = () => {
    setRoundNum(roundNum + 1);
    setButtonClassName('vis');
    setMessage('');
    setTimeout(handleLightOut, visTimePeriod);
  }

  const handleReset = () => {
    setRoundNum(1);
    setMessage('New Game!');
    setButtonClassName('vis');
  }

  const handleLightOut = () => {
    setButtonClassName('invis');
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }


  return (
    <div>
      <Bubbles/>
      <p>{message}</p>
      <button
      onClick={handleReset}
      >Start Over</button>
    </div>
  );
}

export default GameBoard;
