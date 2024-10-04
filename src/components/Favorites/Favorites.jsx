

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Favorites(){
const favoriteList = useSelector((store) => store.favoriteReducer)
   const dispatch = useDispatch();

   console.log('favorites')
   useEffect(() => {
      dispatch({type: 'FETCH_FAV'})
  }, []);
    
  function pickCatergory(event){
    category = event.target.value;
}
 return(
   <>
    <h1>Favorite Gifs</h1>
    <div className="favorites-container">
      {favoriteList.map((favorite) => (
         <img 
         src={favorite.images.original.url} 
         />))}
    </div>
     <p>
        Pick category
      </p>
      <div onChange={pickCatergory}>
        <input type='radio' value='wild' name='category' /> wild
        <input type='radio' value='uproarious' name='category' /> uproarious
        <input type='radio' value='poignant' name='category' /> poignant
        <input type='radio' value='skibidi' name='category' /> skibidi
        <input type='radio' value='whimsical' name='category' /> whimsical
      </div>
    </>
 )   
}
//   ('wild'),
//   ('uproarious'),
//   ('poignant'),
//   ('skibidi'),
//   ('whimsical');