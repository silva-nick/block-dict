import React from "react";
import "./App.css";
import api from "./api";

const querystring = require("querystring");

function randomColor() {
  return [
    Math.round(Math.random() * 105 + 150),
    Math.round(Math.random() * 105 + 150),
    Math.round(Math.random() * 105 + 150),
  ];
}

class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "#EADAAC", selected: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.state.selected = !this.state.selected;
    this.setState((state) => ({
      color: this.state.selected ? `#D6B85C` : "#EADAAC",
    }));
    this.props.callback(this.state.selected);
  }

  render() {
    const style = {
      //backgroundColor: `rgb(${randomColor()})`,
      backgroundColor: this.state.color,
    };

    return (
      <div className="block" style={style}>
        <text className="noselect" onClick={this.handleClick}>
          {this.props.value}
        </text>
      </div>
    );
  }
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
            <text className="noselect">{this.props.value.simplified}</text>
          </div>
          <div class="flip-card-back">
            <div className="pinyin">
              <text className="noselect">{this.props.value.pinyin}</text>
            </div>
            <div className="definition">
              <text className="noselect">{this.props.value.english}</text>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="output-block" onClick={this.handleClick}>
          <div class="flip-card-front">
            <text className="noselect">{this.props.value.simplified}</text>
          </div>
          <div class="flip-card-back">
            <div className="pinyin">
              <text className="noselect">{this.props.value.pinyin}</text>
            </div>
            <div className="definition">
              <text className="noselect">{this.props.value.english}</text>
            </div>
          </div>
        </div>
      );
    }
  }
}

/*-------------------------START OF APP-------------------------*/
const landing = {
  Type: [{ simplified: "\u5f00", pinyin: "kai1", english: "open" }],
  to: [{ simplified: "\u59cb", pinyin: "shi3", english: "beginning" }],
  start: [
    { simplified: "\u5427!", pinyin: "ba", english: "suggestive particle" },
  ],
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: landing,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    //alert("test " + event.target.value);
    const currentWords = event.target.value
      .replace(/[.,\/\^&\*;:{}=\-_`~()]/g, "")
      .split("");
    if (currentWords.length === 0) {
      this.setState({
        words: {
          Type: [{ simplified: "\u5f00", pinyin: "kai1", english: "open" }],
          to: [{ simplified: "\u59cb", pinyin: "shi3", english: "beginning" }],
          start: [
            {
              simplified: "\u5427!",
              pinyin: "ba",
              english: "suggestive particle",
            },
          ],
        },
      });
    } else {
      const wordSet = [...new Set(currentWords)];
      //alert(wordSet + "  and  " + Object.keys(this.state.words));
      for (const oldWord in this.state.words) {
        if (wordSet.indexOf(oldWord) === -1) {
          delete this.state.words[oldWord];
          //deleted
        }
      }
      for (const newWord of wordSet) {
        if (Object.keys(this.state.words).indexOf(newWord) === -1) {
          //added
          //this.state.words.put(wordSet[i]);
          this.state.words[newWord] = [];
          this.addDefines(Object.keys(this.state.words), newWord);
        }
      }
      this.forceUpdate();
    }
  }

  async addDefines(inputWords, newWord) {
    await api.getDefsByChars(inputWords).then((words) => {
      //alert(words.data);
      if (words) {
        words = words.data.split("}");
        words.pop();
        //alert(words);
        for (let word of words) {
          word = querystring.parse(word);
          if (this.state.words[newWord].indexOf(word) === -1)
            this.state.words[newWord].push(word);
        }
        this.forceUpdate();
      }
    });
  }

  selectedCallback = (selected) => {
    console.log(selected);
  };

  render() {
    const blockList = [];
    const defineList = [];
    for (const word in this.state.words) {
      blockList.push(<Block value={word} callback={this.selectedCallback} />);
      for (const define of this.state.words[word]) {
        defineList.push(<BigBlock value={define} />);
      }
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
        <div className="feedback">
          <a className="feedbutton" href="https://forms.gle/Dtk1fBdhTJYgY6JV8">
            Feedback?
          </a>
        </div>
      </div>
    );
  }
}

export default App;
