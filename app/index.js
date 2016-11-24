import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { Provider, connect } from 'react-redux'
var section = document.createElement('section');
document.body.appendChild(section);
require('./css/antd.min.css');
require('./css/style.css');

export default class MainSec extends Component {
  render() {
    const { arr, count, onAddClick, onPlusClick, onDelClick } = this.props;
    return (
      <div>
        <InputSec onClick={onAddClick} onClick2={onPlusClick}/>
        <List arr={arr} click={onDelClick} />
        <div>{count}</div>
      </div>
    )
  }
}

class InputSec extends Component {
  render() {
    return (
      <div className="inputSec">
        <form>
          <input type="text" ref="name" />
          <textarea ref="content" />
          <Button type="primary" onClick={() => this.props.onClick({
            name: this.refs.name.value,
            content: this.refs.content.value,
            id: Date.now()})}>Primary</Button>
          <Button type="primary" onClick={this.props.onClick2}>+1</Button>
        </form>

      </div>
    )
  }
}

class List extends Component {
  render() {
    var func = this.props.click;
    return(
      <ul>
        {
          this.props.arr.map(function(item,index){
            return (
              <ListItem key={item.id} id={item.id} name={item.name} content={item.content} onDelClick={func}/>
            )
          })
        }
      </ul>
    )
  }
}

class ListItem extends Component {
  render() {
    const { onDelClick } = this.props;
    console.log(onDelClick)
    return(
      <li>
        <p>
          {this.props.name}
          <button onClick={() => onDelClick(this.props.id)}>删除</button>
        </p>
        <p>{this.props.content}</p>
      </li>
    )
  }
}

const reducer = function (state={arr:[], count: 0},action) {

  switch(action.type){
    case 'ADD':
      let nArr = state.arr.concat(action.payload);
      return {arr: nArr, count: state.count};
    case 'PLUS':
      state.count = state.count + 1;
      return {arr: state.arr, count: state.count};
    case 'DEL':
      let newArr = state.arr.filter(function(item,index){
        return item.id != action.payload
      });
      return {arr: newArr, count: state.count};
    default:
      return state;
  }

};



const store = createStore(reducer);

function mapStateToProps(state) {

  return {
    arr: state.arr,
    count: state.count
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddClick: (payload) => {

      dispatch({
      type: 'ADD',
      payload: payload
      })
    },
    onPlusClick: () => dispatch({type:'PLUS'}),
    onDelClick: (payload) => dispatch({
      type: 'DEL',
      payload: payload
    }),
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSec);

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  section
)

