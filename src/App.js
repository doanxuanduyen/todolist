import React from "react";
import './fonts.css';
import Todo from "./components/todo";

function App() {
  return (
    <div className="App bg-background h-screen p-16 flex flex-col gap-8">
      <Todo/>
    </div>
  );
}

export default App;
