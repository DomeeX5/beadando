import React, {useState} from 'react';
import './App.css';
import Items from "./Items";
import Item from "./Item";

function App() {

    const [items, setItems] = useState([
        new Item("Item1", "cat1"),
        new Item("Item2", "cat1"),
        new Item("Item3", "cat1"),
        new Item("Item4", "cat2"),
        new Item("Item5", "cat3")]);

    const [filtered, setFiltered] = useState<Item[]>(items);
    const [page, setPage] = useState(false);
    const [itemValue, setItemValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    const uniqueCategories = items.reduce((acc: string[], currentItem: Item) => {
        if (!acc.includes(currentItem.category)) {
            acc.push(currentItem.category);
        }
        return acc;
    }, []);

    function filterBySearchTerm(term: string) {
        const filteredItems = items.filter(item =>
        item.item.toLowerCase().includes(term.toLowerCase()));
        setFiltered(filteredItems);
    }

    function handleRemove(itemToDelete: Item) {
        const updatedItems = items.filter(it => it !== itemToDelete)
        setItems(updatedItems)
        const updatedFilter = filtered.filter(it => it !== itemToDelete)
        setFiltered(updatedFilter)
    }

    function filterByCategory(category : string) {
        const filteredItems =  items.filter(item => item.category === category)

        setFiltered(filteredItems)
    }

    function handleSubmitNewItem() {
        const newItem = new Item(itemValue, categoryValue);
        if (itemValue.length === 0 || categoryValue.length === 0) {
            setError("Az item és a kategória kitöltése kötelező!")
        } else {
            setItems([...items, newItem]);
            setFiltered([...items, newItem]);
            setPage(false);
            setItemValue('');
            setCategoryValue('');
        }
    }



    return (
        <>

            {page ? (
                <div>
                    <label>Item: </label><input type="text" value={itemValue} onChange={(e) => setItemValue(e.target.value)}/>
                    <label>Category: </label><input type="text" value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)}/>
                    {error ? <p>{error}</p> : <p></p>}
                    <button onClick={() => handleSubmitNewItem()}>Save</button>
                </div>
            ) : (
                <>
                    {uniqueCategories.map((category, i) => (
                        <button key={i} className="categoryButton"
                                onClick={() => filterByCategory(category)}>{category}</button>
                    ))}
                    <button onClick={() => setFiltered(items)}>Reset</button>
                    <button onClick={() => setPage(true)}>New</button>
                    <div>
                        <input
                            type="text"
                            placeholder="Keresés"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                filterBySearchTerm(e.target.value);
                            }}
                        />
                    </div>
                    {filtered.map((item, i) => (
                        <Items item={item.item} key={i} category={item.category} onRemove={() => handleRemove(item)}/>
                    ))}
                </>
            )}
        </>
    )
}

export default App;
