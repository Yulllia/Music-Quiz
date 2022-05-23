import { useState } from "react";
import { useLocation } from "react-router-dom";
import { apiData, UserName, scoreSum} from "../interfaces/Interfaces";
import "./AudioStyle.css";

function GenrePage(props: { id: number | undefined,setTitleColor: (arg0: number[]) => void, titleColor: number[],
 gradient: string[], setGradient: (arg0: string[]) => void, classes: boolean, setClasses: (arg0: boolean) => void, setValue: (arg0: number) => void,value:number, score:number, setScore: (arg0: number) => void, audio: string, setCheckedState: (arg0: boolean[]) => void, movieGenre: apiData[], checkedState:boolean[], singleAudio: string, genreId:number, setId: (arg0: number) => void }) {
  const location = useLocation().state as UserName;
  const scoreName = useLocation().state as scoreSum
  let apiData;
  let movieGenre = location.apiData;
 if(!movieGenre){
   apiData = scoreName.movieGenre
   movieGenre = apiData
  }
  const [untouched, setUntouched] = useState<boolean[]>(new Array(movieGenre.length).fill(true));

  const handleChange = (position: number, isCorrect: boolean): void => {
    const updatedCheckedState = props.checkedState.map((item, index) =>
      index === position ? !item : item
    );
    props.setCheckedState(updatedCheckedState);
    props.setId(position);
    props.setClasses(false);
    if(isCorrect){
      setUntouched(updatedCheckedState);
      let array = props.titleColor;
      props.setTitleColor([...array, props.genreId])    
      
      if(props.genreId===0){
        props.setGradient([("progress-bar-correct progress-bar-correct::before")]);
      }else if(props.genreId===1){
        props.setGradient([("progress-bar-next-after progress-bar-next-after::before")])
      }else if(props.genreId===2){
        props.setGradient([("progress-bar-prevlast progress-bar-prevlast::before")])
      } else if(props.genreId===3){
        props.setGradient([("progress-bar-full progress-bar-full::before")])
      }
  };
  if(!isCorrect){
    props.setValue(props.value-1);
  } 
  }
  function onChange(position:number){
    props.setId(position);
    props.setClasses(false);
  }
  return (
    <div className="video-textpage">
      <div className="text-quiz">
        {movieGenre[props.genreId].data.map((item, index) => {
            return (
              <div className="audio-item" key={index}>
                <button
                  key={index}
                  data-testid="input-field"
                  disabled={props.checkedState[index]}
                  className={`song-choose ${
                    (item.audio === props.singleAudio &&
                      props.checkedState[index] && untouched[index] && 
                      "song-correct-accepted") ||
                    (item.audio !== props.singleAudio &&
                      props.checkedState[index] && untouched[index] &&
                      "song-wrong")
                  }`}
                  onClick={() => { handleChange(index, item.audio === props.singleAudio )}}
                >
                  <div
                    data-testid="round-circle-style"
                    className={`round ${
                      (item.audio === props.singleAudio &&
                        props.checkedState[index] && untouched[index] &&
                        "round-correct") ||
                      (item.audio !== props.singleAudio &&
                        props.checkedState[index] && untouched[index] &&
                        "round-wrong")
                    }`}
                  >
                    <input
                      type="checkbox"
                      data-testid="checkbox"
                      id="checkbox"
                      onChange={()=>onChange(index)}
                      checked={props.checkedState[index] && untouched[index]}
                    />
                    <label htmlFor="checkbox"></label>
                  </div>
                  <p className="song-title">
                    {`0${index + 1}:`} {item.name}
                    {` – `}
                    {item.songTitle}
                  </p>
                </button>
              </div>
            );
          })}
      </div>
      <div data-testid="gradient-back" className={`${ props.classes ? "gradient-back" : 'gradient-back-remove'}`}></div>
      </div>
  );
}

export default GenrePage;


