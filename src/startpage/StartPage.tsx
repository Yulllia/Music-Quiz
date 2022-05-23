import Logo from "../assets/Logo.png";
import "./StartPage.css";
import { ChangeEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";


function StartPage() {
  const [name, setName] = useState<string>("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(true);

  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }
  useEffect(() => {
    if(loading){
      <Spinner/>
    }
    const fetchData = async () => {
      const searchData = await fetch(
        `https://levi9-song-quiz.herokuapp.com/api/data`
      );
      await searchData.json().then((data) => setData(data));
      setLoading(false);
    };
    fetchData();
  }, [loading]);

  const myUserData = {
    name: name,
    apiData: data,
  };
  return (
    <div className="backround">
      <div className="logo-block">
        <img className="logo-title" src={Logo} alt="Logo" />
      </div>
      <main>
        <div className="form-block">
          <form className="form" onSubmit={onSubmit}>
            <div className="form-element"></div>
            <h2 className="form-title">Welcome!</h2>
            <label className="label-text">
              Please enter your name and lets start our quiz!
            </label>
            <input
              data-testid="name"
              type="text"
              placeholder="TYPE YOUR NAME HERE..."
              value={name}
              required
              className="input-block"
              onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                setName(event.target.value)
              }
            />
            {data && name ? (
              <Link data-testid="go-to-mainpage" className="link" to={`/genre-quiz`} state={myUserData}>
               <button className="button button-start" disabled={!name} data-testid="button-start-page">
                  <span className="button-text">start quiz</span>
                  <div className="arrow"></div>
                </button> 
              </Link>
            ) : (
              <button className="button button-start" disabled={!name}>
                <span className="button-text">start quiz</span>
                <div className="arrow"></div>
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default StartPage;
