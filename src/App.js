import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleAddList() {
    setItems([]);
  }
  return (
    <div className="app">
      <Header onAddItems={handleAddItems} />
      <List items={items} clearList={handleAddList} />
      <Statistics items={items} />
    </div>
  );
}

function Header({ onAddItems }) {
  const [description, setDescription] = useState("");

  function handlesubmit(e) {
    e.preventDefault();

    if (!description) return;

    const NewItem = {
      description,
      id: Date.now(),
    };

    setDescription("");

    onAddItems(NewItem);
  }

  return (
    <div className="header">
      <h2>THINGS TO DO</h2>
      <form className="search" onSubmit={handlesubmit}>
        <input
          type="search"
          placeholder="Add New"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="add">ADD</button>
      </form>
    </div>
  );
}

function List({ items, clearList }) {
  return (
    <form className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
      <button className="clear" onClick={clearList}>
        CLEAR
      </button>
    </form>
  );
}

function Item({ item }) {
  return (
    <>
      <li className="items-list">
        <input type="checkbox" />
        <span>{item.description}</span>
      </li>
    </>
  );
}

function Statistics({ items }) {
  const NewItems = items.length;
  return (
    <footer className="footer">
      <em>{NewItems} items selected</em>
    </footer>
  );
}
