import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";

import Todo from "./Todo";
import AddTodo from "./AddTodo";

class Todos extends Component {
  state = {
    addTodosValue: "",
    todos: [
      {
        id: 1,
        value: "todo 1",
        isDone: false,
      },
      {
        id: 2,
        value: "todo 2",
        isDone: true,
      },
      {
        id: 3,
        value: "todo 3",
        isDone: false,
      },
    ],
  };

  // Local helper method to get date
  getTime() {
    let date = new Date();
    let time = date.getTime();

    return time;
  }

  // Delete function
  handleDelete = (todo) => {
    const todos = this.state.todos.filter((t) => t.id !== todo);

    this.setState({ todos });
  };

  // Done function

  handleDone = (todo) => {
    const todos = [...this.state.todos];

    todos.map((t) => {
      if (t.id === todo.id) {
        t.isDone = !todo.isDone;
      }

      return t;
    });

    this.setState({ todos });
  };

  //method called from AddTodo component

  addTodo = (value) => {
    if (value) {
      const todos = [...this.state.todos];

      todos.push({
        id: this.getTime(),
        value,
        isDone: false,
      });

      this.setState({ addTodosValue: "", todos });
    } else {
      toast.error("Please Add Todo Text");
    }
  };

  render() {
    return (
      <table className="table">
        <tbody>
          {this.state.todos.map((todo, index) => (
            <tr key={todo.id}>
              <Todo
                index={index + 1}
                todo={todo}
                fooDelete={this.handleDelete}
                fooDone={this.handleDone}
              />
            </tr>
          ))}
          <tr>
            <td colSpan="4" className="text-center">
              <AddTodo
                fooAddTodo={this.addTodo}
                addTodoValue={this.state.addTodosValue}
              />
            </td>
          </tr>
        </tbody>

        <ToastContainer />
      </table>
    );
  }
}

export default Todos;
