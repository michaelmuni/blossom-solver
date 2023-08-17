import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

const WordsPage = ({letters}) => {
  const [words, setWords] = useState([]) // the words as they come from the server - used to handle sorting/unsorting 
  const [wordsToRender, setWordsToRender] = useState([]); // the actual words to render on the page

  useEffect(() => {
    async function fetchWords() {
        const { data: response } = await axios({
            method: "GET",
            url: `/wordlist/${letters}`
        });
        setWords([...response]);
    }

    fetchWords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setWordsToRender([...words])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]); 

  function sortByScore() {
    let sortedWords = [...wordsToRender].sort((word1, word2) => {
      return word1[2] - word2[2];
    });
    
    setWordsToRender(sortedWords);
  }

  if (wordsToRender.length === 0) {
    return <p>Loading...</p>
  }

  if (wordsToRender.length > 0) {
    return (
      <div className="App">
      <Link to="/">
          <h1>BLOSSOM SOLVER</h1>
      </Link>
      <h2>Words for {letters}</h2>
      <table>
        <thead>
          <tr>
              <th>Word<FontAwesomeIcon className="sort" icon={faSort}/></th>
              <th>Letter to maximise<FontAwesomeIcon className="sort" icon={faSort}/></th>
              <th>Score<FontAwesomeIcon className="sort" onClick={sortByScore} icon={faSort}/></th>
          </tr>
          </thead>
          <tbody>
          {wordsToRender.map((word) => 
              <tr key={word[1]+word[0]}>
                  <td>{word[0]}</td>
                  <td>{word[1]}</td>
                  <td>{word[2]}</td>
              </tr>
          )}   
          </tbody> 
      </table>
      </div>
    );
  }

}

export default WordsPage;
