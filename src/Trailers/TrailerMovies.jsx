import React, { useState, useEffect, Fragment } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';

function TrailerMovies({ moviesTitle }) {
  const [videoURL, setVideoURL] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function findTrailer() {
      setNotFound(false);
      setVideoURL('');
      if (!moviesTitle) return;

      try {
        const url = await movieTrailer(moviesTitle, { id: false });
        // movieTrailer returns null if not found
        if (!cancelled) {
          if (url) {
            setVideoURL(url);
            setNotFound(false);
          } else {
            setVideoURL('');
            setNotFound(true);
          }
        }
      } catch (err) {
        console.error('movieTrailer error:', err);
        if (!cancelled) {
          setVideoURL('');
          setNotFound(true);
        }
      }
    }

    findTrailer();

    return () => {
      cancelled = true;
    };
  }, [moviesTitle]);

  return (
    <>
      <div className="container"></div>
      <div className="player">
        {videoURL ? (
          <ReactPlayer url={videoURL} controls width="100%" height="480px" />
        ) : notFound ? (
          <div style={{ color: '#fff', padding: 20 }}>
            <p>Trailer not available.</p>
          </div>
        ) : (
          <div style={{ color: '#fff', padding: 20 }}>
            <p>Searching for trailer...</p>
          </div>
        )}
      </div>
    </>
  );
}

export default TrailerMovies;
