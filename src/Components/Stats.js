export default function Stats({ items }) {
  //early return
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
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
