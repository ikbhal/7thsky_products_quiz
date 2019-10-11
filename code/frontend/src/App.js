
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Question extends React.Component {
  render() {
    return <h2>Q.{this.props.text}</h2>;
  }
}

class Option extends React.Component {

  constructor(props) {
    super(props);
    this.state = {checked: false};
  }

  optionChangeHandler = (event) => {
    this.setState({checked: event.currentTarget.value});//TODO set value based on radio button status
  }

  render() {
    //return <p>A.{this.props.text}</p>;
    return (
      <div>
        <input type="radio" value={this.props.text} onChange={this.optionChangeHandler}>
          {this.props.text}
        </input>
      </div>
    );
  }
}


class QA extends React.Component {

  constructor(props) {
    super(props);
    this.state = {userSelectedAnswer: 0};
  }

  myChangeHandler = (event) => {
    this.setState({userSelectedAnswer: true});//TODO set value based on radio button status
  }

  render() {
    return (
      <div id="qa">
        <Question text={this.props.q}></Question>
        <Option text={this.props.a}></Option>
        <Option text={this.props.b}></Option>
        <Option text={this.props.c}></Option>
        <Option text={this.props.c}></Option>
      </div>
    );
  }
}

class QUIZ extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {qalist: []};
  }

  componentDidMount() {
    axios.get('http:localhost:3001/quiz')
      .then(res => {
        console.log("res", res);
        const qalist = res.data;
        console.log("qalist", qalist);
        this.setState({ qalist });
      })
  }

  quizSubmitHandler = (event) => {
    event.preventDefault();
    alert("quiz submitte");
  }
  
  render() {
    return (
      <form onSubmit={this.quizSubmitHandler}>
        <div id="qalist">
          QUIZ
          {  this.state.qalist.map( qa => <QA q={qa.q} a={qa.options[0]} b={qa.options[1]} c={qa.options[2]} d={qa.options[3]} ></QA> )  }
        </div>
      </form>

    );
  }
}

ReactDOM.render(<QUIZ />, document.getElementById('root'));
export default QUIZ;


