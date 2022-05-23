import { fireEvent, render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { scoreSum } from "../interfaces/Interfaces";
import mockResponse from "./fetchData"
import FinishPage from "./FinishPage";
import QuizPage from "./QuizPage";

const data = mockResponse
describe("Mainpage testing", () => {
  test("button try again should redirect to main page", async() => {
    const state:  scoreSum = { name: 'Yulia', movieGenre:data, sum:5, genreId:0};
    render(
      <MemoryRouter initialEntries={[{ state }]}>
        <QuizPage/>
        <FinishPage/>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId("go-tomain-page"))
    const mainPage = await screen.findByTestId("mainpage");
    expect(mainPage).toBeInTheDocument()
  });
  test("according to score sum should render certain list", async() => {
    const state:  scoreSum = { name: 'Yulia', movieGenre:data, sum:5, genreId:0};
    render(
      <MemoryRouter initialEntries={[{ state }]}>
        <QuizPage/>
        <FinishPage/>
      </MemoryRouter>
    );
    const score = screen.getByTestId("title-sum");
    expect(score).toHaveTextContent(`${state.name}, you can do better, try again!`)
  });
});
