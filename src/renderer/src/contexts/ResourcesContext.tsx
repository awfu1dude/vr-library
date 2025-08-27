import { IResourcesContext } from "@renderer/types/types";
import { createContext } from "react";

const ResourcesContext = createContext<IResourcesContext>({
    path: '',
});

export default ResourcesContext;