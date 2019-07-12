import React, { Component } from "react";
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { Route, HashRouter, Link } from 'react-router-dom';
import store, { loadItems, toggle } from './store';

const _List = ({ groceries, toggle})=> {
  return (
    <div className="list">
      <ul>
        {
          groceries.map( item => <li onClick={ ()=> toggle(item)} style={{ textDecoration : item.bought ? 'line-through' : ''}} key={ item.id }>{ item.name }</li>)
        }
      </ul>
    </div>
  );
};

const List = connect(({ groceries }, { match })=> {
  let filtered = groceries;
  if(match.params.status){
    if(match.params.status === 'bought'){
      filtered = groceries.filter( item => item.bought);
    }
    else {
      filtered = groceries.filter( item => !item.bought);
    }
  }
  return {
    groceries: filtered
  };
}, (dispatch)=> {
  return {
    toggle: (item)=> dispatch(toggle(item))
  };
})(_List);

class _Routes extends Component{
  componentDidMount(){
    this.props.loadItems();
  }
  render(){
    return (
      <HashRouter>
        <div className="app">
          <img src="groceries.png" alt="Groceries" width="500" />
          <Route path='/:status?' component={ List } /> 
          <div className="footer">
            <Link to='/bought'>Bought</Link>
            {' ' }
            <Link to='/not-bought'>Not Bought</Link>
            {' ' }
            <Link to='/'>All</Link>
          </div>
        </div>
      </HashRouter>
    );
  }
}

const Routes = connect(null, (dispatch)=> {
  return {
    loadItems: ()=> dispatch(loadItems())
  }
})(_Routes);

const App = () => (
  <Provider store={ store }>
    <Routes />
  </Provider>
);

export default App;
