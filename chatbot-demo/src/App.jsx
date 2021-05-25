import React from 'react';
import defaultDataset from './dataset';
import '../src/assets/sytles/index.css';
import '../src/assets/sytles/style.css';
import {AnswersList, Chats} from './Components/index'; 
import FormDialog from './Components/Forms/FormDialog'; 

export default class App extends React.Component {
  
  constructor(props) {
      super(props) ;
        this.state = {
          answers: [],
          chats: [],
         currentId: "init",
          dataset: defaultDataset,
          open: false
        }
        this.selectAnswer = this.selectAnswer.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
      }

      displayNextQuestion = (nextQuestionId) => {
        const chats = this.state.chats
        chats.push({
          text: this.state.dataset[nextQuestionId].question,
          type: "question"
        }) 

        this.setState({
          answers: this.state.dataset[nextQuestionId].answers,
          chats: chats,
          currentId: nextQuestionId,
        })
         
      }

    selectAnswer = (selectedAnswer, nextQuestionId) => {
       switch(true){
         case (nextQuestionId === 'init'):
           this.displayNextQuestion(nextQuestionId)
           break;
          case (/^https:*/.test(nextQuestionId)):
            const a = document.createElement('a');
            a.href = nextQuestionId;
            a.target = '_blanck';
            a.click();
            break;
          case (nextQuestionId === 'contact'):
              this.handleClickOpen(); 
              break;
          default:
            const chats = this.state.chats;
            chats.push({
              text: selectedAnswer,
              type: 'answer'
            })
            
            this.setState({
              chats: chats
            }) 
            
            setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000)
             break;

       }
    }

    handleClickOpen = () => {
      this.setState({open: true});
    };
  
    handleClose = () => {
        this.setState({open: false});
    };

  componentDidMount() {
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId)
  }



  componentDidUpdate() {
    const scrollArea = document.getElementById('scroll-area')

    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }
    
  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer}/>
          <FormDialog open={this.state.open} handleClose={this.handleClose}/>
        </div>
      </section>
    );
  }
}

