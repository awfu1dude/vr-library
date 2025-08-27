import { useEffect, useState } from "react";
import Titlebar from "./components/Titlebar/Titlebar";
import { IGame } from "./types/types";
import { HashRouter, Route, Routes } from "react-router";
import HomeView from "./components/HomeView/HomeView";
import GameView from "./components/GameView/GameView";
import GameEditView from "./components/GameEditView/GameEditView";
import GameAddView from "./components/GameAddView/GameAddView";

function App(): React.JSX.Element {
  const [games, setGames] = useState<IGame[]>([]);
  const readData = async () => await window.electron.ipcRenderer.invoke('read-data');

  const getGamesList = async (): Promise<void> => {
    const data: IGame[] = await readData();
    setGames(data);
  }

  const updateGamesList = async (data: IGame[]): Promise<void> => {
    setGames(data);
    await window.electron.ipcRenderer.invoke('write-data', data);
  }

  useEffect(() => {
    getGamesList();
  }, []);

  return (
    <>
      <HashRouter>
        <Titlebar />
        <Routes>
          <Route
            path="/"
            element={<HomeView games={games} />}
          />
          <Route
            path="/game/:index"
            element={<GameView games={games} />}
          />
          <Route
            path="/game/:index/edit"
            element={<GameEditView games={games} updateGamesList={updateGamesList} />}
          />
          <Route
            path="/game/add"
            element={<GameAddView games={games} updateGamesList={updateGamesList} />}
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
