import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NextPage from "./NextPage";
import QuizPage from "../quizpage/QuizPage";
import mockResponse from "../quizpage/fetchData";
import { UserName } from "../interfaces/Interfaces";

const data = mockResponse;
describe("Mainpage testing", () => {
  test("check if gradient change correctly and button change text", async () => {
    const state:  UserName = { name: 'Yulia', apiData:data};
    render(
      <MemoryRouter initialEntries={[{ state }]}>
        <QuizPage/>
        <NextPage
          singleAudio={"audio/1-3.mp3"}
          id={undefined}
          setGenreId={function (arg0: number): void {}}
          genreId={0}
          setCheckedState={function (arg0: boolean[]): void {}}
          movieGenre={data}
          score={5}
          setValue={function (arg0: number): void {}}
          setGradient={function (arg0: string[]): void {}}
          value={0}
          setClasses={function (arg0: boolean): void {}}
          setId={function (arg0: undefined): void {}}
          setImage={function (arg0: string): void {}}
          image={data[1].data[1].image}
        />
      </MemoryRouter>
    );
    const nextPage = screen.getAllByTestId("next-button");
    const gradient = await screen.findByTestId("back-gradient");

    (screen.getAllByTestId("input-field").map(el=>fireEvent.click(el)));
    expect(gradient).toHaveClass("progress-bar-correct");
    fireEvent.click(nextPage[0]);
    expect(gradient).toHaveClass("progress-bar-next");
    (screen.getAllByTestId("input-field").map(el=>fireEvent.click(el)));
    expect(gradient).toHaveClass("progress-bar-next-after");
    fireEvent.click(nextPage[0])
    expect(gradient).toHaveClass("progress-bar-last-prev");
    (screen.getAllByTestId("input-field").map(el=>fireEvent.click(el)));
    expect(gradient).toHaveClass("progress-bar-prevlast");
    expect(nextPage[0]).toHaveTextContent("Next Question")
    fireEvent.click(nextPage[0])
    expect(gradient).toHaveClass("progress-bar-last");
    (screen.getAllByTestId("input-field").map(el=>fireEvent.click(el)));
    expect(gradient).toHaveClass("progress-bar-full");
    expect(screen.getAllByTestId("button-content")[0]).toHaveTextContent("see my score")
  });

  test("check if finish page is started on Page 3", async () => {
    const state:  UserName = { name: 'Yulia', apiData:data};
    render(
      <MemoryRouter initialEntries={[{ state }]}>
        <QuizPage/>
        <NextPage
          singleAudio={"audio/1-3.mp3"}
          id={undefined}
          setGenreId={function (arg0: number): void {}}
          genreId={3}
          setCheckedState={function (arg0: boolean[]): void {}}
          movieGenre={data}
          score={5}
          setValue={function (arg0: number): void {}}
          setGradient={function (arg0: string[]): void {}}
          value={0}
          setClasses={function (arg0: boolean): void {}}
          setId={function (arg0: undefined): void {}}
          setImage={function (arg0: string): void {}}
          image={data[1].data[1].image}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getAllByTestId("button-content")[0])
    expect(screen.getByTestId("link-to-finish-page")).toBeInTheDocument()
  });
});
