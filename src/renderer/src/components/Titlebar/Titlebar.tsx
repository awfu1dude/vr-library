import { useLocation, useNavigate } from "react-router";
import "./Titlebar.css";

function Titlebar(): React.JSX.Element {
	const location = useLocation();
	const navigate = useNavigate();

	const handleMinimize = (): void => window.electron.ipcRenderer.send('window-minimize');
	const handleMaximize = (): void => window.electron.ipcRenderer.send('window-maximize');
	const handleClose = (): void => window.electron.ipcRenderer.send('window-close');
	return (
		<>
			<div className="titlebar">
				<div className="title">
					{location.pathname !== '/' ? (
						<div onClick={() => navigate(-1)} className="btn back">
							<div className="icon"></div>
						</div>
					) : null}
					<p>VR Library</p>
				</div>
				<div className="actions">
					<div className="btn minimize" onClick={handleMinimize}>
						<div className="icon"></div>
					</div>
					<div className="btn maximize" onClick={handleMaximize}>
						<div className="icon"></div>
					</div>
					<div className="btn close" onClick={handleClose}>
						<div className="icon"></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Titlebar;
