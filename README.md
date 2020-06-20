# Headbands

> Video streaming app based on the popular character guessing game

<!-- Badges -->

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Headbands is a really popular game you've probably played at work parties. You know where everyone writes a famous name on a sticky note, and puts it on someone else's head? Then they have to ask questions to figure out who they are? [Sort of like this (although hopefully your workplace was less offensive.)](https://www.youtube.com/watch?v=ePbipufCPYw) Unfortunately tons of people are working from home now, so we made this so you can play with eachother online and get some face time that isn't meeting-related.

You can play with up to five players, either playing the guesser one at a time or all at once while taking turns to ask questions. Questions should preferably have yes or no answers but we don't enforce that so you're free to go rogue.

## Table of contents

- [Usage](#usage)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing and running](#installing-and-running)
- [Built with](#built-with)
- [Contributing](#contributing)
- [Meta](#meta)
- [Known issues / bugs](#known-issues-/-bugs)
- [Feature roadmap](#feature-roadmap)
  - [In the works](#in-the-works)
  - [Planned](#planned)
- [Acknowledgements](#acknowledgements)

## Usage

Navigate to the ["How-to-Play"](www.headbands.com/about#how-to-play) section for instructions.

### Demo:

![Demo](https://github.com/jlangy/headbands/blob/development/docs/demo.gif?raw=true)

The above gif demonstrates our basic app flow. For more screenshots and other documentation, navigate to the /docs directory from the root of this repo.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

If you don't have Nodejs and npm installed, install them from [here.](https://nodejs.org/en/)

### Installing and Running

Clone this repository to your local machine and then create a .env following the .env.example file

#### Install Dependencies

In the root directory:

```sh
npm i
```

### Available Root Commands

#### Compile and minify for production

```sh
npm run build
```

#### Start the compiled JS server

```sh
npm run start
```

#### Start front end dev server

```sh
npm run start-react
```

## Built with

- [React](https://reactjs.org/) - Front-end framework
- [Redux](https://redux.js.org) - State management
- [styled-components](https://styled-components.com) - Modular, easy-to-navigate styling for React components
- [NodeJS](https://nodejs.org/en) - JS runtime
- [Express](https://expressjs.com) - Framework used for API in Node
- [socket.io](https://socket.io) - Real time server-signalling
- [WebRTC](https://webrtc.org/) - Peer-to-peer real time communication standard
- [Twilio](https://twilio.com) - STUN and TURN servers for WebRTC connections

## Contributing

1. Fork it (<https://github.com/jlangy/headbands/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`) or issue branch (`git checkout -b issue/brokenThing`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new PR and follow the appropriate template

## Meta

Jon Langlois - [jlangy](https://github.com/jlangy) - jonathan-langlois@live.ca

Bryce McMath – [bryce-mcmath](https://github.com/bryce-mcmath) – bryce.j.mcmath@gmail.com

## Known issues / bugs

- Bugs? What bugs?

_To add an issue, start a new one [here.](https://github.com/jlangy/headbands/issues)_

## Feature roadmap

### In the works

-

### Planned

-

_If you'd like to add a feature yourself, please see the [Contributing](#contributing) guidelines._

## Acknowledgements
