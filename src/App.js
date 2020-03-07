import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputWords: [],
      outputWords: []
    };
  }

  render() {
    return (
      <div className="App">
        <div className="Search">
          <text class="title">Translate a word </text>
          <input type="text" placeholder="Search.."></input>
        </div>
        <div className="InputBlocks">
          <text>Testing</text>
        </div>
      </div>
    );
  }
}

export default App;
