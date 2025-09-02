import React, { useState, useEffect, Fragment } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";

function TrailerMovies({ moviesTitle }) {
    const [videoURL, setVideoURL] = useState("https://youtu.be/sa9l-dTv9Gk");

    function handleSearch() {
        movieTrailer(moviesTitle || "inception")
            .then((res) => {
                if (res) {
                    setVideoURL(res);
                }
            })
            .catch((err) => console.log("Trailer not found:", err));
    }

    useEffect(() => {
        handleSearch();
    }, [moviesTitle]);

    return (
        <Fragment>
            <div className="container"></div>
            <div className="player">
                <ReactPlayer url={videoURL} controls={true} />
            </div>
        </Fragment>
    );
}

export default TrailerMovies;
