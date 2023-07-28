export default function Item({ item, removeItem, toggleItem }) {
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
