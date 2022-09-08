import React, {useState, useEffect} from "react";
//useState imports the actual list
import './App.css';
//importing coponents
import Form from "./components/form";
import TodoList from "./components/TodoList";

function App() {
  //State 
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //Run once the app starts
  useEffect (() =>{
    getLocalTodos();
  },[]);

    //useEffect
    useEffect(() => {
      filterHandler();
      saveLocalTodos();
    }, [todos, status]);

  //Functions and events
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
        default:
          setFilteredTodos(todos);
          break;
    }
  };
  //save to local
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    
  };
  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]));
    }else{
      let localTodo = JSON.parse(localStorage.getItem('todos'))
      setTodos(localTodo);
    }
  };

  return (
    <div className="App">
      <header>
        <h1> Chris' To Do list:</h1>
      </header>
      <Form todos={todos}
        inputText={inputText}  
        setToDos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
        
        />
      <TodoList 
        filteredTodos={filteredTodos}
        setTodos={setTodos} 
        todos={todos}
        />
      </div>
  );
}

export default App;
