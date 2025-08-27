import ResourcesContext from "@renderer/contexts/ResourcesContext";
import { useContext } from "react";

function useResources() {
    const { path } =  useContext(ResourcesContext);
    return { path };
}

export default useResources;