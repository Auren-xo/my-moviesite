import React from "react";
import ReactPlayer from "react-player";
import { AiOutlineClose } from "react-icons/ai";
import "../styles/videos.css";

const TrailerPlayer = ({ trailerUrl, onClose }) => {
  if (!trailerUrl) return null;

  return (
    <div className="trailer-wrapper show" onClick={onClose}>
      <div
        className="trailer-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "80vw",
          maxWidth: "900px",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: "40px",
            height: "40px",
            background: "rgba(0,0,0,0.6)",
            border: "none",
            borderRadius: 20,
            padding: 6,
            cursor: "pointer",
            color: "#fff",
            zIndex: 2,
          }}
          aria-label="Close trailer"
        >
          <AiOutlineClose size={20} />
        </button>

        <ReactPlayer
          url={trailerUrl}
          controls
          playing
          width="100%"
          height="480px"
        />
      </div>
    </div>
  );
};

export default TrailerPlayer;
