import React, { useState } from "react";
import "./controls.css";

function Controls() {
  const [begin, setBegin] = useState(false);
  window.addEventListener("gameReady", () => {
    setBegin(true);
  });

  return (
    <div className="controls-container">
      {begin && <input type="text" placeholder="select name"/>}
      <div className="input-group">
        <input type="text" id="createRoomInput" placeholder="room name" />
        <button id="makeRoom">Create Room</button>
        <input
          type="number"
          name="players-number"
          id="players-number"
          min="1"
          max="5"
          placeholder="select number of players"
        />
        <label htmlFor="players-number">Total Players</label>
      </div>
      <div className="input-group">
        <input type="text" id="roomIdInput" />
        <button id="joinRoom">Join Room</button>
      </div>
    </div>
  );
}

export default Controls;
