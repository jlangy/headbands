import React from 'react';
import './App.css';
import Video from './components/Video'
import Controls from './components/Controls'

function App() {
  return (
    <div className="App">
      <main>
        <h1>Headbandz with a z because it's cooler</h1>
        <div className="videos-container">
          <Video id="local"/>
          <Video id="remote"/>
        </div>
        <Controls />

      </main>
    </div>
  );
}

export default App;
