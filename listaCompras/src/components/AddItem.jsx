import React, { useState } from "react";
import axios from "axios";

const AddItem = ({ handleAddList }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      try {
        const response = await axios.post('http://localhost:3000/items', { id: name.trim() });
        handleAddList(response.data); 
        setName(""); 
        setError(""); 
        fetchItemsFromBackend();
      } catch (err) {
        setError("Error al agregar el producto: " + err.response.data.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmitEvent} className="newListForm">
      <input
        required
        type="text"
        className="input-add"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Escribe el ID del producto"
      />
      <button className="btn-add" type="submit">
        Agregar
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AddItem;
