import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import './video.css'

function Video({ stream, id, game }) {
  useEffect(() => {
    document.getElementById(id).srcObject = stream;
  }, [stream])

  return (
    <div className="video-container">
      <video id={id} autoPlay playsInline></video>
      {game.allPlayersJoined && <input type="text"/>}
    </div>
  )
}

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps, null)(Video);

