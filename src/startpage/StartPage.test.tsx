import { render, screen, fireEvent} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StartPage from "./StartPage";
import userEvent from '@testing-library/user-event';
import QuizPage from "../quizpage/QuizPage";
import mockResponse from "../quizpage/fetchData"
import UserName from "../interfaces/Interfaces"

describe("StartPage testing", () => {
  test("should be able to type name input field and button is enabled", async() => {
    render(
      <MemoryRouter>
        <StartPage />
      </MemoryRouter>
    );
    expect(screen.queryByTestId("button-start-page")).toBeNull()
    const linkStartPage = screen.getByTestId("name");
    userEvent.type(linkStartPage, "Yuliia");
    expect(linkStartPage).toHaveValue("Yuliia")
    const button = await screen.findByTestId("button-start-page")
    expect(button).toBeEnabled()
  });

  test("change color button when input is filled", async() => {
    render(
      <MemoryRouter>
        <StartPage />
      </MemoryRouter>
    );
    userEvent.type(screen.getByTestId("name"), "Max");
    const button = await screen.findByTestId("button-start-page")
    expect(button).toHaveStyle("background: linear-gradient(90deg, #7e55b3 -0.37%, #a769c4 100.37%)")
  });
  test("Routing correct working",async() => {
    const data = mockResponse
    const state:  UserName = { name: 'Yulia', apiData:data};
    render(
      <MemoryRouter initialEntries={[{ state }]}>
        <StartPage/>
        <QuizPage/>
      </MemoryRouter>
    );
    userEvent.type(screen.getAllByTestId("name")[0], "Yuliia");
    const linkStartPage = await screen.findByTestId("go-to-mainpage")
    fireEvent.click(linkStartPage)
    const main = await screen.findByTestId("mainpage");
    expect(main).toBeInTheDocument()
  });
});