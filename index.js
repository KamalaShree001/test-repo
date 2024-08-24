import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Load form data from local storage when the component mounts
    const savedFormData = JSON.parse(localStorage.getItem('formData')) || [];
    setFormData(savedFormData);
    // Load fields from local storage
    const savedFields = JSON.parse(localStorage.getItem('fields')) || [];
    setFields(savedFields);
  }, []);

  useEffect(() => {
    // Save fields and formData to local storage whenever they change
    localStorage.setItem('fields', JSON.stringify(fields));
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [fields, formData]);

  const addField = () => {
    const newField = { id: Date.now(), value: '' };
    setFields([...fields, newField]);
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
    const updatedFormData = [...formData.filter(data => data.id !== id), fieldToSave];
    setFormData(updatedFormData);
  };

  return (
    <div className="App">
      <h1>Dynamic Form Folder</h1>
      <div className="form-container">
        {fields.map(field => (
          <div key={field.id} className="field-wrapper">
            <div className="field-container">
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={`Field ${field.id}`}
              />
              <button className="save-button" onClick={() => saveFields(field.id)}>Save</button>
              <button className="add-field-button" onClick={addField}>Add Field</button>
            </div>
            <button className="remove-button" onClick={() => removeField(field.id)}>Remove</button>
          </div>
        ))}
        <div className="add-field-container">
          <button className="add-field-button" onClick={addField}>Add Field</button>
        </div>
      </div>
      <div className="output">
        <h2>Saved Data</h2>
        {formData.length > 0 ? (
          formData.map((item, index) => (
            <div key={item.id} className="saved-item">
              <p>ID: {item.id}</p>
              <p>Value: {item.value}</p>
              <p>Index: {index}</p>
              {/* Removed Address display */}
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
