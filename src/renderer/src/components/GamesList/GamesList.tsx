import { IGame } from "@renderer/types/types";
import "./GamesList.css";
import { Link } from "react-router";
import useResources from "@renderer/hooks/useResources";

interface IGamesListProps {
    games: IGame[];
}

function GamesList({ games }: IGamesListProps): React.JSX.Element {
    const { path: resourcesPath } = useResources();
    return (
        <>
            <div className="games-list">
                {
                    games.map((game, index) => (
                        <Link to={`./game/${index}`} key={game.id}>
                            <div className="game-item">
                                <div className="age">{game.tags[0]}</div>
                                <div className="poster">
                                    <img src={`${resourcesPath}/games/${game.folder_name}/header.jpg`} alt="poster" />
                                </div>
                                <h3>{game.title}</h3>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    );
}

export default GamesList;