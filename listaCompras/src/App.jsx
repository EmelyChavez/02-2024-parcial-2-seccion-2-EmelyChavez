import React, { useState, useEffect } from "react";
import ListForm from "./components/ListForm";
import AddItem from "./components/AddItem";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);

  // agregar nuevo producto
  const addItem = (item) => {
    setItemsAndSave([...items, item]);
  };
  
  // alternar estado de completado
  const handleCompleteItem = async (itemId) => {
    try {
      const itemToUpdate = items.find((item) => item.id === itemId);
      if (!itemToUpdate) return;

      const response = await fetch(`http://localhost:3000/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted: !itemToUpdate.isCompleted }), 
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el articulo en el servidor');
      }

      const newItems = items.map((item) =>
        item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
      );
      setItemsAndSave(newItems);
      fetchItemsFromBackend();
    } catch (error) {
      console.error('Error al actualizar el articulo:', error);
    }
  };

  // eliminar producto por ID y conectarlo con el backend
  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3000/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el articulo del servidor');
      }

      const newItems = items.filter((item) => item.id !== itemId);
      setItemsAndSave(newItems);
      fetchItemsFromBackend();
    } catch (error) {
      console.error('Error al eliminar el articulo:', error);
    }
  };

  const fetchItemsFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:3000/items');
      const data = await response.json();
      setItems(data); 
    } catch (error) {
      console.error('Error al obtener los artículos del servidor:', error);
    }
  };
  

  const setItemsAndSave = (newItems) => {
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  };

  const loadSavedItems = () => {
    const saved = localStorage.getItem("items");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadSavedItems();
    fetchItemsFromBackend();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Art on Your Skin</h1>
      </header>

      <AddItem handleAddList={addItem} /> { }
      <ListForm
        items={items}
        togglePurchased={handleCompleteItem} 
        deleteItem={handleDeleteItem} 
      /> {}
    </div>
  );
}

export default App;
