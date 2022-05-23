import { fireEvent, render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import QuizPage from "./QuizPage";
import UserName from "../interfaces/Interfaces";
import { scoreSum } from "../interfaces/Interfaces";
import mockResponse from "./fetchData"

const data = mockResponse
describe("Mainpage testing", () => {
    test("check if button is disabled", async() => {
      const state:  UserName = { name: 'Yulia', apiData:data};
      render(
        <MemoryRouter initialEntries={[{ state }]}>
          <QuizPage/>
        </MemoryRouter>
      );
      const gradient = await screen.findByTestId("back-gradient");
      expect(gradient).toHaveClass("progress-bar");
      const nextPage = screen.getByTestId("next-button");
      expect(nextPage).toBeDisabled();
    });
    test("initial state detail page should not be visible", async() => {
      const state:  scoreSum = { name: 'Yulia', movieGenre:data, sum:5, genreId:0};
      render(
        <MemoryRouter initialEntries={[{ state }]}>
          <QuizPage/>
        </MemoryRouter>
      );
      const detailPage = screen.queryByTestId("detail-page");
      expect(detailPage).toBeNull();
      const input = screen.getAllByTestId("input-field");
      expect(input.length).toBe(4);
      fireEvent.click(input[0])
      expect(screen.getByTestId("detail-page")).toBeVisible();
    });

    test("name should equal with name on start page", async() => {
      const state:  scoreSum = { name: 'Yulia', movieGenre:data, sum:5, genreId:0};
      render(
        <MemoryRouter initialEntries={[{ state }]}>
          <QuizPage/>
        </MemoryRouter>
      );
      const name = screen.getByTestId("main-name");
      expect(name).toBeInTheDocument()
    });
  test("title on the header should have opacity according to style", async() => {
    const state:  scoreSum = { name: 'Yulia', movieGenre:data, sum:5, genreId:0};
    render(
      <MemoryRouter initialEntries={[{ state }]}>
        <QuizPage/>
      </MemoryRouter>
    );
    const name = screen.getAllByTestId("name-opacity");
    expect(name[0].style.opacity).toBe("1")
  });
});






