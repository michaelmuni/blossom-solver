import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SquaredlePage = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({mode: "all"});
  let navigate = useNavigate();

  const onSubmit = data => {
    let board = data.board.split(",").map(element => element.split(""));
    
    navigate(`/squaredle/words`, { state: { 
        board: board, 
        fromApp: true 
    }});
  }

  return (
    <div className="App">
      <h1>SQUAREDLE SOLVER</h1>
      <h2>Enter your set of letters to solve your Squaredle puzzle</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input id="board" type='text' {...register("board", { required: {value: true, message: "This is required" }, 
                                        validate: (value) => {
                                            const array = value.split(",");
                                            return array.length > 0 && array.every(entry => entry.length === array[0].length);
                                        }})}/>
        {errors.board && <p>{errors.board?.message}</p>}
        {errors.board && errors.board.type === 'validate' && <p>You must enter a valid board.</p>}
        <input type="submit" value="OK" disabled={!isValid}/>
      </form>
    </div>
  );
}

export default SquaredlePage;
