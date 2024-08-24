import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

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

  const toogleFinished = (e) => {
    setShowFinished(!showFinished);
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
      <div className="container  md:my-5 mx-auto p-5 rounded-xl bg-blue-100 min-h-[80vh] md:w-1/2">
        <h1 className="text-center text-xl font-bold">
          toodles - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-2">
          <h2 className="text-lg font-bold ">add a todo</h2>
          <input
            type="text"
            onChange={handleChange}
            //value will add the current todo value in text field , it works like when we add a new todo ,it will change the todos value as the handleChange function updates it
            value={todo}
            className="w-full rounded-2xl px-5 py-1 "
          />
          <button
            onClick={handleAdd}
            //the button is disabled when the length of todo is less than 3
            disabled={todo.length < 3}
            className="px-2 py-1 w-full rounded-md text-sm font-semibold text-blue-200 bg-blue-800 disbaled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-950"
          >
            save
          </button>
        </div>
        {/* here we will show the todos which are not completed */}
        {/* we are using the ternary operator to show the todos which are not completed
        here we are using checked attribute to specify the value of button is true or false instead of using values attribute  */}
        <input
          onChange={toogleFinished}
          type="checkbox"
          checked={showFinished}
          className="mr-3"
        />
        Show Finished
        <h2 className="text-xl font-bold">Your todo!</h2>
        <div className="todos">
          {todos.length === 0 && ( //if the input section is empty then this div will appear
            <div className="m-5">No todos to display</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                //if show finished is false then it will show only the todos which are not completed
                //if show finished is true then it will show all the todos
                //if show finished is true and the todo is completed then it will show the todo
                <div
                  key={item.id}
                  className="todo flex my-3 md:w-1/2 justify-between"
                >
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id} //this will assign the current id of todo to name so we can access it in a function to toggle the check-box
                    id=""
                  />
                  {/* if the checkbox is toggled then the selected will get a line-through the text */}
                  <div
                    className={`${
                      item.isCompleted ? "line-through" : ""
                    } flex flex-auto ml-3 mt-1`}
                  >
                    {item.todo}
                  </div>
                  <div className="buttons flex h-full ">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="px-2 py-1 m-1 rounded-md text-sm font-semibold text-blue-200 bg-blue-800  hover:bg-blue-950"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        //(e)event function will be called on click
                        handleDelete(e, item.id);
                      }}
                      className="px-2 py-1 m-1 rounded-md text-sm font-semibold text-blue-200 bg-blue-800  hover:bg-blue-950"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
