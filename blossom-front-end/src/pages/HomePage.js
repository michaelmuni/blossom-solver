import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({mode: "all"});
  let navigate = useNavigate();

  const onSubmit = data => {
    navigate(`/words/${data.letters}`);
  }

  return (
    <div className="App">
      <h1>BLOSSOM SOLVER</h1>
      <h2>Enter your set of letters to solve your Blossom puzzle</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input id="letters" type='text' {...register("letters", { required: {value: true, message: "This is required" }, 
                                                      pattern: {value: /^[A-Za-z]{7}$/, message: "Must be a string of 7 characters"}})}/>
        {errors.letters && <p>{errors.letters?.message}</p>}
        <input type="submit" value="OK" disabled={!isValid}/>
      </form>
    </div>
  );
}

export default HomePage;
