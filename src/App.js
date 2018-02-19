import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person.js';

class App extends Component {
  state = {
    persons : [
      {id:'1', name: 'Asjad', age: 18} ,
      {id:'2', name: 'Mac', age: 28 },
      {id:'3', name: 'Manu', age: 65 }
    ],
    showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState( { 
      persons: [     
      {id:'1', name: newName, age: 18} ,
      {id:'2', name: 'Mac', age: 28 },
      {id:'3', name: 'Manu', age: 65 }
      ]
    });
  }

  deletePersonHandler = (personIndex) =>{
    const persons =  [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons:persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id===id;
    });
    
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons:persons});
    
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;

    if(this.state.showPersons) {
      persons = (
      <div>
          {this.state.persons.map((person, index) => {
            return <Person
            click = {() => this.deletePersonHandler(index)} 
            key = {person.id}
            name = {person.name}
            age = {person.age}
            changed = {(event)=>this.nameChangeHandler(event, person.id)} />
          })}          
        </div>
      );
      style.backgroundColor= 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    let classes = [];
    if(this.state.persons.length<=2) {
      classes.push('red');
    }

    if(this.state.persons.length<=1) {
      classes.push('bold');
    }

    return (    
      <StyleRoot>  
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working</p>
        <button 
        style={style}
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
      </StyleRoot>  
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Asjad'));
  }
}

export default Radium(App);
