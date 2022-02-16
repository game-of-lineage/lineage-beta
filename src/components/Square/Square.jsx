import * as React from "react";
import { useState, useEffect } from "react";
import "./squareStyles.scss";

import beedrill from "../../pokemon/beedrill.png";
import caterpie from "../../pokemon/caterpie.png";
import charizard from "../../pokemon/charizard.png";
import charmander from "../../pokemon/charmander.png";
import diglett from "../../pokemon/diglett.png";
import dragonite from "../../pokemon/dragonite.png";
import eevee from "../../pokemon/eevee.png";
import ekans from "../../pokemon/ekans.png";
import geodude from "../../pokemon/geodude.png";
import jigglypuff from "../../pokemon/jigglypuff.png";
import likitung from "../../pokemon/likitung.png";
import magikarp from "../../pokemon/magikarp.png";
import magnemite from "../../pokemon/magnemite.png";
import mew from "../../pokemon/mew.png";
import mewtwo from "../../pokemon/mewtwo.png";
import oddish from "../../pokemon/oddish.png";
import onyx from "../../pokemon/onyx.png";
import pidgey from "../../pokemon/pidgey.png";
import pikachu from "../../pokemon/pikachu.png";
import psyduck from "../../pokemon/psyduck.png";
import rattata from "../../pokemon/rattata.png";
import squirtle from "../../pokemon/squirtle.png";
import voltorb from "../../pokemon/voltorb.png";
import weedle from "../../pokemon/weedle.png";
import zubat from "../../pokemon/zubat.png";

const pokemonArray = [

  beedrill,
  caterpie,
  charizard,
  charmander,
  diglett,
  dragonite,
  eevee,
  ekans,
  geodude,
  jigglypuff,
  likitung,
  magikarp,
  magnemite,
  mew,
  mewtwo,
  oddish,
  onyx,
  pidgey,
  pikachu,
  psyduck,
  rattata,
  rattata,
  squirtle,
  voltorb,
  weedle,
  zubat,
];
// renders a node that is either "alive" or "dead"
const Square = ({
  alive,
  rowIndex,
  columnIndex,
  BOARD_WIDTH,
  handleSquareClick,
}) => {
  // sets state of node for whether it's alive or dead, starts as dead

  return (
    <div
      onClick={() => {
        handleSquareClick(rowIndex, columnIndex);
      }}
      style={{ width: `${100 / BOARD_WIDTH}%` }}
      className={alive ? `alive` : "dead"}
    >
      {alive !== 0 && <img src={pokemonArray[alive-1]}></img>}
    </div>
  );
};

export default React.memo(Square);
