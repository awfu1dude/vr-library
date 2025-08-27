export interface IGame {
    id: number;
    title: string;
    description: string;
    tags: string[];
    launch_url: string;
    folder_name: string;
    gameplay: string;
    gallery: string[];
}

export interface IResourcesContext {
    path: string;
}