import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <title> Leo's Website </title>
        <label>Welcome To Leo's Website</label> 
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <form>
          <label for="question">Ask a Question</label>
          <input type='text' id = "question" name='question'></input>
          <label for="question">Name</label>
          <input type='text' id = "name" name='name'></input>

          <button type='submit'>Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
