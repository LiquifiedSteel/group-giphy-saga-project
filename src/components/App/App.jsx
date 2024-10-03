import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Categories from '../Categories/Categories.jsx';
import Favorites from '../Favorites/Favorites.jsx';
import Search from '../Search/Search.jsx';
import NavBar from '../NavBar/NavBar.jsx';



function App() {
  return (
    <Router>
    <div>
      <header>
      <h1>Giphy Search!</h1>
      </header>
      <NavBar />
      <Route path='/' exact>
      <Search />
      </Route>

      <Route path='/favorites' >
      <Favorites />
      </Route>

      <Route path='/catergories' >
      <Categories />
      </Route>
      
        <Route path='/'>
            <h2> Page not found - Check URL path</h2>
          </Route>
    </div>
   
    </Router>
  );
}


export default App;
