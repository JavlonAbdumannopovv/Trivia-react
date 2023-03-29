import React from "react";
import useTrivia from "../customHook/useTrivia";
import "./Trivia.css";
import loadingLogo from "../Pictures/loading.gif";

function Trivia() {
  const { data, loading } = useTrivia();
  const [count, setCount] = React.useState(0);
  const [score, setScore] = React.useState(0);

  if (loading === false) {
    let item = document.querySelectorAll(".answers_list li p");
    item.forEach((el) => {
      el.addEventListener("click", () => {});
    });
  }

  const answerQuestion = () => {
    const answerChoose = (e) => {
      if (e.target.innerText === data.results[count].correct_answer) {
        setScore((score) => score + 1);
      }
      setCount((count) => count + 1);
      document.querySelector(".percent div").style.width =
        (100 / data.results.length) * (count + 1) + "%";
    };

    if (count === 9) {
      document.querySelector(".end").style.display = "block";
      document.querySelector("#trivia_header").style.display = "none";
      document.querySelector("#trivia_main").style.display = "none";
      setCount(0);
    }

    const btnClick = () => {
      setCount(0);
      document.querySelector(".end").style.display = "none";
      document.querySelector("#trivia_header").style.display = "flex";
      document.querySelector("#trivia_main").style.display = "block";
      document.querySelector(".percent div").style.width = "0%";
      setScore(0);
    };

    return (
      <>
        <header id="trivia_header" className="primary">
          <div className="questionCom">
            <p>
              Question {count}/{data.results.length}
            </p>
            <div className="percent">
              <div></div>
            </div>
          </div>
          <div className="score">
            <p>Score</p>
            <h2>{score}</h2>
          </div>
        </header>

        <main id="trivia_main" className="primary">
          <div className="question">
            <h1>{data.results[count].question}</h1>
          </div>
          <div className="answers">
            <ul className="answers_list">
              <li onClick={answerChoose}>
                <div className="answers_letter">
                  <p>A</p>
                </div>
                <p>{data.results[count].correct_answer}</p>
              </li>
              <li onClick={answerChoose}>
                <div className="answers_letter">
                  <p>B</p>
                </div>
                <p>{data.results[count].incorrect_answers[0]}</p>
              </li>
              <li onClick={answerChoose}>
                <div className="answers_letter">
                  <p>C</p>
                </div>
                <p>{data.results[count].incorrect_answers[1]}</p>
              </li>
              <li onClick={answerChoose}>
                <div className="answers_letter">
                  <p>D</p>
                </div>
                <p>{data.results[count].incorrect_answers[2]}</p>
              </li>
            </ul>
          </div>
        </main>

        <div className="end">
          <h2>You are score {score}</h2>
          <button onClick={btnClick}>Try Again</button>
        </div>
      </>
    );
  };

  return (
    <div id="trivia">
      <div className="trivia_content">
        {loading ? <img src={loadingLogo} alt="loading" /> : answerQuestion()}
      </div>

      <div className="back"></div>
    </div>
  );
}

export default Trivia;
