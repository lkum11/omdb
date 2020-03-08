import axios from 'axios';

export const GET_MOVIE_DETAIL = "GET_MOVIE_DETAIL";
export const SET_MOVIE_RATING = "SET_MOVIE_RATING";

export const  getMovieList = (movieTitle,year,page) => {
    return async (dispatch) => {
        try {
            await axios.get(`http://www.omdbapi.com/?s=${movieTitle}&y=${year}&page=${page}&apikey=74ec2bc`
                ).then((response) => {
                    let movieList = [];
                    for( let i=0; i< response.data.Search.length; i++){
                        axios.get(`http://www.omdbapi.com/?i=${response.data.Search[i].imdbID}&apikey=74ec2bc`).then((res) => {
                            let temp = {
                                Title: response.data.Search[i].Title,
                                Year: response.data.Search[i].Year,
                                imdbID: response.data.Search[i].imdbID,
                                Poster: response.data.Search[i].Poster === "N/A" ? "https://upload.wikimedia.org/wikipedia/commons/2/26/512pxIcon-sunset_photo_not_found.png" : response.data.Search[i].Poster,
                                imdbRating: res.data.imdbRating
                            }
                            movieList.push(temp);
                            if(movieList.length === response.data.Search.length){
                                dispatch({
                                    type: GET_MOVIE_DETAIL, movieList: movieList, totalResults: response.data.totalResults
                                });
                            }
                        });
                    }
            }).catch(error => {
                const { response } = error;
                throw new Error(response.status);
            });

        } catch (err) {
            throw err;
        }
     }
}

// export const  getMovieList = (movieTitle,page,prevMovieList) => {
//     return async (dispatch) => {
//         try {
//         await axios.get(`http://www.omdbapi.com/?s=${movieTitle}&page=${page}&apikey=74ec2bc`
//             ).then((response) => {
//                 let movieList = [];
//                 for( let i=0; i< response.data.Search.length; i++){
//                     axios.get(`http://www.omdbapi.com/?i=${response.data.Search[i].imdbID}&apikey=74ec2bc`).then((res) => {
//                         let temp = {
//                             Title: response.data.Search[i].Title,
//                             Year: response.data.Search[i].Year,
//                             imdbID: response.data.Search[i].imdbID,
//                             Poster: response.data.Search[i].Poster === "N/A" ? "https://upload.wikimedia.org/wikipedia/commons/2/26/512pxIcon-sunset_photo_not_found.png" : response.data.Search[i].Poster,
//                             imdbRating: res.data.imdbRating
//                         }
//                         movieList.push(temp);
//                         if(movieList.length === response.data.Search.length){
//                             if(prevMovieList.length !== 0){
//                                 dispatch({
//                                     type: GET_MOVIE_DETAIL, movieList: [...prevMovieList,...movieList], totalResults: response.data.totalResults
//                                 });
//                             }
//                             else{
//                                 dispatch({
//                                     type: GET_MOVIE_DETAIL, movieList: movieList, totalResults: response.data.totalResults
//                                 });
//                             }
//                         }
//                     });
//                 }
//             }).catch(error => {
//                 const { response } = error;
//                 throw new Error(response.status);
//             });

//         } catch (err) {
//             throw err;
//         }
//      }
// }