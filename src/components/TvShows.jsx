import React, { useEffect, useContext, useState, Fragment } from 'react'
import { AiFillPlayCircle} from "react-icons/ai"
import { AiOutlineClose} from "react-icons/ai"
import {container} from './NavBar'
import '../styles/videos.css'
import NoImg from './NoImage.jpg'
import axios from 'axios'

function TvShows(){
    const {toggle, inputValue} = useContext(container)
    const [showData, setShowData] = useState([])
    const [trailer, setTrailer] = useState(true)
    const shown = inputValue ? 'search' : 'discover'
    const [moviesTitle, setMoviesTitle] = useState('')
    const [title, setTitle] = useState('')
    const Api = `https://api.themoviedb.org/3/${shown}/tv`
    const Images = 'https://image.tmdb.org/t/p/w500'

    const TvShows = async () => {
        const data = await axios.get(Api, {
            params: {
                api_key: '77f876d7cdee43f24835c3b9cdf053d8',           
            }
        })
        const results = (data.data.results)
        setShowData(results)
    }
         useEffect(() => {
            TvShows()
        },[])
        console.log(showData)
        const TvShowTitle = (shows) => {
            setTitle(shows.name)
            setTrailer(!trailer)

        }
    return (
        <Fragment>
            <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
            <div className="movies-container">
            {showData.map((shows) => {
                return(
                    <Fragment key={shows.id}>
                        <div id ={trailer ? 'container' : 'NoContainer'}>
                            <AiFillPlayCircle color='white' fontSize={40} id={trailer ? "playIcon" : 'hide'}/>
                            <img src={shows.poster_path ? `${Images}${shows.poster_path}` : NoImg} alt=''/>
                            <h3 id ={shows.name.length > 28 ? 'smaller-Text' : ''} className={toggle ? 'mainColor': 'secondaryColor'}>{shows.name}</h3>
                        </div>
                    </Fragment>
                )
            })}
            <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={56} color='white' cursor={'pointer'} onClick={() => setTrailer(true)}/>
            </div>
            </div>
        </Fragment>
    )
}

export default TvShows