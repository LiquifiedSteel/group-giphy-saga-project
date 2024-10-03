

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Favorites(){

   const dispatch = useDispatch();

   console.log('favorites')
   useEffect(() => {
      dispatch({type: 'FETCH_FAV'})
  }, []);

 return(
   <>
    <h1>Hello hehe</h1>
   {/* {gifFavorites.map}
    <div className="favorites-container">


    </div> */}
    </>
 )   
}