import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { createStore } from 'redux';

const reducer = function (state=[],action) {
  console.log(state);
  switch(action.type){
    case 'ADD':
      state.push(action.payload);
      return state;
      break;
    default:
      return state;
  }
};
const store = createStore(reducer);

export default class MainSec extends Component {
  render() {
    return (
      <div>
        <InputSec />
        <List val={store.getState()} />
      </div>
    )
  }
}

class InputSec extends Component {
  handleAdd(){
    console.log(this.refs.name.value);
    store.dispatch({
      type: 'ADD',
      payload: {
        name: this.refs.name.value,
        content: this.refs.content.value,
      }
    });
  }
  render() {
    return (
      <div className="inputSec">
        <form>
          <input type="text" ref="name" />
          <textarea ref="content" />
          <Button type="primary" onClick={this.handleAdd.bind(this)}>Primary</Button>
        </form>

      </div>
    )
  }
}

class List extends Component {
  render() {
    return(
      <ul>
        {
          this.props.val.map(function(item,index){
            return (
              <ListItem name={item.name} content={item.content} />
            )
          })
        }
      </ul>
    )
  }
}

class ListItem extends Component {
  render() {
    return(
      <li>
        <p>{this.props.name}</p>
        <p>{this.props.content}</p>
      </li>
    )
  }
}


