import React from "react";
import ListItem from "./ListItem";

const ListForm = ({ items, deleteItem, togglePurchased }) => {
    return (
        <ul>
            {items.map((item) => (
                <ListItem
                    key={item.id}
                    item={item}
                    handleDeleteItem={deleteItem}
                    handleCompleteItem={togglePurchased}
                />
            ))}
        </ul>
    );
};

export default ListForm;
