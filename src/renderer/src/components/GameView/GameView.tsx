import { IGame } from "@renderer/types/types";
import { Link, useParams } from "react-router";
import "./GameView.css";
import { useState } from "react";
import GalleryModal from "./GalleryModal/GalleryModal";
import useResources from "@renderer/hooks/useResources";

interface IGameViewProps {
    games: IGame[];
}

function GameView({ games }: IGameViewProps): React.JSX.Element {
    const { path: resourcesPath } = useResources();
    const { index: initIndex } = useParams();
    const [gameIndex, setGameIndex] = useState<number>(Number(initIndex));
    const [galleryIndex, setGalleryIndex] = useState<number>(0);
    const [galleryModal, setGalleryModal] = useState<boolean>(false);
    const game: IGame = games[Number(gameIndex)];

    const handlePlay = async (path: string, args: string[]): Promise<void> => {
        console.log(`Launching ${game.title}...`);
        await window.electron.ipcRenderer.invoke('exec-file', path, args);
    }

    const handleGoToGame = (index: number): void => {
        setGameIndex(index);
    }

    const handleGoPrevGame = (): void => {
        if (gameIndex === 0) {
            setGameIndex(games.length - 1);
            return;
        }
        setGameIndex(gameIndex - 1);
    }

    const handleGoNextGame = (): void => {
        if (gameIndex === games.length - 1) {
            setGameIndex(0);
            return;
        }
        setGameIndex(gameIndex + 1);
    }

    const showGalleryModal = (index: number): void => {
        setGalleryIndex(index);
        setGalleryModal(true);
    }

    const closeGalleryModal = (): void => {
        setGalleryModal(false);
    }

    return game && (
        <>
            {!galleryModal && (
                <>
                    <video className="gameplay" autoPlay loop muted src={`${resourcesPath}/games/${game.folder_name}/video.webm`}></video>
                    <main className="content">
                        <img className="bg-blur" src={`${resourcesPath}/games/${game.folder_name}/header.jpg`} alt="poster" />
                        <div className="game">
                            <div className="poster">
                                <img src={`${resourcesPath}/games/${game.folder_name}/header.jpg`} alt="poster" />
                            </div>
                            <h1>{game.title}</h1>
                            <div className="btns">
                                <div className="btn play" onClick={() => handlePlay(game.launch_url, [])}>
                                    <div className="icon"></div>
                                    Играть
                                </div>
                                <Link to={`/game/${gameIndex}/edit`} className="btn more">
                                    <div className="icon"></div>
                                </Link>
                            </div>
                            <div className="tags">
                                {game.tags.map((tag, index) => (
                                    <div className="tag-item" key={index}>{tag}</div>
                                ))}
                            </div>
                            <p>{game.description}</p>
                        </div>
                        <div className="gallery">
                            <h2>Скриншоты</h2>
                            <div className="gallery-view">
                                {game.gallery.map((image, index) => (
                                    <div className="gallery-item" key={index} onClick={() => showGalleryModal(index)}>
                                        <img src={`${resourcesPath}/games/${game.folder_name}/${image}`} alt={`gallery-${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                    <div className="pagination">
                        <div className="btn prev" onClick={handleGoPrevGame}>
                            <div className="icon"></div>
                        </div>
                        <div className="dots">
                            {
                                games.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`dot${Number(gameIndex) === index ? ' current' : ''}`}
                                        onClick={() => handleGoToGame(index)}></div>
                                ))
                            }
                        </div>
                        <div className="btn next" onClick={handleGoNextGame}>
                            <div className="icon"></div>
                        </div>
                    </div>
                </>
            )}
            {galleryModal && <GalleryModal game={game} initIndex={galleryIndex} closeGalleryModal={closeGalleryModal} />}
        </>
    );
}

export default GameView;