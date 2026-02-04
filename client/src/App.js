import logo from './logo.svg';
import './App.css';

import axios from "axios"

const port = 3001

function App() {
  
  const [question, updateQuestion] = useState("")
  const [name, updateName] = useState("")

  function submitQuestion(){
    axios.post(`http://localhost${port}/api/insert`)
  }


  return (
    <div className="App">
      <header className="App-header">
        <title> Leo's Website </title>
        <label>Welcome To Leo's Website</label> 
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <form>
          <label for="question">Ask a Question</label>
          <input type='text' id = "question" name='question' onChange={(event) => {
            updateQuestion(event.target.value)
          }}></input>
          <label for="name">Name</label>
          <input type='text' id = "name" name='name'onChange={(event) => {
            updateName(event.target.value)
          }}></input>

          <button onClick={submitQuestion} type='submit'>Submit</button>
        </form>
      </header>
      <div id='search'>
          <QuestionSearch/>
      </div>
    </div>
  );
}

export default App;
