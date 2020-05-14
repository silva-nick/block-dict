import React from "react";
import "./App.css";
import api from "./api";

const querystring = require("querystring");

console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function () {
  console.logs.push(Array.from(arguments));
  console.stdlog.apply(console, arguments);
};

function randomColor() {
  return [
    Math.round(Math.random() * 105 + 150),
    Math.round(Math.random() * 105 + 150),
    Math.round(Math.random() * 105 + 150),
  ];
}

function Block(props) {
  const style = {
    backgroundColor: `rgb(${randomColor()})`,
  };

  return (
    <div className="block" style={style}>
      <text>{props.value}</text>
    </div>
  );
}

class BigBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      open: !state.open,
    }));
  }

  render() {
    if (this.state.open) {
      const styles = {
        width: `180px`,
        height: `180px`,
        transform: `translatex(0px) translatey(0px) rotatey(-180deg) `,
        transition: `all .5s cubic-bezier(0.62, 0.4, 0.5, 0.91)`,
      };
      return (
        <div className="output-block" onClick={this.handleClick} style={styles}>
          <div class="flip-card-front">
            <text>{this.props.value.simplified}</text>
          </div>
          <div class="flip-card-back">
            <div className="pinyin">
              <text>{this.props.value.pinyin}</text>
            </div>
            <div className="definition">
              <text>{this.props.value.english}</text>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="output-block" onClick={this.handleClick}>
          <div class="flip-card-front">
            <text>{this.props.value.simplified}</text>
          </div>
          <div class="flip-card-back">
            <div className="pinyin">
              <text>{this.props.value.pinyin}</text>
            </div>
            <div className="definition">
              <text>{this.props.value.english}</text>
            </div>
          </div>
        </div>
      );
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputWords: ["Type", "to", "start"],
      outputDefine: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const newWord = event.target.value
      .replace(/[.,\/\^&\*;:{}=\-_`~()]/g, "")
      .split("");
    if (this.state.inputWords.indexOf(newWord[newWord.length - 1]) === -1) {
      // alert(this.state.inputWords);
      this.setState({
        inputWords: newWord,
      });
      this.addDefines(newWord);
    }
  }

  async addDefines(newWord) {
    await api.getDefsByChars(newWord).then((words) => {
      //alert(words.data);
      if (words) {
        words = words.data.split("}");
        words.pop();
        //alert(words);
        for (let word of words) {
          word = querystring.parse(word);
          if (this.state.outputDefine.indexOf(word) === -1)
            this.state.outputDefine.push(word);
        }
        this.forceUpdate();
      }
    });
  }

  render() {
    const blockList = [];
    for (const word of this.state.inputWords) {
      blockList.push(<Block value={word} />);
    }

    const defineList = [];
    for (const define of this.state.outputDefine) {
      defineList.push(<BigBlock value={define} />);
    }

    return (
      <div className="App">
        <div className="translation-bar">
          <text class="title">Translate a word </text>
          <input
            type="text"
            placeholder="Search.."
            autoFocus
            onChange={this.handleChange}
          ></input>
        </div>
        <div className="input-blocks">{blockList}</div>
        <div className="output-blocks">{defineList}</div>
      </div>
    );
  }
}

export default App;
