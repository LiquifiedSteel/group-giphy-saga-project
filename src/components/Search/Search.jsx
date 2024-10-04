import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

export default function Search(){
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const gifItems = useSelector((store) => store.resultReducer);
    const favs = useSelector(store => store.favoriteReducer);

    const addFav = (gifURL) => {
        console.log(favs[0]);
        dispatch({
            type: "ADD_FAV",
            payload: {URL: gifURL}
        })
        // console.log(gifURL)
    }

    function fetchGifs() {
        console.log(query)
        axios({
            url: '/api/search',
            method: 'POST',
            data: {search: query}
        }).then(response => {
            dispatch({type: "SET_RESULT", payload: response.data.data});
            console.log(response.data.data);
            console.log(favs);
        }).catch( err => {
            console.log(err);
        });
      }
// resultReducer

    useEffect(() => {
        dispatch({type: 'FETCH_FAV'});
        console.log(favs[0]);
    }, [])

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
            {favs.includes({gif: gif.images.original.url}) ? (<button>🩷</button>) : (<button onClick={(event) => addFav(gif.images.original.url)}>🤍</button>)}
       </div>
    ))}
     
      </>  
    );
}