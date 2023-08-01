import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="App">
        <Link to="/">
            <h1>BLOSSOM SOLVER</h1>
        </Link>
        <h2>Something has gone wrong. Please ensure your URL only contains letters and try again.</h2>
    </div>
  );
}

export default ErrorPage;
