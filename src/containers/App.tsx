/************************
 * The App , this is a container that has a state and handles the logic of the game
 * This container displays the FeedBack Component and the Board Component
 */
import React, { useState } from "react";
import "./App.scss";
import Board from "../components/Board/Board";
import FeedbackBar from "../components/FeedbackBar/FeedbackBar";
import { Result } from "../Types";





const App: React.FC = () => {
  // Values for the board cells
  // 0 = Not played
  // 1 = played by player X
  // -1 = played by player O
  const [values, setValues] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  const [player, setPlayer] = useState(1);

  // this function allow the player to select a cell
  const playCell = (row: number, col: number) => {

    //we verify if the cell is empty and that the game isn't over
    if (values[row][col] === 0 && result.winPlayer === 0) {
      values[row][col] = player;
      setValues(values);
      setPlayer(-player);
    }
  };

  /* Please not it's possible to do a switch to verify the winning combinations,
   * however it's a solution that is hard to maintain and evolve if
   * you wish to increment the size of the playing board
  */
  /* If you add the player turn as a parameter you can reduce the complexity of the function, 
   * but i didnt want to change the declaration of the function
  */
  //This function returns the status of the game
  const getResult = (values: number[][]): Result => {

    // we have the possible winning combinations in this array
    const winningCombinations = [[[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]], [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]], [[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]]];
    let winIndexes: number[][] = [];

    // we check if a  wining combination is met by the cells selected by the player X
    const winnerX = winningCombinations.some(
      (element) => {
        let result = element.every(index => values[index[0]][index[1]] === 1);
        result && (winIndexes = element);
        return result;
      }
    );
    if (winnerX) {
      return {
        winPlayer: 1,
        winCells: winIndexes,
        draw: false
      }
    }
    // we check if a  wining combination is met by the cells selected by the player Y
    const winnerY = winningCombinations.some(
      (element) => {
        let result = element.every(index => values[index[0]][index[1]] === -1);
        result && (winIndexes = element);
        return result;
      }
    );
    if (winnerY) {
      return {
        winPlayer: -1,
        winCells: winIndexes,
        draw: false
      }
    }
    //we check if we have a draw by verifying that there isn't any empty cell,notice that alrezdy verified if nor the player X or Y won.
    if (!values.some((row) => row.indexOf(0) !== -1)) {
      return {
        winPlayer: 0,
        winCells: winIndexes,
        draw: true
      };
    }
    // if no one won and we dont have a draw, we retuen a result that allows us to keep playing.
    return {
      winPlayer: 0,
      winCells: winIndexes,
      draw: false
    }
  }

  // This function resets the game
  const resetGame = () => {
    setValues([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
    setPlayer(1);
  };

  const result: Result = getResult(values);

  return (
    <div className="App">
      <div className="App-center">
        <FeedbackBar {...{ player, result, resetGame }} />
        <Board {...{ values, result, playCell, player }} />
      </div>
    </div>
  );
};

export default App;
