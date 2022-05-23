import "./QuizPage.css";
import Logo from "../assets/Logo.png";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AudioPlayer from "../audioplayer/AudioPlayer";
import AudioItem from "../audioblock/AudioItem";
import { scoreSum, UserName } from "../interfaces/Interfaces";
import NextPage from "../audioblock/NextPage";
import VideoImage from "../videoimage/VideoImage";
import Spinner from "../Spinner";

function QuizPage() {
  const location = useLocation().state as UserName;
  const scoreName = useLocation().state as scoreSum;
  let apiData;
  let movieGenre = location.apiData;
  if (!movieGenre) {
    apiData = scoreName.movieGenre;
    movieGenre = apiData;
  }
  const [audio, setAudio] = useState<string>("");
  const [id, setId] = useState<number | undefined>();
  const [singleAudio, setSingleAudio] = useState<string>("");
  const [genreId, setGenreId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [classes, setClasses] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [value, setValue] = useState<number>(3);
  const [name, setName] = useState<string>("");

  const [gradient, setGradient] = useState<string[]>(["progress-bar"]);
  const [titleColor, setTitleColor] = useState<number[]>([]);

  const [checkedState, setCheckedState] = useState<Array<boolean>>(
    new Array(movieGenre.length).fill(false)
  );
  const [image, setImage] = useState<string | undefined>();
  useEffect(() => {
    function getRandomInt(max: number) {
      return Math.floor(Math.random() * movieGenre.length);
    }
    //fetch genre
    const fetcAudio = async () => {
      loading && <Spinner />;
      const audioSingle =
        movieGenre[genreId].data[getRandomInt(movieGenre.length)].audio;
      setAudio(`https://levi9-song-quiz.herokuapp.com/api/${audioSingle}`);
      setSingleAudio(audioSingle);
      setName(movieGenre[genreId].genre);
      setLoading(false);
    };
    fetcAudio();
  }, [genreId, loading, movieGenre]);

  return (
    <div className="quiz-layot" data-testid="mainpage">
      <header>
        <div className="quiz-title">
          <img className="logo-name" src={Logo} alt="Logo" />
          <div className="score-title">
            <p className="user-name" data-testid="main-name">
              {location.name}
            </p>
            <p className="score-quantity">Your Score: {value - 3}</p>
          </div>
        </div>
      </header>
      <main>
        <div className="quiz-main">
          <div className="progress-width progress-title">
            <div
              data-testid="back-gradient"
              className={`${gradient.join("")}`}
            ></div>
          </div>
          <div className="quiz-block">
            {movieGenre &&
              movieGenre.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="quiz-block genre-title">
                      <p
                        data-testid="name-opacity"
                        style={{
                          opacity: `${index === genreId ? "1" : "0.7"}`,
                        }}
                        className={`${
                          titleColor.some((e) => e === index)
                            ? "title-completed"
                            : ""
                        }`}
                      >
                        {item.genre}
                      </p>
                    </div>
                    <div className="arrow-title" data-testid="arrow-style">
                      <svg      
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="14"
                        data-icon="arrow"
                        viewBox="0 0 21 14"
                        fill="white"
                      >
                        <path
                          opacity={index === genreId ? "1" : "0.7"}
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.7239 1.09112C12.2786 0.764522 11.6528 0.860799 11.3262 1.30616C10.9996 1.75153 11.0958 2.37733 11.5412 2.70393L16.0358 5.99996H1C0.447715 5.99996 0 6.44767 0 6.99996C0 7.55224 0.447715 7.99996 1 7.99996H16.0358L11.5412 11.296C11.0958 11.6226 10.9996 12.2484 11.3262 12.6937C11.6528 13.1391 12.2786 13.2354 12.7239 12.9088L19.6716 7.81381C19.678 7.80923 19.6843 7.80458 19.6906 7.79986L20.7814 6.99995L19.6902 6.19969C19.6842 6.19521 19.6782 6.1908 19.6721 6.18645L12.7239 1.09112Z"
                          fill={
                            titleColor.some((e) => e === index) ? "#dca1f8" : ""
                          }
                        />
                      </svg>
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
          <div className="border"></div>
          <div className="genre-info">
            <div className="text-quiz">
              <h2 className="genre-type">{name}</h2>
              <p className="genre-description">
                Listen to the audio and guess what song is it from the list
              </p>
              <AudioPlayer
                id={undefined}
                genreId={genreId}
                audio={audio}
                checkedState={checkedState}
                singleAudio={singleAudio}
                image={image}
              />
              <AudioItem
                setId={setId}
                audio={audio}
                singleAudio={singleAudio}
                genreId={genreId}
                setCheckedState={setCheckedState}
                checkedState={checkedState}
                movieGenre={movieGenre}
                id={id}
                setScore={setScore}
                score={score}
                setValue={setValue}
                value={value}
                setClasses={setClasses}
                classes={classes}
                setGradient={setGradient}
                gradient={gradient}
                setTitleColor={setTitleColor}
                titleColor={titleColor}
              />
            </div>
            {id !== undefined && (
              <div className="video-image" data-testid="detail-page">
                <div className="video-item">
                  <VideoImage id={id} genreId={genreId} />
                  <AudioPlayer
                    checkedState={checkedState}
                    genreId={genreId}
                    singleAudio={singleAudio}
                    id={id}
                    image={image}
                    audio={`https://levi9-song-quiz.herokuapp.com/api/${movieGenre[genreId].data[id].audio}`}
                  />
                  <div className="description">
                    {movieGenre[genreId].data[id].description}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <NextPage
          setId={setId}
          singleAudio={singleAudio}
          id={id}
          setGenreId={setGenreId}
          genreId={genreId}
          setCheckedState={setCheckedState}
          movieGenre={movieGenre}
          score={score}
          setValue={setValue}
          value={value}
          setClasses={setClasses}
          setGradient={setGradient}
          setImage={setImage}
          image={image}
        />
      </main>
    </div>
  );
}

export default QuizPage;
