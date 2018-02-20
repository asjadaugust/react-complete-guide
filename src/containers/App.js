import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

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
    let persons = null;
    if(this.state.showPersons) {
      persons = 
        <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler} />;      
    }    

    return (    
      <div className={classes.App}>
       <Cockpit
        appTitle={this.props.title}
        showPersons={this.state.showPersons}
        persons={this.state.persons} 
        clicked={this.togglePersonsHandler}/>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Asjad'));
  }
}

export default App;
