import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  //this function will save the data in local storage
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos)); //will save the todos in local storage in string format
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    //to basically create a illusion of update we will delete the current todo
    //as soon as it is clicked on the edit ,and when save is clicked it will get save again,basically work as a simple update function.
    let newTodos = todos.filter((item) => {
      //The filter method iterates over each item in the todos array and applies the provided callback function.
      return item.id !== id;
    });
    setTodos(newTodos);
    // console.log("the id is ", id);
    saveToLS(); //will save the todos in local storage in string format
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      //The filter method iterates over each item in the todos array and applies the provided callback function.
      return item.id !== id;
    });
    setTodos(newTodos);
    // console.log("the id is ", id);
    saveToLS(); //will save the todos in local storage in string format
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    // console.warn(todos);
    saveToLS(); //will save the todos in local storage in string format
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      //find index will select the first match found which satisfies the criteria mentioned below
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(); //will save the todos in local storage in string format
    // todos.filter();
  };

  return (
    <>
      <Navbar />
      <div className="container  my-5 mx-auto p-5 rounded-xl bg-blue-100 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold ">add a todo</h2>
          <input
            type="text"
            onChange={handleChange}
            //value will add the current todo value in text field , it works like when we add a new todo ,it will change the todos value as the handleChange function updates it
            value={todo}
            className="w-1/2"
          />
          <button
            onClick={handleAdd}
            className="px-2 py-1 m-6 rounded-md text-sm font-semibold text-blue-200 bg-blue-800  hover:bg-blue-950"
          >
            save
          </button>
        </div>
        <h2 className="text-xl font-bold">Your todo!</h2>
        <div className="todos">
          {todos.length === 0 && ( //if the input section is empty then this div will appear
            <div className="m-5">No todos to display</div>
          )}
          {todos.map((item) => {
            return (
              <div key={item.id} className="todo flex w-1/2 justify-between">
                <input
                  onChange={handleCheckbox}
                  type="checkbox"
                  value={item.isCompleted}
                  name={item.id} //this will asign the current id of todo to name so we can access it in a function to togggle the check-box
                  id=""
                />
                {/* if the checkbox is toggled then the selected will get a line-through the text */}
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                <div className="buttons flex h-full ">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="px-2 py-1 m-1 rounded-md text-sm font-semibold text-blue-200 bg-blue-800  hover:bg-blue-950"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      //(e)event function will be called on click
                      handleDelete(e, item.id);
                    }}
                    className="px-2 py-1 m-1 rounded-md text-sm font-semibold text-blue-200 bg-blue-800  hover:bg-blue-950"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
