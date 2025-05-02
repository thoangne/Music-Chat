export interface Song{
    _id: string;
    title: string;
    artist: string;
    albumId: string | null;
    imageUrl: string;
    audioUrl: string;
    duration: string;
    createAt: Date;
    updateAt: Date;
    
}

export interface Album{
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: number;
    songs: number;
    createAt: Date;
    updateAt: Date;
    
}