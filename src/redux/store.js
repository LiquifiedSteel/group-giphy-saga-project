//======== IMPORTS FOR STORE ======== 

import { createStore, combineReducers, applyMiddleware } from "redux";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

//======== SAGA YIELD FOR ADDING CATA || MAYBE DO THIS LATER ======== 
//   yield takeEvery("ADD_CATA", addCatagoriesSaga);

//======== MAIN SAGA ROOT =========
function* rootSaga() {
  yield takeEvery("FETCH_CATA", fetchCatagoriesSaga);
  yield takeEvery("FETCH_FAV", fetchFavoritesSaga);
  yield takeEvery("ADD_FAV", addFavoritesSaga);
  yield takeEvery("SET_CAT", addCatagoriesSaga)
  //yield takeEvery('DELETE_GIF', deleteGifSaga);
}

//========  SET UP CATAGORIES ======== 
function* fetchCatagoriesSaga(action) {
  try {
    const response = yield axios.get("/api/catagories");
    yield put({ type: "SET_CATA", payload: response.data });
  } catch (err) {
    console.error(err);
  }
}
//========  DELETE GIF ======== 
// function* deleteGifSaga(action) {
//   try {
//     const response = yield axios.delete(`/api/favorites${action.payload}`);
//     yield put({ type: 'FETCH_FAV' });
//   } catch (error) {
//     console.log(`Error in DELTE saga`, error);
//   }
// }

//======== ADD TO CATAGORIES ======== 
function* addCatagoriesSaga(action) {
  try {
    console.log(action.payload);
    yield axios.put(`/api/favorites/${action.payload.id}/${Number(action.payload.type)}`);
    // yield put({ type: "FETCH_FAV" });
  } catch (err) {
    console.error(err);
  }
}

//======== SET UP FAVORITES ======== 
function* fetchFavoritesSaga(action) {
    try {
      const response = yield axios.get("/api/favorites");
      yield put({ type: "SET_FAV", payload: response.data });
    } catch (err) {
      console.error(err);
    }
  }
  
  // ======== ADD FAVORITES ======== 
  function* addFavoritesSaga(action) {
    try {
      console.log(action.payload);
      yield axios.post("/api/favorites", action.payload);
      yield put({ type: "FETCH_FAV" });
    } catch (err) {
      console.error(err);
    }
  }

  // ======== SETTING UP MIDDLEWARE ======== 
const sagaMiddleware = createSagaMiddleware();

// {{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}
//========  REDUCERS FOR CATA AND FAV ======== 
// {{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}

// ======== CATAGORY REDUCER ======== 
const catagoryReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_CATA":
        return action.payload;
      default:
        return state;
    }
  };

// ======== FAVORITE REDUCER ======== 
const favoriteReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_FAV":
        return action.payload;
      default:
        return state;
    }
  };

// ======== RESULT REDUCER =========
const resultReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_RESULT":
          return action.payload;
        default:
          return state;
    }
}

// ======== STORE CREATOR ======== 
const store = createStore(
  combineReducers({
    catagoryReducer,
    favoriteReducer,
    resultReducer
  }),
  // ---- Logger and sageMiddleware ----
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export default store;