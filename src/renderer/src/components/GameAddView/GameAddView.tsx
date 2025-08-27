import { IGame } from "@renderer/types/types";
import { useNavigate } from "react-router";
import "./GameAddView.css";
import { useState } from "react";

interface IGameAddViewProps {
    games: IGame[];
    updateGamesList: (data: IGame[]) => void;
}

function GameAddView({ games, updateGamesList }: IGameAddViewProps): React.JSX.Element {
    // const { path: resourcesPath } = useResources();
    const navigate = useNavigate();
    const [gameData, setGameData] = useState({
        title: '',
        description: '',
        tags: '',
        folder_name: '',
        launch_url: '',
        gameplay: 'video.webm',
        gallery: '',
    });

    const handleSaveEdit = (): void => {
        const gamesList = games;
        gamesList.push({
            ...gameData,
            id: games[games.length - 1].id + 1,
            tags: gameData.tags.split(';'),
            gallery: gameData.gallery.split(';')
        });
        updateGamesList(gamesList);
        console.log('Added Successfully.');
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
                <h1>Добавление</h1>
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
                        <input value={gameData.launch_url} name="launch_url" onChange={handleInputChange} placeholder="Путь до исполняемого файла..." type="text" />
                    </div>
                    <div className="btns">
                        <div className="btn save" onClick={handleSaveEdit}>Добавить</div>
                        <div className="btn cancel" onClick={handleCancelEdit}>Отмена</div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default GameAddView;