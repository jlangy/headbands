import React from 'react';
import './video.css'

function Video({ id }) {
  return (
    <div className="video-container">
      <video id={id} autoPlay playsInline></video>
    </div>
  )
}

export default Video;
