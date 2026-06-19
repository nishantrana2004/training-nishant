import React, { useState, useEffect } from 'react';
import './locall.css';

function Locall() {

  const [data, setData] = useState('');
  const [data1, setData1] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const savedData1 = JSON.parse(localStorage.getItem('data1')) || [];
    setData1(savedData1);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('data1', JSON.stringify(data1));
  }, [data1]);

  // Add Task
  function addTask() {

    if (data === '') {
      alert('Please enter task');
      return;
    }

    setData1([...data1, data]);
    setData('');
  }

  // Delete Task
  function deleteTask(index) {
    const updatedData1 = data1.filter((_, i) => i !== index);
    setData1(updatedData1);
  }

  return (
    <div className="locall-container">
      <div className="locall-card">
        <h3 className="locall-heading">Hello User Today Is</h3>
        <div className="locall-dayBox">Wednesday</div>

        <div className="locall-inputBox">
          <input
            type="text"
            placeholder="Add your task"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="locall-input"
          />
          <button onClick={addTask} className="locall-button">
            Add
          </button>
        </div>

        <div>
          {data1.map((item, index) => (
            <div key={index} className="locall-taskItem">
              <span>{item}</span>
              <button
                onClick={() => deleteTask(index)}
                className="locall-deleteBtn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Locall;