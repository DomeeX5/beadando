import Item from "./Item";
import './ItemStyle.css'
import {useState} from "react";


interface ItemInterface {
    item: string,
    category: string
    onRemove: () => void;
}

function Items(props: ItemInterface) {

    const [onToggle, setOnToggle] = useState(true)

    function cancelRemove() {
        setOnToggle(true);
    }

    return (
        <>

            {}
            <li>
                {props.item}
                {onToggle ?
                    <button className="confirmation" onClick={() => setOnToggle(!onToggle)}>🗑️</button> :
                    <div className="confirmation">
                        <button onClick={props.onRemove}>✔️</button>
                        <button onClick={cancelRemove}>❌</button>
                    </div>
                }

        </li>
</>
    )
}

export default Items;