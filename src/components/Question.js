import React, { useState, useEffect } from 'react';
import './Question.scss';
import Chat from '@material-ui/icons/Chat';
import questionImg from '../Images/archibot.png';

function Question() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(
    "Hi, I'm Archibot your new best friend !"
  );
  const [messageArray, setMessageArray] = useState([]);

  const updateQuestion = (e) => {
    setQuestion(e.target.value);
  };
  const resetQuestion = () => {
    setQuestion('');
  };
  const updateResponse = (apiResult) => {
    setResponse(apiResult.cnt);
  };
  const updateMessageArray = () => {
    setMessageArray([...messageArray, question, response]);
    console.log(messageArray);
  };
  const submitToAPI = () => {
    const encodedURIMessage = encodeURIComponent(question);
    const url = `https://acobot-brainshop-ai-v1.p.rapidapi.com/get?bid=153798&key=SXUv8ChYDG1AboDK&uid=User&msg=${encodedURIMessage}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'acobot-brainshop-ai-v1.p.rapidapi.com',
        'x-rapidapi-key': '9d66c11fc3msh0ddb29e8617b481p17897bjsn28a020b0c4bf',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        updateResponse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitQuestionWithEnter = (e) => {
    e.preventDefault();
    submitToAPI();
  };

  useEffect(() => {
    updateMessageArray();
    resetQuestion();
  }, [response]);

  return (
    <div>
      <div className="questionBody">
        <div className="questionBubble">
          <span className="tip">{response}</span>
        </div>
        <div>
          <img className="questionImage" src={questionImg} alt="Archibot" />
        </div>

        <form
          onSubmit={(e) => {
            submitQuestionWithEnter(e);
            // updateMessageArray();
          }}
        >
          <button type="button" className="chatIcon">
            <Chat />
          </button>

          <div className="questionArea">
            <input
              className="questionInput"
              placeholder="Write something here..."
              onFocus={(e) => {
                e.target.placeholder = '';
              }}
              onBlur={(e) => {
                e.target.placeholder = 'WRITE HERE..';
              }}
              value={question}
              onChange={updateQuestion}
            />
            <button
              className="questionButton"
              type="button"
              onClick={submitToAPI}
            >
              {' '}
              ASK ME!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Question;
