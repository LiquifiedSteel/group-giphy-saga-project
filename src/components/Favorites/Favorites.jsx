

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

//====== MAIN FUNCTION FOR FAVORITES ======

export default function Favorites(){
   const [refresh, setRefresh] = useState(0);
const favoriteList = useSelector((store) => store.favoriteReducer)
   const dispatch = useDispatch();

   console.log('fave reducer', favoriteList)
   
   //====== USE EFFECT ======
   useEffect(() => {
      dispatch({type: 'FETCH_FAV'})
  }, []);

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

    //====== STYLE FOR DROPDOWN ======

    const DropDownTag = styled.select`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
    width: 150px;
    height: auto;
    padding: 8px;
    margin: 8px;
    border-radius: 4px;
   box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
-webkit-box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
-moz-box-shadow: 10px 10px 5px -5px rgba(0,0,0,0.35);
            `
    //====== STYLE FOR OPTIONS ======

    const CatOption = styled.option`
     width: 150px;
     height: auto;
    `
    //====== SYTLE FOR BUTTONS ======

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
    

//  const removeGif = () => {
//     dispatch({ type: 'DELETE_GIF', payload: favorite.id });
//   };

//====== FAVORITES RENDER ======

 return(
   <Container>
    <h1>Favorite Gifs</h1>

    <div  className="favorites-container row">
      {favoriteList.map((favorite) => (
         <div key={favorite.id} className='favImages col-md-4'>
            <GifImage
         src={favorite.gif} />
           <form 
           //onChange={pickCategory}
           >   
    <Dropdown>

        <DropDownTag value={favorite.category} onChange={(event) => {
         setRefresh(refresh + 1)
         dispatch({type: 'SET_CAT', payload:{id: favorite.id, type: event.target.value}})
         dispatch({type: 'FETCH_FAV'})}}>
            <CatOption value={1}>Wild</CatOption>
            <CatOption value={2}>Uproarious</CatOption>
            <CatOption value={3}>Hilarious</CatOption>
            <CatOption value={4}>Skibidi</CatOption>
            <CatOption value={5}>Whimsical</CatOption>
        </DropDownTag>
      </Dropdown>
        </form>
        <div>
         <Button 
         //onClick={removeGif}
        > Remove Gif</Button>
        </div>
         </div>
      ))} 
    
      </div>
    </Container>
 )   
}
    {/* <input type='checkbox' value='wild' name='category' /> wild
        <input type='checkbox' value='uproarious' name='category' /> uproarious
        <input type='checkbox' value='poignant' name='category' /> poignant
        <input type='checkbox' value='skibidi' name='category' /> skibidi
        <input type='checkbox' value='whimsical' name='category' /> whimsical */}