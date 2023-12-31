import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WordsPage from './pages/WordsPage';
import ErrorPage from './pages/ErrorPage';
import SquaredlePage from './pages/SquaredlePage';
import SquaredleWordsPage from './pages/SquaredleWordsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/words/:letters" element={<ValidateLetters />} />
        <Route path="/squaredle" element={<SquaredlePage />} />
        <Route path="/squaredle/words" element={<SquaredleWordsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function ValidateLetters() {
  let params = useParams();
  let letters = params.letters.match(/^[A-Za-z]*$/);
  if (!letters) {
    return <ErrorPage />;
  }
  return <WordsPage letters={params.letters.toLowerCase()} />;
}


export default App;