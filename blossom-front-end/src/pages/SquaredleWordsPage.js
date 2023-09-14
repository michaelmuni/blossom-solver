import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

const SquaredleWordsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [words, setWords] = useState([])

  useEffect(() => {
    if (!state || !state.fromApp) {
      navigate("/squaredle");
    } else {
      async function fetchWords() {
        const { data: response } = await axios({
            method: "POST",
            url: `/squaredle/words`,
            data: { 
              board: state.board
            }
        });
        setWords([...response]);
    }

    fetchWords();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (words.length === 0) {
    return <p>Loading...</p>
  }

  if (words.length > 0) {
    return (
      <div className="App">
      <Link to="/squaredle">
          <h1>SQUAREDLE SOLVER</h1>
      </Link>
      <h2>Words for Board</h2>
      <table>
        <thead>
          <tr>
              <th>Word</th>
              <th>Length</th>
          </tr>
          </thead>
          <tbody>
          {words.map((word) => 
              <tr key={word}>
                  <td>{word}</td>
                  <td>{word.length}</td>
              </tr>
          )}   
          </tbody> 
      </table>
      </div>
    );
  }

}

export default SquaredleWordsPage;
