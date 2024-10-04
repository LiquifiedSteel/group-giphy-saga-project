import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

let display = false;

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
        axios({
            url: '/api/search',
            method: 'POST',
            data: {search: query}
        }).then(response => {
            dispatch({type: "SET_RESULT", payload: response.data.data});
        }).catch( err => {
            console.log(err);
        });
      }
// resultReducer

    useEffect(() => {
        dispatch({type: 'FETCH_FAV'});
    }, [])

    const GifImage = styled.img`
    width: 300px;
    height: auto;
    border-radius: 8px;
    padding-bottom: 4px;
    padding-top: 4px;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }`;

  const Button = styled.button`
  background-color: #ff4081;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ff79a9;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SearchContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: #f4f4f4;
`;

const SearchInput = styled.input`
width: 300px;
padding: 10px;
border-radius: 5px;
border: 1px solid #ccc;
font-size: 16px;
transition: border-color 0.2s;

&:focus {
  border-color: #3f51b5;
}
`;

const SearchButton = styled.button`
padding: 10px 20px;
margin-left: 10px;
background-color: #3f51b5;
color: white;
border: none;
border-radius: 5px;
font-size: 16px;
cursor: pointer;
transition: background-color 0.2s;

&:hover {
  background-color: #6573c3;
}

&:active {
  background-color: #2c387e;
}
`;


    return (
        <>
        <SearchContainer>
            <form onSubmit={fetchGifs}>
                <input type='text' value={query} onChange={() => setQuery(event.target.value)} placeholder='Search' />
                <SearchButton type="submit" >Enter</SearchButton>
            </form>
        </SearchContainer>

        {gifItems.map(gif => {
            display = false;
            return (<div key={gif.id}>
            <GifImage src={gif.images.original.url} />
            {favs.map(fav => {
                if (fav.gif === gif.images.original.url) {
                    display = true
                }
            })}
            {display ? <Button>🩷</Button> : <Button onClick={(event) => addFav(gif.images.original.url)}>🤍</Button>}
        </div>)
        })}
      </>  
    );

}