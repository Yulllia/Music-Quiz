import Logo from "../assets/Logo.png";
import { useLocation, Link } from "react-router-dom";
import { scoreSum } from "../interfaces/Interfaces";

function FinishPage() {
  const scoreSum = useLocation().state as scoreSum;

  return (
    <div className="backround" data-testid="finishpage">
      <div className="logo-block">
        <img className="logo-title" src={Logo} alt="Logo" />
      </div>
      <main>
        <div className="form-block-finish">
        <div className="finish-quiz-image"> </div>
        <div className="circle-finish">
          <p className="score-sum">{scoreSum.sum && scoreSum.sum}</p>
        </div>
          <div className="title-top">
            {scoreSum.sum === 12 ? (
              <>
                <div className="title-top">
                  <h1 className="form-title" data-testid="name">{scoreSum.name}, did so great!</h1>
                  <div className="genre-description">
                    You got {scoreSum.sum} out of 12 points. You are definitely
                    a music lover!
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h1 className="form-title" data-testid="title-sum">
                    {scoreSum.name}, you can do better, try again!, you can do better, try again!
                  </h1>
                  <div className="genre-description">
                    You got {scoreSum.sum} out of 12 points
                  </div>
                </div>
              </>
            )}
            <Link className="link" to={`/genre-quiz`} state={scoreSum}>
              <button className="button button-finish" data-testid="go-tomain-page">
                <span className="button-text">try again</span>
                <div className="arrow"></div>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FinishPage;
