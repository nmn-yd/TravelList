import { useState } from "react";
import "./index.css";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function addItem(item) {
    setItems((items) => [...items, item]);
  }

  function removeItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function toggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // anther way of doing this
  // const handleComplete = (id) => {
  //   setItemsList((list) => {
  //     const index = list.findIndex((item) => item.id === id);
  //     list[index].packed = !list[index].packed;
  //     return [...list];
  //   });
  // };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addItem} />
      <PackingList
        items={items}
        removeItem={removeItem}
        toggleItem={toggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away👜</h1>;
}
function Form({ onAddItems }) {
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

function Item({ item, removeItem, toggleItem }) {
  return (
    <li>
      <input
        onChange={() => toggleItem(item.id)}
        type="checkbox"
        value={item.packed}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => removeItem(item.id)}>❌</button>
    </li>
  );
}

function PackingList({ items, removeItem, toggleItem }) {
  return (
    <section className="list">
      <ul>
        {items.map((item) => {
          return (
            <Item
              item={item}
              key={item.id}
              removeItem={removeItem}
              toggleItem={toggleItem}
            />
          );
        })}
      </ul>
    </section>
  );
}
function Stats({ items }) {
  //early return
  if (!items.length) {
    return (
      <foooter className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </foooter>
    );
  }

  const totalItems = items.length;
  const checkedItems = items.filter((item) => item.packed).length;
  /*
  another way
  const checkedItems = totalItems.reduce(
    (acc, item) => (item.packed ? acc + 1 : acc),
    0
  );
  */

  const percentage = totalItems
    ? Math.round((checkedItems / totalItems) * 100)
    : 0;
  // const percentage = totalItems
  //   ? ((checkedItems / totalItems) * 100).toFixed(2)
  //   : 0;

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `Hurray everthing is packed lets go 🏄`
          : `You have ${totalItems} items on your list, and you already packed ${" "}
        ${checkedItems}
        (${`${percentage}%`})`}
      </em>
    </footer>
  );
}
