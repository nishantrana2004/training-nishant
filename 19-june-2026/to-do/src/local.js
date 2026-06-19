import React, { useState, useEffect } from 'react';

function Local() {

  const [data, setData] = useState('');
    const [data1, setData1] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Load data from localStorage
  useEffect(() => {
    const savedData1 = JSON.parse(localStorage.getItem('data1')) || [];
    setData1(savedData1);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('data1', JSON.stringify(data1));
  }, [data1]);

  // Add & Update Task
  function addData() {

    if (data === '') {
      alert('Please enter Data');
      return;
    }

    // Update Task
    if (editIndex !== null) {

      const updatedData1 = [...data1];

      updatedData1[editIndex] = data;

      setData1(updatedData1);

      setEditIndex(null);

    } else {

      // Add Task
      setData1([...data1, data]);
    }

    setData('');
  }

  // Delete Task
  function deleteData(index) {

    const updatedData1 = data1.filter((_, i) => i !== index);

    setData1(updatedData1);
  }

  // Edit Task
  function editData(index) {

    setData(data1[index]);

    setEditIndex(index);
  }

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h3 style={styles.heading}>
          Hello User Today Is
        </h3>

        <div style={styles.dayBox}>
          Wednesday
        </div>

        <div style={styles.inputBox}>

          <input
            type="text"
            placeholder="Add your task"
            value={data}
            onChange={(e) => setData(e.target.value)}
            style={styles.input}
          />

          <button onClick={addData} style={styles.button}>
            {editIndex !== null ? 'Update' : 'Add'}
          </button>

        </div>

        <div>

          {
            data1.map((item, index) => (
              <div key={index} style={styles.taskItem}>

                <span>{item}</span>

                <div>

                  <button
                    onClick={() => editData(index)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteData(index)}
                    style={styles.deleteBtn}
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
  );
}

const styles = {

  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2'
  },

  card: {
    width: '260px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px gray'
  },

  heading: {
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '14px'
  },

  dayBox: {
    backgroundColor: '#6a1b9a',
    color: 'white',
    textAlign: 'center',
    padding: '8px',
    marginBottom: '15px',
    borderRadius: '3px'
  },

  inputBox: {
    display: 'flex',
    gap: '5px'
  },

  input: {
    flex: 1,
    padding: '5px'
  },

  button: {
    backgroundColor: '#6a1b9a',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer'
  },

  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
    backgroundColor: '#eee',
    padding: '8px',
    borderRadius: '3px'
  },

  editBtn: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '5px',
    marginRight: '5px',
    cursor: 'pointer'
  },

  deleteBtn: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px',
    cursor: 'pointer'
  }

};

export default Local;