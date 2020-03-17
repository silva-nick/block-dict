import React from "react";
import "./App.css";

function randomColor() {
  return [
    Math.round(Math.random() * 105 + 150),
    Math.round(Math.random() * 105 + 150),
    Math.round(Math.random() * 105 + 150)
  ];
}

function Block(props) {
  const style = {
    backgroundColor: `rgb(${randomColor()})`
  };

  return (
    <div className="Block" style={style}>
      <text>{props.value}</text>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputWords: ["Hey", "Hi", "Hello"],
      outputDefine: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const newWord = event.target.value
      .replace(/[.,\/\^&\*;:{}=\-_`~()]/g, "")
      .split("");

    if (this.state.inputWords.indexOf(newWord) > -1) {
      this.setState({
        inputWords: newWord
      });
      //addDefine(newWord);
    }
  }

  addDefine(newWord) {}

  render() {
    const blockList = [];
    for (const word of this.state.inputWords) {
      blockList.push(<Block value={word} />);
    }

    //const defineList = [];
    //for (const word of this.state.outputWords) {
    // blockList.push(<Block value={word} />);
    //}

    return (
      <div className="App">
        <div className="Search">
          <text class="title">Translate a word </text>
          <input
            type="text"
            placeholder="Search.."
            onChange={this.handleChange}
          ></input>
        </div>
        <div className="InputBlocks">{blockList}</div>
        <div className="OutputBlocks">{}</div>
      </div>
    );
  }
}

export default App;
