import React, { useState } from "react";
const Modal = ({ onClose, content }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          &times;
        </button>
        <div>{content}</div>
      </div>
    </div>
  );
};
const List = ({ items, onItemClick }) => {
  return (
    <div className="flex flex-col items-center p-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className="px-4 py-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Open {item.id}
        </button>
      ))}
    </div>
  );
};

const Movies = () => {
  const [openModal, setOpenModal] = useState(null);

  const data = [
    { id: "test1", content: "Content for Test 1" },
    { id: "test2", content: "Content for Test 2" },
  ];

  const handleOpenModal = (id) => {
    setOpenModal(id);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const selectedItem = data.find((item) => item.id === openModal);

  return (
    <div className="w-full h-full items-center justify-center flex flex-col"></div>
  );
};

export default Movies;
