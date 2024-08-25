import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState([]);

  const addField = () => {
    setFields([...fields, { id: Date.now(), value: '' }]);
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
    setFormData(formData.filter(data => data.id !== id));
  };

  const handleChange = (id, value) => {
    setFields(fields.map(field => field.id === id ? { ...field, value } : field));
  };

  const saveFields = (id) => {
    const fieldToSave = fields.find(field => field.id === id);
    setFormData([...formData.filter(data => data.id !== id), fieldToSave]);
  };

  return (
    <div className="App">
      <h1>Dynamic Form Folder</h1>
      <div className="form-container">
        {fields.map(field => (
          <div key={field.id} className="field-wrapper">
            <button className="remove-button" onClick={() => removeField(field.id)}>Remove</button>
            <div className="field-container">
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={`Field ${field.id}`}
              />
              <button className="save-button" onClick={() => saveFields(field.id)}>Save</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-field-button" onClick={addField}>Add Field</button>
      <div className="output">
        <h2>Saved Data</h2>
        {formData.length > 0 ? (
          formData.map((item, index) => (
            <div key={item.id} className="saved-item">
              <p>ID: {item.id}</p>
              <p>Value: {item.value}</p>
              <p>Index: {index}</p>
            </div>
          ))
        ) : (
          <p>No data saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default App;
