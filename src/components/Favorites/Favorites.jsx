

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

export default function Favorites(){
const favoriteList = useSelector((store) => store.favoriteReducer)
   const dispatch = useDispatch();

   console.log('fave reducer', favoriteList)
   
   useEffect(() => {
      dispatch({type: 'FETCH_FAV'})
  }, []);
    

//  const removeGif = () => {
//     dispatch({ type: 'DELETE_GIF', payload: favorite.id });
//   };
 return(
   <Container>
    <h1>Favorite Gifs</h1>

    <div  className="favorites-container">
      {favoriteList.map((favorite) => (
         <div className='favImages'>
            <img key={favorite.id}
         src={favorite.gif} />
           <form onChange={pickCatergory}>
        <input type='radio' value='wild' name='category' /> wild
        <input type='radio' value='uproarious' name='category' /> uproarious
        <input type='radio' value='poignant' name='category' /> poignant
        <input type='radio' value='skibidi' name='category' /> skibidi
        <input type='radio' value='whimsical' name='category' /> whimsical
        </form>
        <div>
         <button 
         //onClick={removeGif}
        > Remove Gif</button>
        </div>
         </div>
         ))}
         
    
      </div>
    </Container>
 )   
}
//   ('wild'),
//   ('uproarious'),
//   ('poignant'),
//   ('skibidi'),
//   ('whimsical');