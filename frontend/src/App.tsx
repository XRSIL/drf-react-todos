import React from 'react';
import './App.css';
import { TasksList } from "./components/tasks/TasksList/TasksList";

function App() {
  return (
    <div className="App" style={ { padding: '100px' } }>
      <TasksList />
    </div>
  );
}

export default App;
