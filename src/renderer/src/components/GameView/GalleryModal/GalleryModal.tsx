import useResources from "@renderer/hooks/useResources";
import { IGame } from "@renderer/types/types";
import { useState } from "react";

interface IGalleryModalProps {
    game: IGame;
    initIndex: number;
    closeGalleryModal: () => void;
}

function GalleryModal({ game, initIndex, closeGalleryModal }: IGalleryModalProps): React.JSX.Element {
    const { path: resourcesPath } = useResources();
    const [imageIndex, setImageIndex] = useState<number>(initIndex);
    const image: string = game.gallery[imageIndex];

    const handleGoToImage = (index: number): void => {
        setImageIndex(index);
    }

    const handleGoPrevImage = (): void => {
        if (imageIndex === 0) {
            setImageIndex(game.gallery.length - 1);
            return;
        }
        setImageIndex(imageIndex - 1);
    }

    const handleGoNextImage = (): void => {
        if (imageIndex == game.gallery.length - 1) {
            setImageIndex(0);
            return;
        }
        setImageIndex(imageIndex + 1);
    }

    return (
        <>
            <div className="gallery-modal">
                <img className="image-blur" src={`${resourcesPath}/games/${game.folder_name}/${image}`} alt="image-blur" />
                <div className="gallery-view">
                    <div className="gallery-image">
                        <img src={`${resourcesPath}/games/${game.folder_name}/${image}`} alt="image" />
                    </div>
                    <p>{game.title}</p>
                </div>
                <div className="controls">
                    <div className="btn prev" onClick={handleGoPrevImage}>
                        <div className="icon"></div>
                    </div>
                    <div className="dots">
                        {
                            game.gallery.map((_, index) => (
                                <div
                                    key={index}
                                    className={`dot${imageIndex === index ? ' current' : ''}`}
                                    onClick={() => handleGoToImage(index)}></div>
                            ))
                        }
                    </div>
                    <div className="btn next" onClick={handleGoNextImage}>
                        <div className="icon"></div>
                    </div>
                </div>
                <div className="btn hide" onClick={closeGalleryModal}>
                    <div className="icon"></div>
                </div>
            </div>
        </>
    );
}

export default GalleryModal;