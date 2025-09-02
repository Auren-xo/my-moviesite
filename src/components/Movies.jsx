import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { SiAxios } from 'react-icons/si'
import { AiFillPlayCircle, AiOutlineClose} from "react-icons/ai"
import {container} from './NavBar'
import '../styles/videos.css'
import NoImg from './NoImage.jpg'
import { queries } from '@testing-library/react';
import TrailerMovies from '../Trailers/TrailerMovies';

function Movies() {
    const {toggle, inputValue} = useContext(container)
    const input = inputValue
    const [moviesData, setMoviesData]= useState([])
    const [trailer, setTrailer] = useState(true )
    const [moviesTitle, setMoviesTitle] = useState('')
    const shown = input ? 'search' : 'discover'
    const Api = `https://api.themoviedb.org/3/${shown}/movie`
    const Images = 'https://image.tmdb.org/t/p/w500'

    const MovieCall = async () => {
        const data = await axios.get(Api,{
            params: {
                api_key: '77f876d7cdee43f24835c3b9cdf053d8',
                query: input
            }
        })
        const results = data.data.results
        setMoviesData(results)
    }
    useEffect(() => {
        setTimeout(() => {
        MovieCall( )
        }, 1000)
    }, [input])
    const MoviesTitle = (movie) => {
        setMoviesTitle(movie.title)
        setTrailer(!trailer)
    }
    return (
        <Fragment>
            <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
            <div className="movies-container">        
        {moviesData.map((movie) => {
            return(
                <Fragment>
                <div id={trailer ? 'container' : 'NoContainer'}>
                    <AiFillPlayCircle color='white' fontSize={40} id={trailer ? "playIcon" : 'hide'} onClick={() => MoviesTitle(movie)}/>
                    <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg} alt='' onClick={() => MoviesTitle(movie)}/>
                    <h3 id={movie.title.length > 28 ? 'smaller-Text' : ''}className={toggle ? 'mainColor' : 'secondaryColor'}>{movie.title}</h3>

                </div>
            </Fragment>
            )
        })}

         {trailer ? console.log : <TrailerMovies moviesTitle={moviesTitle}/>} 
        <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={56} color='white' cursor={'pointer'} onClick={() => setTrailer(true)}/>
        </div>
        </div>
        </Fragment>
    )
}

export default Movies