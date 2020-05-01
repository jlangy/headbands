import React, { useEffect } from 'react';
import './video.css'

function Video({ stream, id }) {
  useEffect(() => {
    document.getElementById(id).srcObject = stream;
  }, [stream])

  return (
    <div className="video-container">
      <video id={id} autoPlay playsInline></video>
    </div>
  )
}

export default Video;
