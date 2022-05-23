import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AudioItem from "./AudioItem";
import mockResponse from "../quizpage/fetchData";
import { scoreSum,UserName} from "../interfaces/Interfaces";

const data = mockResponse;
describe("Mainpage testing", () => {
  test("check if input has styles accoring if false or true answer is clicked", async () => {
    const state: scoreSum = {
      name: "Yulia",
      movieGenre: data,
      sum: 5,
      genreId: 0,
    };
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
      </MemoryRouter>
    );
    const input = screen.getAllByTestId("input-field");
    const checkbox = screen.getAllByTestId("checkbox");
    const circleColor = screen.getAllByTestId("round-circle-style")
    expect(checkbox[0]).toBeChecked();
    expect(checkbox[1]).not.toBeChecked();
    expect(input[2]).toHaveClass("song-choose song-correct-accepted");
    expect(input[0]).toHaveClass("song-choose song-wrong");
    expect(input[1]).toHaveClass("song-choose");
    expect(circleColor[0]).toHaveClass("round round-wrong");
    expect(circleColor[2]).toHaveClass("round round-correct");
    expect(circleColor[1]).toHaveClass("round false")
  });
  test("check if input has no style when correct answer is clicked", async () => {
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
      </MemoryRouter>
    );
    const input = screen.getAllByTestId("input-field");
    expect(input[2]).toHaveClass("song-choose song-correct-accepted");
    fireEvent.click(input[1]);
    expect(input[1]).toHaveClass("song-choose false");
    expect(input[0]).toHaveClass("song-choose song-wrong");
  });

  test("check if background image is disappeared when input clicked", async () => {
    const state: scoreSum = {
      name: "Yulia",
      movieGenre: data,
      sum: 5,
      genreId: 0,
    };
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
      </MemoryRouter>
    );
    const backround = screen.queryByTestId("gradient-back");
    fireEvent.click(screen.getAllByTestId("input-field")[0]);
    expect(backround).toHaveClass("gradient-back-remove")
  });

});
