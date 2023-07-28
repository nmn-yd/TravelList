import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function handlesubmit(e) {
    e.preventDefault();

    if (!description) {
      return;
    }
    const newItem = {
      description: description,
      quantity: quantity,
      id: Date.now(),
      packed: false,
    };

    onAddItems(newItem);

    setDescription("");
    setquantity(1);
  }

  return (
    <form className="add-form" onSubmit={handlesubmit}>
      <h3>What do you need for your 🏄 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          return setquantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => (i = i + 1)).map((num) => {
          return (
            <option value={num} key={num}>
              {num}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="item.."
        value={description}
        onChange={(e) => {
          return setDescription(e.target.value);
        }}
      />
      <button>ADD</button>
    </form>
  );
}
