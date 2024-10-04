import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import 'bootstrap/dist/css/bootstrap.min.css';



//====== MAIN FUNCTION FOR SEARCH ======

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

    //====== FETCH GIFS AND POST TO PAGE AFTER SEARCH ======

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

    //====== USE EFFECT ======

    useEffect(() => {
        dispatch({type: 'FETCH_FAV'});
    }, [])

    //====== STYLE FOR IMAGE ======

    const GifImage = styled.img`
    width: 300px;
    height: auto;
    border-radius: 8px;
    margin-bottom: 4px;
 margin-top: 4px;
    box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
    border: solid 1px black;
-webkit-box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
-moz-box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
-webkit-box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
-moz-box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
  }`;


  //====== STYLE FOR BUTTONS ======

  const Button = styled.button`
  background-color: #ff4081;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
-webkit-box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
-moz-box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ff79a9;
  }

  &:active {
    transform: scale(0.95);
  }
`;

//====== STYLE FOR CONTAINER ======

const SearchContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: #f4f4f4;
`;

//====== STYLE FOR INPUT ======

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

//====== STYLE FOR SEARCH BUTTON ======

const SearchButton = styled.button`
padding: 10px 20px;
margin-left: 10px;
background-color: #3f51b5;
color: white;
border: none;
border-radius: 5px;
font-size: 16px;
cursor: pointer;
box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
-webkit-box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
-moz-box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
transition: background-color 0.2s;

&:hover {
  background-color: #6573c3;
}

&:active {
  background-color: #2c387e;
}
`;

    //====== SEARCH RENDER ======

    return (
        <>
        <div>
            <form onSubmit={fetchGifs}>
                <input type='text' value={query} onChange={() => setQuery(event.target.value)} placeholder='Search' />
                <SearchButton type="submit" >Enter</SearchButton>
            </form>
        </div>
        <div className="row">

        {gifItems.map(gif => {
            let display = false;
            return (<div key={gif.id} className="col-md-4">
            <GifImage src={gif.images.original.url} />
            {favs.map(fav => {
                if (fav.gif === gif.images.original.url) {
                    display = true
                }
            })}
            {display ? <Button>🩷</Button> : <Button onClick={(event) => addFav(gif.images.original.url)}>🤍</Button>}
        </div>)
        })}
        </div>
      </>  
    );

}