import React, { Fragment, useContext, useEffect, useState } from 'react';
import { container } from './NavBar';
import axios from 'axios';
import { AiOutlineClose, AiFillPlayCircle } from 'react-icons/ai';
import NoImg from './NoImage.jpg';
import '../styles/videos.css';

function Trends() {
  const { toggle, inputValue } = useContext(container); // ✅ use NavBar search input
  const [trendArray, setTrendArray] = useState([]);
  const [trendTitle, setTrendTitle] = useState('');
  const [trailer, setTrailer] = useState(true);
  const Images = 'https://image.tmdb.org/t/p/w500';
  const apiKey = '77f876d7cdee43f24835c3b9cdf053d8';

  const fetchTrends = async () => {
    try {
      // ✅ use search if inputValue exists, else trending
      const endpoint = inputValue
        ? `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${inputValue}`
        : `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;

      const { data } = await axios.get(endpoint);
      setTrendArray(data.results || []);
    } catch (error) {
      console.error('Error fetching trends:', error);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, [inputValue]); // ✅ refetch whenever search input changes

  const TrendTitle = (trend) => {
    setTrendTitle(trend.title || trend.name);
    setTrailer(false);
  };

  return (
    <Fragment>
      <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
        <div className="movies-container">
          {trendArray.map((trend, index) => (
            <Fragment key={index}>
              <div id={trailer ? 'container' : 'NoContainer'}>
                <AiFillPlayCircle
                  color="#fff"
                  fontSize={40}
                  id={trailer ? 'playIcon' : 'hide'}
                  onClick={() => TrendTitle(trend)}
                />
                <img
                  src={trend.poster_path ? `${Images}${trend.poster_path}` : NoImg}
                  alt=""
                  onClick={() => TrendTitle(trend)}
                />
                <h3
                  id={trend.title && trend.title.length > 28 ? 'smaller-Text' : ''}
                  className={toggle ? 'mainColor' : 'secondaryColor'}
                >
                  {trend.title || trend.name}
                </h3>
              </div>
            </Fragment>
          ))}
          <AiOutlineClose
            id={trailer ? 'Nothing' : 'Exit1'}
            className={toggle ? 'DarkTheme' : 'LightThemeClose'}
            fontSize={56}
            color="white"
            cursor="pointer"
            onClick={() => setTrailer(true)}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Trends;
