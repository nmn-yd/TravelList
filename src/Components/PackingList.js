import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  removeItem,
  toggleItem,
  clearList,
}) {
  const [sortBy, setsortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }
  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <section className="list">
      <ul>
        {sortedItems.map((item) => {
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
      <div className="actions">
        <select value={sortBy} onChange={(e) => setsortBy(e.target.value)}>
          <option value="input">Sort by Input Order</option>
          <option value="description">Sort by Description Order</option>
          <option value="packed">Sort by Packed Order</option>
        </select>
        <button onClick={clearList}>Clear List</button>
      </div>
    </section>
  );
}
