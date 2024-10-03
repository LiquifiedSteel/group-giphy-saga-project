import { useEffect } from "react";
import axios from "axios";

export default function Search(){

    useEffect(() => {
        fetchGifs();
    }, []);

    function fetchGifs() {
        axios({
            url: '/api/search',
            method: 'GET',
            data: 'Cow'
        }).then(response => {
          // dispatch({type: "SET_RANDOM", payload: response.data.data});
          console.log(response.data.data);
        }).catch( err => {
          console.log(err);
        });
      }

    return (
        <p>Ignore Me</p>
    )
}