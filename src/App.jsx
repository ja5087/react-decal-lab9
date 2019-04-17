import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      id: nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      nextItemId: prevState.nextItemId + 1,
      items: [...prevState.items, newItem]
    })));
  }

  clearCompletedItems() {
    this.setState(prevState => {
      let newItemsList = [...prevState.items];
      newItemsList = newItemsList.filter(x => !x.isCompleted);
      
      return {
        items: newItemsList
      }
      
    });
  }

  increaseSessionsCompleted(itemId) {
    this.setState(prevState => {
      
      let newItemsList = [...prevState.items];
      for(let i = 0; i < newItemsList.length; i++) {
        if(newItemsList[i].id == itemId) {
          newItemsList[i].sessionsCompleted += 1;
        }
      }
      return {
        items: newItemsList
      }
    });
  }

  toggleItemIsCompleted(itemId) {
    this.setState(prevState => {
      
      let newItemsList = [...prevState.items];
      for(let i = 0; i < newItemsList.length; i++) {
        if(newItemsList[i].id == itemId) {
          newItemsList[i].isCompleted = !newItemsList[i].isCompleted;
        }
      }
      return {
        items: newItemsList
      }
    });
  }

  startSession(id) {
    this.setState(prevState => ({
      sessionIsRunning: true,
      itemIdRunning: id
    }));
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
    } = this.state;

    let areItemsMarkedAsCompleted = items.some(x => x.isCompleted);
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
          </header>
            {sessionIsRunning && <Timer
              key={itemIdRunning}
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
              autoPlays
            /> }
            {
              items.length > 0 
              ? 
              <div className="items-container">
              {items.map(x => <TodoItem key={x.id} {...x} startSession={() => this.startSession(x.id)} toggleIsCompleted={() => this.toggleItemIsCompleted(x.id)}></TodoItem>)}
              </div> 
              :
              < EmptyState />
            }
            
            {}

        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
