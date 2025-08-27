import { IGame } from "@renderer/types/types";
import GamesList from "../GamesList/GamesList";

interface IHomeViewProps {
    games: IGame[];
}

function HomeView({ games }: IHomeViewProps): React.JSX.Element {
    return (
        <>
            <main>
                <header>
                    <h1>Библиотека</h1>
                    <span>Игр: {games.length}</span>
                </header>
                <GamesList games={games} />
            </main>
        </>
    );
}

export default HomeView;