import React from 'react';
import defaultDataset from './dataset';
import '../src/assets/sytles/index.css';
import '../src/assets/sytles/style.css';
import {AnswersList} from './Components/index'; 

export default class App extends React.Component {
  
  constructor(props) {
      super(props) ;
        this.state = {
          answers: [],
          chats: [],
          currentId: "init",
          dataset: defaultDataset,
          opne: false
        }
      }
  
  initAnswer = () =>{
    const initDataset = this.state.dataset[this.state.currentId]
    const initAnswers = initDataset[this.state.answers]
    this.setState({
      answers: initAnswers
    })
  }
    
  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <AnswersList answers={this.state.answers} />

        </div>
      </section>
    );
  }
}

