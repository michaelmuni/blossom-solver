import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const WordsPage = ({letters}) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    async function fetchWords() {
        const { data: response } = await axios({
            method: "GET",
            url: `/wordlist/${letters}`
        });
        
        setWords(response)
    }

    fetchWords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (words === []) {
    return <p>Loading...</p>
  }

  return words.length > 0 && (
    <div className="App">
    <Link to="/">
        <h1>BLOSSOM SOLVER</h1>
    </Link>
    <h2>Words for {letters}</h2>
    <table>
        <tr>
            <th>Word</th>
            <th>Letter to maximise</th>
            <th>Score</th>
        </tr>
        {words.map((word) => 
            <tr>
                <td>{word[0]}</td>
                <td>{word[1]}</td>
                <td>{word[2]}</td>
            </tr>
        )}    
    </table>
    </div>
  );
}

export default WordsPage;
