/**********************
* The FeedBackBar
* this component id responsible of showing informations such as the player to play and the winner
*/

import React, { Fragment } from "react";
import "./FeedbacBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faDotCircle, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FeedbackBarProps } from "../../Types";
import Colors from "../../themes/Colors";
import Images from "../../themes/Images";


// this function handles the logic of the elements and messages to display depending of the player varible and the status of the game
// the function return a jsx element
const elementToShow = (player: number, draw?: boolean, winner?: number) => {
  let output;
  if (draw) {
    output = (
      <div className="FeedBackMessage">
        <span> We have a draw</span>
        <img src={Images.angryEmoji} />
      </div>
    )
  } else if (winner === 0) {
    output = (

      //it's possible to create a higher order component and use it instead of Fragement
      <Fragment>
        <div className={`FeedbackBarPlayerTurn ${player === 1 ? " PlayerTurnAnimation" : ""}`}>
          <FontAwesomeIcon icon={faTimes} size="5x" color={Colors.white} />
        </div>
        <div className={`FeedbackBarPlayerTurn ${player === -1 ? " PlayerTurnAnimation" : ""}`}>
          <FontAwesomeIcon icon={faDotCircle} color={Colors.white} size="4x" />
        </div>
      </Fragment>
    );
  } else if (winner === 1 || winner === -1) {
    output = (
      <div className="FeedBackMessage">
        <span> the player {winner === 1 ? "X" : winner === -1 ? "O" : ""} wins</span>
        <img src={Images.happyEmoji} />
      </div>
    );
  }
  return output;
}

const FeedbackBar = ({ player, resetGame, result }: FeedbackBarProps) => {
  return (
    <div className="FeedbackBar">
      {elementToShow(player, result.draw, result.winPlayer)}
      <div className="FeedbackReset" onClick={resetGame}>
        <FontAwesomeIcon icon={faRedo} color={Colors.orange} size="4x" />
      </div>
    </div >
  );
};

export default FeedbackBar;
