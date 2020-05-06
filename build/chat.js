function main(){


  const localVideo = document.getElementById('local');
  const remoteVideo = document.getElementById('remote');
  const joinRoomBtn = document.getElementById('joinRoom');
  const makeRoomBtn = document.getElementById('makeRoom');
  const roomName = document.getElementById('createRoomInput');
  const joinRoomInput = document.getElementById('roomIdInput');
  const numPlayersSelect = document.getElementById('players-number'); 



  makeRoomBtn.addEventListener('click', makeRoom)
  joinRoomBtn.addEventListener('click', joinRoom)


}

window.onload = main;