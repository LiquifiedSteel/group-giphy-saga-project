import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

export default function Search(){
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        fetchGifs();
    }, []);

    function fetchGifs() {
        axios({
            url: '/api/search',
            method: 'GET',
            data: {search: query}
        }).then(response => {
            dispatch({type: "SET_RESULT", payload: response.data.data});
            console.log(response.data.data);
        }).catch( err => {
            console.log(err);
        });
      }

    return (
        <div>
            <form onSubmit={fetchGifs}>
                <input type='text' value={query} onChange={() => setQuery(event.target.value)} placeholder='Search' />
                <button type="submit" >Enter</button>
            </form>
        </div>
        
    )
}