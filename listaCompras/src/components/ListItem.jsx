import React from "react";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";

const ListItem = ({ item, handleDeleteItem, handleCompleteItem }) => {
  return (
    <li className="list-item">
      <div className="product-details">
        <img
          src={item.image}
          alt={item.name}
          className="product-image"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        <span
          style={{ textDecoration: item.isCompleted ? "line-through" : "none", cursor: "pointer" }}
          onClick={() => handleCompleteItem(item.id)}
        >
          {item.name}
        </span>
        <p>Price: ${item.price}</p>
      </div>
      <div className="actions"> {}
        <button 
          className="delete-button" 
          onClick={() => handleDeleteItem(item.id)}
          aria-label="Eliminar producto"
        >
          <FaTrashAlt />
        </button>
        <button 
          className="complete-button" 
          onClick={() => handleCompleteItem(item.id)} 
          aria-label="Añadir al carrito"
        >
          <FaShoppingCart />
        </button>
      </div>
    </li>
  );
};

export default ListItem;
