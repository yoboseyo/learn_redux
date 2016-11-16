import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { createStore } from 'redux';
var section = document.createElement('section');
document.body.appendChild(section);
require('./css/antd.min.css');
require('./css/style.css');


const reducer = function (state=[],action) {

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
              <ListItem key={index} name={item.name} content={item.content} />
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





const render = function(){
  ReactDOM.render(<MainSec />, section)
}
render();
store.subscribe(render);