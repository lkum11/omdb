import { GET_MOVIE_DETAIL } from './action';

const initialState = {
    movieList: [],
    totalResults: 0
};

export default ( state= initialState, action) => {
    switch(action.type){
        case GET_MOVIE_DETAIL:
                return {
                    movieList: action.movieList,
                    totalResults: action.totalResults
                };
        default:
            return state;
    }
}