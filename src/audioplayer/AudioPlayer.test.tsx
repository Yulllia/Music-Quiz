import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import mockResponse from "../quizpage/fetchData";
import AudioItem from "../audioblock/AudioItem"
import UserName from "../interfaces/Interfaces"

describe("Mainpage testing", () => {
  test("backround image when choose correct answer should change", async () => {
    const data = mockResponse;
    const state:  UserName = { name: 'Yulia', apiData:data};
    render(
      <MemoryRouter initialEntries={[{ state }]}>
        <AudioItem
          audio={"audio"}
          singleAudio={"audio/1-3.mp3"}
          id={undefined}
          setTitleColor={function (arg0: number[]): void {}}
          titleColor={[]}
          gradient={[]}
          setGradient={function (arg0: string[]): void {}}
          classes={false}
          setClasses={function (arg0: boolean): void {}}
          setValue={function (arg0: number): void {}}
          value={0}
          score={0}
          setScore={function (arg0: number): void {}}
          setCheckedState={function (arg0: boolean[]): void {}}
          movieGenre={[]}
          checkedState={[true, false, true, false]}
          genreId={0}
          setId={function (arg0: number): void {}}
        />
        <AudioPlayer
          singleAudio={"audio/1-3.mp3"}
          id={undefined}
          genreId={0}
          audio={`https://levi9-song-quiz.herokuapp.com/api/audio/1-3.mp3`}
          checkedState={[true, false, true, false]}
          image={`images/1-3.jpg`}
        />
      </MemoryRouter>
    );
    const input = screen.getAllByTestId("input-field");
    const backImage = screen.getByTestId("photo-image");
    fireEvent.click(input[3]);
    expect(backImage).toHaveStyle(`backgroundImage:url(https://levi9-song-quiz.herokuapp.com/api/images/1-3.jpg)`)
    expect(backImage.style).toBeTruthy()
  });
});
