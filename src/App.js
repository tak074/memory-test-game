import './App.css';
import DisplayBoard from './components/displayBoard.js';
import GameBoard from './components/gameBoard.js';

function App() {
  return (
    <div>
      <h1>Memory Test Game</h1>
      <DisplayBoard/>
      <GameBoard/>
    </div>
  );
}

export default App;
