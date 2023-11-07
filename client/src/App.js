import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [newRow, setNewRow] = useState({ serial: '', name: '', city: '', cgpa: '', phone: '' });

  const fetchTableData = async () => {
    // Make an API request to fetch table data from the server (Step 4).
    const response = await fetch('/api/data');
    const tableData = await response.json();
    setData(tableData);
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleAddRow = async () => {
    // Make an API request to add a new row to the database (Step 5).
    await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRow),
    });

    // Refresh the table data.
    fetchTableData();

    // Clear the form.
    setNewRow({ serial: '', name: '', city: '', cgpa: '', phone: '' });
  };

  const handleDeleteRow = async (id) => {
    // Make an API request to delete a row from the database (Step 6).
    await fetch(`/api/data/${id}`, {
      method: 'DELETE',
    });

    // Refresh the table data.
    fetchTableData();
  };

  return (
    <div className="App">
      <h1>Dynamic Table</h1>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Name</th>
            <th>City</th>
            <th>CGPA</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id}>
              <td>{row.serial}</td>
              <td>{row.name}</td>
              <td>{row.city}</td>
              <td>{row.cgpa}</td>
              <td>{row.phone}</td>
              <td>
                <button onClick={() => handleDeleteRow(row._id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                value={newRow.serial}
                onChange={(e) => setNewRow({ ...newRow, serial: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={newRow.name}
                onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={newRow.city}
                onChange={(e) => setNewRow({ ...newRow, city: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={newRow.cgpa}
                onChange={(e) => setNewRow({ ...newRow, cgpa: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={newRow.phone}
                onChange={(e) => setNewRow({ ...newRow, phone: e.target.value })}
              />
            </td>
            <td>
              <button onClick={handleAddRow}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
