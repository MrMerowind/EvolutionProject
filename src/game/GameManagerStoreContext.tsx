import React from 'react'
import { createContext, MutableRefObject, useContext, useRef } from "react";
import { GameManagerStore, IGameManagerStore } from "./GameManagerStore";

const GameManagerStoreContext = createContext<GameManagerStore>(
    new GameManagerStore()
  //null as unknown as GameManagerStore
  );

export const useGameManagerStore = () => useContext(GameManagerStoreContext);

type GameManagerStoreProviderProps = {
  children: React.ReactNode;
  gameData: GameManagerStore;
};

export function GameManagerStoreProvider(props: GameManagerStoreProviderProps) {
  
  const store: MutableRefObject<IGameManagerStore> = useRef(new GameManagerStore(props.gameData));

  return (
    <GameManagerStoreContext.Provider value={store.current}>
      {props.children}
    </GameManagerStoreContext.Provider>
  );
}