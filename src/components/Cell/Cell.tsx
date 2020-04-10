/*************************
* The Cell Component
* this component is responsible of displaying a cell in the board 
*/

import React from "react";
import "./Cell.scss";
import { CellProps } from "../../Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import Colors from "../../themes/Colors";


const Cell = ({ value, playCell, player, indexIsWinner, winPlayer }: CellProps) => {

  return (
    <div className={`Board-cell${value || winPlayer ? " played" : ""}`} onClick={playCell}>
      {!!value && <FontAwesomeIcon icon={value === 1 ? faTimes : faDotCircle} color={indexIsWinner ? Colors.green : value === 1 ? Colors.purple : Colors.blue} size="5x" />}
      {value === 0 ? <span className={winPlayer ? "hideEffect" : "hoverEffect"}><FontAwesomeIcon icon={player === 1 ? faTimes : faDotCircle} color={Colors.grey} size="5x" /></span> : null}
    </div>
  );
};

export default Cell;
