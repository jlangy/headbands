import React from 'react';
import './controls.css'

function Controls() {
  return (
    <div className='controls-container'>
      <div className="input-group">
        <input type="text" id="createRoomInput" placeholder="room name" />
        <button id="makeRoom">Create Room</button>
      </div>
      <div className="input-group">
        <input type="text" id="roomIdInput" />
        <button id="joinRoom">Join Room</button>
      </div>
    </div>
  )
}

export default Controls;
