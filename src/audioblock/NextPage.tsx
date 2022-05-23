import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { UserName } from "../interfaces/Interfaces";
import { useRef } from "react";
import { apiData, scoreSum } from "../interfaces/Interfaces";
import Spinner from "../Spinner";

function NextPage(props: {
  singleAudio: string;
  id: number | undefined;
  setGenreId: (arg0: number) => void;
  genreId: number;
  setCheckedState: (arg0: boolean[]) => void;
  movieGenre: apiData[];
  score: number;
  setValue: (arg0: number) => void;
  setGradient: (arg0: string[]) => void;
  value: number;
  setClasses: (arg0: boolean) => void;
  setId: (arg0: undefined) => void;
  setImage: (arg0: string) => void;
  image: string | undefined;
}) {
  const location = useLocation().state as UserName;
  let movieGenre = location.apiData;
  const scoreName = useLocation().state as scoreSum;
  let apiData;
  if (!movieGenre) {
    apiData = scoreName.movieGenre;
    movieGenre = apiData;
  }
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonText, setButtonText] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const results = props.singleAudio;

  const locationName = useLocation().state as UserName;

  useEffect(() => {
    setButtonText("Next Question");
    // eslint-disable-next-line array-callback-return
    movieGenre[props.genreId].data.map((item, index) => {
      const result = item.audio.split(" ");
      const element = result.filter((el) => el === results);
      const correctAnswer = element.indexOf(results);
      if (correctAnswer === 0 && props.id === index) {
        props.setImage(item.image);
        buttonRef.current!.disabled = false;
      }
    });
    if (buttonRef.current!.disabled === false) {
      setDisable(false);
    }
    if (props.genreId === 3) {
      setButtonText("see my score");
    }
  }, [movieGenre, props, props.genreId, props.id, results]);

  function onChange() {
    setLoading(true)
    if(loading){
      <Spinner/>
    }
    if (!buttonRef.current!.disabled) {
      props.setGenreId(props.genreId + 1);
      props.setImage("");
    }
    props.setValue(props.value + 3);
    const result = new Array(props.movieGenre.length).fill(false);

    props.genreId === 0 &&
      props.setGradient(["progress-bar-next progress-bar-next::before"]);
    props.genreId === 2 &&
      props.setGradient(["progress-bar-last progress-bar-last::before"])
    props.genreId === 1 &&
      props.setGradient([
        "progress-bar-last-prev progress-bar-last-prev::before",
      ]);
    props.setCheckedState(result);
    props.setId(undefined);
    props.setClasses(true);
    setDisable(true);
    setLoading(false)
  }
  const scoreSum = {
    sum: props.value,
    name: locationName.name,
    genreId: props.genreId,
    movieGenre: props.movieGenre,
  };
  return (
    <>
      {props.genreId === 3 ? (
        <Link className="link" to={`/finish-quiz`} state={scoreSum} data-testid="link-to-finish-page">
          <div>
            <button
              className="button button-next"
              disabled={disable}
              ref={buttonRef}
              onClick={onChange}
            >
              <span className="button-text" data-testid="button-content">{buttonText}</span>
              <div className="arrow"></div>
            </button>
          </div>
        </Link>
      ) : (
        <div>
          <button
            className="button button-next"
            disabled={disable}
            data-testid="next-button"
            ref={buttonRef}
            onClick={onChange}
          >
            <span className="button-text" data-testid="button-content">{buttonText}</span>
            <div className="arrow"></div>
          </button>
        </div>
      )}
    </>
  );
}

export default NextPage;
