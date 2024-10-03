import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

export default function Search(){
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const gifItems = useSelector((store) => store.resultReducer);

    function fetchGifs() {
        console.log(query)
        axios({
            url: '/api/search',
            method: 'POST',
            data: {search: query}
        }).then(response => {
            dispatch({type: "SET_RESULT", payload: response.data.data});
            console.log(response.data.data);
        }).catch( err => {
            console.log(err);
        });
      }
// resultReducer
    return (
        <>
        <div>
            <form onSubmit={fetchGifs}>
                <input type='text' value={query} onChange={() => setQuery(event.target.value)} placeholder='Search' />
                <button type="submit" >Enter</button>
            </form>
        </div>

        {gifItems.map(gif => (
        <div key={gif.id}>
            <img src={gif.images.original.url} />
            <button>Butt</button>
       </div>
    ))}
     
      </>  
    );
}