import React from "react";
import "./App.css";

function randomColor() {
  return [
    Math.round(Math.random() * 155 + 100),
    Math.round(Math.random() * 155 + 100),
    Math.round(Math.random() * 155 + 100)
  ];
}

function Block(props) {
  const style = {
    margin: "16px",
    backgroundColor: `rgb(${randomColor()})`
  };

  return (
    <div className="Block">
      <text style={style}>{props.value}</text>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputWords: ["Hey", "Hi", "Hello"],
      outputWords: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      inputWords: event.target.value.replace(/[^\w]/g, "").split("")
    });
  }

  render() {
    const blockList = [];
    for (const word of this.state.inputWords) {
      blockList.push(<Block value={word} />);
    }

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
      </div>
    );
  }
}

export default App;
