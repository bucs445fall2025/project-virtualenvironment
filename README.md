# Virtual Environment
## CS 445 Final Project
### Fall 2025

### Team: Virutal Environment
- Brendan Bulger
- Justin Tunney
- Theo Fahey

## Getting Started

The goal of this project is to create a simple art program for users to create art with one another. The basic outline of the website will have an authentication system, featuring a login/signup page, a homepage where a user can create a project or load saved projects, and most importantly, the actual art dashboard where a user will be able to use multiple tools to edit a pixel art canvas.  Then, this user would be able to save the artwork to a mongodb database if they wanted to work on and access it later. 

### Roadmap
  <<
A list of features, function or non-functional, you would like to add in the future if you had time, i.e. Phase 2 stuff
- Multiplayer/Collaborative Drawing Functionality, this was part of our original plan but in order to complete this project in a timely manner, we decided to prioritize the more critical elements.
- Friend System
- Chatbox for users to communicate with each other
- Real time rendering, i.e. a user sees their edits as it is rendering. 
- Ability to edit project names (Minor)
  >>
  
## SRS
https://docs.google.com/document/d/17a48Ve1xbLOr_g78OuTWj0fUKyWFHqJ2wLD4Xs0IKd8/edit?usp=sharing  

### Prerequisites
* [Docker](https://www.docker.com/)

### Installing
<<
Simply run "docker compose up", a local mongodb database will be hosted as well as the app itself, you should see a series of outputs from docker relating to a database as well as messages expressing successful connection to said database.
Simply open localhost:3000 and you will see the website

To run tests, run "node --test" 
>>

## Built With
- Docker
- Node.js
- Express.js
- HTML/CSS
- WebGL (Graphics Library)
- MongoDb
- Mongoose
- Javascript


## Acknowledgments
* Hat tip to Professor Moore, and https://www.youtube.com/watch?v=ICMnoKxlYYg for guidance with building the project. 
