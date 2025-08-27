import ResourcesContext from "@renderer/contexts/ResourcesContext";
import { IResourcesContext } from "@renderer/types/types";
import { useEffect, useState } from "react";

interface IResourcesProviderProps {
    children: React.ReactNode;
}

const ResourcesProvider = ({ children }: IResourcesProviderProps): React.JSX.Element => {
    const [path, setPath] = useState<string>('');

    const getResourcesPath = async (): Promise<void> => {
        const data: string = await window.electron.ipcRenderer.invoke('get-resources-path');
        setPath(data);
    }

    useEffect(() => {
        getResourcesPath();
    }, []);

    const providerValue: IResourcesContext = {
        path: path,
    };

    return (
        <ResourcesContext.Provider value={providerValue}>
            {children}
        </ResourcesContext.Provider>
    );
}

export default ResourcesProvider;