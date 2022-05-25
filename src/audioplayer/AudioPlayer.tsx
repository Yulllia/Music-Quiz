import { useState, useEffect, useRef, ChangeEvent } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import "./AudioPlayer.css";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

function AudioPlayer(props: {
  audio: string;
  id: number | undefined;
  genreId: number;
  checkedState: boolean[];
  singleAudio: string;
  image: string | undefined;
}) {
  const [percentege, setPercentege] = useState<number>(0);
  const [time, setCurrentTime] = useState<string>("00:00");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>();
  let imageBack;
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const currentDuration = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState<number>(0);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);
  const [marginLeft, setMarginLeft] = useState<number>(0);
  const thumbClick = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentDuration.current) return;
    const rangeWidth = currentDuration.current!.getBoundingClientRect().width;
    const thumbWidth = thumbClick.current!.getBoundingClientRect().width;
    const centerThumb = (thumbWidth / 100) * percentege * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentege -
      (thumbWidth / 100) * percentege;
    setPosition(percentege);
    setMarginLeft(centerThumb);
    setProgressBarWidth(centerProgressBar);
  }, [percentege, props.checkedState]);

  function togglePlayPause() {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioPlayer.current?.play();
    } else {
      audioPlayer.current?.pause();
    }
  }
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} placement="top" classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#373B62;",
      color: "white",
      maxWidth: 100,
      fontSize: "12px",
      borderRadius: "5px",
      left: `${position}%`,
      marginLeft: `${marginLeft}px`,
    },
  }));

  const getCurrDuration = (e: {
    currentTarget: { currentTime: number; duration: number };
  }) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;
    setPercentege(+percent);
    setCurrentTime(time.toFixed(2));
  };
  const calculateTime = (sec: number) => {
    if (!sec) {
      return `00 : 00`;
    }
    const minutes = Math.floor(sec / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes} : ${returnedSeconds}`;
  };
  if (props.image && props.id === undefined) {
    imageBack = {
      backgroundImage: `url(https://levi9-song-quiz.herokuapp.com/api/${props.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    const audio = audioPlayer.current;
    audio!.currentTime = (audio!.duration / 100) * Number(e.target.value);
    setPercentege(Number(e.target.value));
  }
  return (
    <>
      <div
        className={`player-lister ${
          props.id === undefined ? "player-lister" : "player-image"
        }`}
      >
        {props.audio && (
          <audio
            onLoadedData={(e: ChangeEvent<HTMLAudioElement>) => {
              setDuration(Number(e.currentTarget.duration.toFixed(2)));
            }}
            onTimeUpdate={getCurrDuration}
            ref={audioPlayer}
            src={props.audio}
            preload="metadata"
          />
        )}
        <div
          style={imageBack}
          data-testid="photo-image"
          className={`${
            props.id === undefined ? (
              "back-gradient"
            ) : (
              <button
                onClick={togglePlayPause}
                className={`arrow-player-default`}
              >
                {isPlaying ? <FaPlay /> : <FaPause />}
              </button>
            )
          }`}
        >
          <button
            onClick={togglePlayPause}
            className={`arrow-player-default ${
              props.id === undefined ? "arrow-player-default" : "arrow-image"
            }`}
          >
            {isPlaying ? <FaPlay /> : <FaPause />}
          </button>
        </div>
        <div className="slider-container" onChange={onChange}>
          <div
            className={`range-input ${
              props.id === undefined ? "range-input" : "input-image"
            }`}
          >
            <div
              className="progress-bar-cover"
              data-testid="progress-width"
              style={{
                width: `${progressBarWidth}px`,
              }}
            ></div>
            <HtmlTooltip title={time && !isNaN(+time) && calculateTime(+time)}>
              <div
                ref={thumbClick}
                className="thumb"
                style={{
                  left: `${position}%`,
                  marginLeft: `${marginLeft}px`,
                }}
              ></div>
            </HtmlTooltip>
            <input
              type="range"
              step="0.01"
              className="range"
              ref={currentDuration}
            />
            <div className="time-block">
              <div className="duration-time">
                {time && !isNaN(+time) && calculateTime(+time)}
              </div>
              <div className="duration-time">
                {duration && !isNaN(duration) && calculateTime(duration)}
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default AudioPlayer;
