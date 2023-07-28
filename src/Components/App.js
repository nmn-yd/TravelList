import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function addItem(item) {
    setItems((items) => [...items, item]);
  }

  function removeItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function clearList() {
    if (items.length > 0) {
      const confirmed = window.confirm(
        "Are you sure you want delete all the items?"
      );
      if (confirmed) setItems([]);
    }
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
        clearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}
