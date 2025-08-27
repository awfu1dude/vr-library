import { IGame } from "@renderer/types/types";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import "./GameEditView.css";

interface IGameEditViewProps {
    games: IGame[];
    updateGamesList: (data: IGame[]) => void;
}

function GameEditView({ games, updateGamesList }: IGameEditViewProps): React.JSX.Element {
    // const { path: resourcesPath } = useResources();
    const navigate = useNavigate();
    const { index: initIndex } = useParams();
    const game: IGame = games[Number(initIndex)];
    const [gameData, setGameData] = useState({
        title: game.title,
        description: game.description,
        tags: game.tags.join(';'),
        folder_name: game.folder_name,
        launch_url: game.launch_url,
        gameplay: game.gameplay,
        gallery: game.gallery.join(';'),
    });

    const handleSaveEdit = (): void => {
        const gamesList = games;
        gamesList[Number(initIndex)] = {
            ...game,
            title: gameData.title,
            description: gameData.description,
            tags: gameData.tags.split(';'),
            folder_name: gameData.folder_name,
            launch_url: gameData.launch_url,
            gallery: gameData.gallery.split(';')
        };
        updateGamesList(gamesList);
        console.log('Successfully.');
        navigate(-1);
    }

    const handleCancelEdit = (): void => {
        navigate(-1);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setGameData({ ...gameData, [e.currentTarget.name]: e.currentTarget.value });
    }

    return (
        <>
            <div className="game-edit">
                <h1>Редактирование</h1>
                {/* <p>{resourcesPath}</p> */}
                <div className="game-edit-form">
                    <div className="game-edit-form-field">
                        <p>Название</p>
                        <input value={gameData.title} name="title" onChange={handleInputChange} placeholder="Название..." type="text" />
                    </div>
                    <div className="game-edit-form-field">
                        <p>Описание</p>
                        <input value={gameData.description} name="description" onChange={handleInputChange} placeholder="Описание..." type="text" />
                    </div>
                    <div className="game-edit-form-field">
                        <p>Теги</p>
                        <input value={gameData.tags} name="tags" onChange={handleInputChange} placeholder="Теги..." type="text" />
                    </div>
                    <div className="game-edit-form-field">
                        <p>Название папки</p>
                        <input value={gameData.folder_name} name="folder_name" onChange={handleInputChange} placeholder="Название папки..." type="text" />
                    </div>
                    <div className="game-edit-form-field">
                        <p>Изображения</p>
                        <input value={gameData.gallery} name="gallery" onChange={handleInputChange} placeholder="Изображения..." type="text" />
                    </div>
                    <div className="game-edit-form-field">
                        <p>Путь до исполняемого файла</p>
                        <input value={gameData.launch_url} name="launch_url" onChange={handleInputChange} placeholder="Путь до исполняемого файла..." type="text" />                    </div>
                    <div className="btns">
                        <div className="btn save" onClick={handleSaveEdit}>Сохранить</div>
                        <div className="btn cancel" onClick={handleCancelEdit}>Отмена</div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default GameEditView;