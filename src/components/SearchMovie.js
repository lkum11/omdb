import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import * as action from '../store/action';
import Card from '../ui/Card';
import Loader from '../ui/Loader';
import NotFound from '../ui/NotFound';
import Header from '../ui/Header';
import colors from '../constants/colors';

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
`;

const HeaderContainerStyle = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding-right: 1.2em;
    padding-left: 1.2em;
    background-color: ${colors.tertiary};
`;
const SearchContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 0;
    margin: 1em 4em;
`;

const InputStyle = styled.input`
    font-size: 1.6em;
    height: 2.5em;
    padding-left: 1em;
    padding-right: 5em;
    border: 0px;
    border-radius: 1em;
    transition: border 2s;
    
    &:hover{
        border: 0px;
    }
    &:focus{
        outline: -webkit-focus-ring-color auto 0px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const ButtonStyle = styled.button`
    padding: 1em 2em;
    margin: 2em;
    color: #fff;
    background-color: ${colors.tertiary};
    font-weight: bold;
    border: 2px solid ${colors.tertiary}; 
    border-radius: 1em;
    cursor: pointer;

    &:hover{
        opacity: 0.9;
    }
    &:focus{
        outline: -webkit-focus-ring-color auto 0px;
    }
`;

const DisabledButtonStyle = styled.p`
    padding: 1em 2em;
    margin: 2em;
    color: ${colors.tertiary};
    font-weight: bold;
    border: 2px solid ${colors.tertiary}; 
    border-radius: 1em;
    cursor: not-allowed;
`;

const SET_MOVIE_DETAIL = 'SET_MOVIE_DETAIL';

const movieStateReducer = (state, action) => {
    switch(action.type){
        case SET_MOVIE_DETAIL: 
                let setMovieData;
                if(action.input === "title"){
                    setMovieData= {
                        ...state.movieDetailState,
                        newTitle: true,
                        page:1,
                        [action.input]:action.value
                    }
                } else {
                    setMovieData= {
                        ...state.movieDetailState,
                        newTitle: false,
                        [action.input]:action.value
                    }
                }
                return {
                    movieDetailState: setMovieData
                };
        default:
            return state;
    }
}

const SearchMovie = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isError, setIsError] = useState(false);
    const [ showTranstion, setShowTranstion] = useState(false);
    
    const movieList = useSelector(state => state.reducer.movieList);
    const totalResults = useSelector(state => state.reducer.totalResults);

    const dispatch = useDispatch();

    const [movieState, dispatchMovieState] = useReducer(movieStateReducer, {
        movieDetailState : {
                title: "",
                newTitle: false,
                page: 1,
                year: null
            }
        }
    );

    useEffect(() => {
        if(movieList.length > 0){
            setShowTranstion(true);
        }else{
            setShowTranstion(false);
        }
    },[movieList]);

    const inputHandler = debounce((text,id) => {
        dispatchMovieState({
            type: SET_MOVIE_DETAIL,
            input: id,
            value: text === "" ? null : text
        })
    },1000);

    const updatePageHandler = (type) => {
        dispatchMovieState({
            type: SET_MOVIE_DETAIL,
            input: "page",
            value: (type === "next") ? movieState.movieDetailState.page+1 : movieState.movieDetailState.page-1
        })
    };

    useEffect(() => {
        async function getMovieListEffectHandler() {
            try {
                setIsError(false);
                setIsLoading(true);
                await dispatch(action.getMovieList(movieState.movieDetailState.title, movieState.movieDetailState.year, movieState.movieDetailState.page)).then(() => {
                    setIsLoading(false);
                });
            } catch (err) { 
                setIsError(true);
                setIsLoading(false);
            }
        }
        getMovieListEffectHandler();
    },[movieState.movieDetailState, dispatch])

    return (
      <div>
        <HeaderContainerStyle>
            <Header />
           <SearchContainer>
                <InputStyle 
                    type="text" 
                    placeholder="Title"
                    onChange={e => inputHandler(e.target.value,"title")}
                />
                <FontAwesomeIcon 
                    icon={faSearch} 
                    className="icon" 
                    color={colors.primary}
                />
           </SearchContainer>
           <SearchContainer>
                <InputStyle 
                    type="number" 
                    placeholder="Year"
                    onChange={e => inputHandler(e.target.value,"year")}
                />
           </SearchContainer>
        </HeaderContainerStyle>
        {(isError && movieState.movieDetailState.title !== "")
            ? <CardContainer><NotFound /></CardContainer>
            : <CSSTransition
                    in={showTranstion}
                    timeout={3000}
                    classNames="alert"
                    unmountOnExit
                >
                    <CardContainer>
                        {(movieList.length > 0 && !isError) && 
                            movieList.map((movie) => 
                                <Card 
                                    key={movie.imdbID} 
                                    title={movie.Title} 
                                    poster={movie.Poster}
                                    year={movie.Year}
                                    rating={movie.imdbRating}
                                />
                            )}
                    </CardContainer>
                </CSSTransition>
        }
        {isLoading && <Loader/>}
        {(movieState.movieDetailState.title !== "" && !isError) && 
            <ButtonContainer>
                {(movieState.movieDetailState.page === 1) 
                    ? <DisabledButtonStyle disabled> PREV </DisabledButtonStyle>
                    : <ButtonStyle onClick={updatePageHandler.bind(this,"prev")}> PREV </ButtonStyle>}
                {(+totalResults === +movieList.length) 
                    ? <DisabledButtonStyle disabled> NEXT </DisabledButtonStyle>
                    : <ButtonStyle onClick={updatePageHandler.bind(this,"next")}> NEXT </ButtonStyle>}
            </ButtonContainer>
        }
      </div>
    );
  }
  
export default SearchMovie;
  