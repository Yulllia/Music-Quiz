export interface UserName {
  name: string;
  apiData: Array<apiData>;
}
export interface scoreSum {
  sum: number;
  name:string;
  genreId:number;
  movieGenre:apiData[];
}
export interface apiData {
  id: string;
  genre: string;
  data: Array<description>;
}
export interface description{
  id: string;
  name: string;
  songTitle: string;
  image: string;
  audio: string;
  description: string;
}
export default UserName