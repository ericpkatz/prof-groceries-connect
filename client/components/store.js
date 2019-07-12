import React, { Component } from "react";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


const SET_ITEMS = 'SET_ITEMS';
const TOGGLE = 'TOGGLE';

const _toggle = (item)=> {
  return {
    type: TOGGLE,
    item
  };
};

const toggle = (item)=> {
  return async (dispatch)=> {
    const response = await axios.put(`/api/items/${item.id}`, {...item, bought: !item.bought });
    dispatch(_toggle(response.data));
  };
};

const _loadItems = (items)=> {
  return {
    type: SET_ITEMS,
    items
  };
};

const loadItems = ()=> {
  return async (dispatch, getState)=> {
    const response = await axios.get('/api/items');
    dispatch(_loadItems(response.data));
  };
};
const groceriesReducer = (state = [
], action) => {
  switch(action.type){
    case SET_ITEMS:
      return action.items;
    case TOGGLE:
      return state.map( item => {
        if(item.id !== action.item.id){
          return item;
        }
        return action.item;
      })
  }
  return state;
}

const reducer = combineReducers({
  groceries: groceriesReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { toggle, loadItems };

