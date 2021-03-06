import React, { createContext, useReducer, useEffect } from "react";

import Reducer from "./Reducer";
import * as Actions from "./Actions";

export const GameContext = createContext();

// const initialState = CreateState;
const initialState = {
  editMode: false,
  selectedObject: 1,
  tileSize: 3,
  turn: 0,
  movespeed: 0,
  diagMove: false,
  movespeedRemaining: 30,
  mapName: "",
  private: false,
  saved: false,
  username: "",
  creator: "",
  editedBy: [],
  characters: [
    {
      name: "Elseth Maleficum",
      characterID: "c2d49bd1-fc19-4fca-9285-9db2608b5b38",
      movespeed: "30",
      initiative: 12,
      color: "Black",
      number: 0,
      position: { x: "1", y: "1" },
    },
  ],
  ghost: { x: "1", y: "1" },
  tileMap: [
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
  ],
};

export default function GameProvider(props) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  function HandleKey(e) {
    if (e.code === "Enter") {
      dispatch({
        type: Actions.END_TURN,
      });
      return;
    }

    dispatch({
      type: Actions.MOVE_CHARACTER,
      payload: e,
    });
  }

  useEffect(() => {
    window.addEventListener("keydown", HandleKey);
    return () => window.removeEventListener("keydown", HandleKey);
  }, [state.characters, state.editMode, state.movespeedRemaining]);

  function handleClick(e) {
    try {
      e.path.foreach((x) => {
        if (x.dataset.clickable) {
          if (x.dataset.action) {
            dispatch({
              type: x.dataset.action,
              payload: x,
            });
          }
        }
      });
    } catch {
      return;
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const value = { state, dispatch, Actions };

  return (
    <>
      <GameContext.Provider value={value}>
        {props.children}
      </GameContext.Provider>
    </>
  );
}
