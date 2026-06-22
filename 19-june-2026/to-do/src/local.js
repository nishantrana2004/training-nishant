import React, { useEffect, useState } from 'react';
import './local.css';

function Crud() {
  const [data, setData] = useState('');
  
  const [data1, setData1] = useState(() => {
    const savedData1 = localStorage.getItem('data1');
    return savedData1 ? JSON.parse(savedData1) : [];
  });
  
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('data1', JSON.stringify(data1));
  }, [data1]);

  function addData() {
    if (data.trim() === '') {
      alert('Please enter Data');
      return;
    }

    if (editIndex !== null) {
      const updatedData1 = [...data1];
      updatedData1[editIndex] = { 
        ...updatedData1[editIndex], 
        data: data 
      };
      setData1(updatedData1);
      setEditIndex(null);
    } else {
      const newItem = {
        id: Date.now(),
        data: data,
        completed: false 
      };
      setData1([...data1, newItem]);
    }
    setData('');
  }

  function editData(index) {
    setData(data1[index].data);
    setEditIndex(index);
  }

  function deleteData(index) {
    const updatedData1 = data1.filter((_, i) => i !== index);
    setData1(updatedData1);
  }

  function taskComp(index) {
    const task = data1[index];
    const statusText = task.completed ? "Incomplete" : "Complete";
    
    const userConfirmed = window.confirm(`Kya aap is task ko "${statusText}" mark karna chahte hain?`);
    
    if (userConfirmed) {
      const updatedData1 = [...data1];
      updatedData1[index].completed = !updatedData1[index].completed;
      setData1(updatedData1);
    }
  }

  return (
    <div className='container'>
        <div className='crud'>
            <h3 className='heading'>To-do operations</h3>
            <div className="dayBox">
              {new Date().toLocaleDateString("en-IN", { weekday: "long" })}
            </div>
            <div className='inputMain'>
                <input className='input' 
                  type='text' 
                  placeholder='Add Task' 
                  value={data} 
                  onChange={(e) => setData(e.target.value)}/>
                <br/>
                <button className='button' onClick={addData}>
                  {editIndex !== null ? 'Update' : 'Add'}
                </button>
            </div>
            <div className='listContainer'>
          {
            data1.map((item, index) => (
              <div key={item.id} className='item'>
                
                {/* Left side Section */}
                <div className='taskLeft'>
                  
                  {/* Circular Checkbox Class ke sath */}
                  <div 
                    onClick={() => taskComp(index)}
                    className={`circleMarker ${item.completed ? 'completedCircle' : ''}`}
                  >
                    {item.completed && <span className='tickMark'>✓</span>}
                  </div>

                  {/* Task Text Class ke sath */}
                  <span className={`taskText ${item.completed ? 'completedText' : ''}`}>
                    {item.data}
                  </span>
                </div>

                {/* Right side Section */}
                <div className='taskActions'>
                  <button
                    onClick={() => editData(index)}
                    className={`editBtn ${item.completed ? 'disabledBtn' : ''}`}
                    disabled={item.completed}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteData(index)}
                    className='deleteBtn'
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))
          }
        </div>
        </div>
    </div>
  )
}
export default Crud;