
import { useLocation } from "react-router-dom";
import { UserName,scoreSum} from "../interfaces/Interfaces";
import "./VideoImage.css";

function VideoImage(props: { id: number | undefined, genreId:number }) {
  const location = useLocation().state as UserName;
  let movieGenre = location.apiData;
  const scoreName = useLocation().state as scoreSum
  let apiData;
 if(!movieGenre){
   apiData = scoreName.movieGenre
   movieGenre = apiData
  }
  return (
    <>
        {" "}
        {props.id !== undefined && (
          <>
            <p className="title-name">
              {`0${props.id + 1}:`} {movieGenre[props.genreId].data[props.id].name}
              {` – `}
              {movieGenre[props.genreId].data[props.id].songTitle}
            </p>
            <img
              className="image-width"
              src={`https://levi9-song-quiz.herokuapp.com/api/${
                movieGenre[props.genreId].data[props.id].image
              }`}
              alt="videoImage"
            />
          </>
        )}
      <>
      </>
    </>
  );
}

export default VideoImage;
