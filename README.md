# Virtual Environment
## CS 445 Final Project
### Fall 2025

### Team: Virutal Environment
- Brendan Bulger
- Justin Tunney
- Theo Fahey

## Getting Started

The goal of this project is to create a collaborative, simple art program for users to create art with one another. The basic outline of the website will have an authentication system, featuring a login/signup page, a homepage where a user can create a project or load saved projects, and most importantly, the actual art dashboard where a user will be able to use multiple tools to edit a pixel art canvas. Ideally this user would be able to collaborate with other artists to work on the same project at the same time. Then, this user would be able to save the artwork to a mongodb database if they wanted to work on and access it later. 

### Roadmap
  <<
A list of features, function or non-functional, you would like to add in the future if you had time, i.e. Phase 2 stuff
- Add ability to download/export images as jpgs or pdfs
- Friend System
- Chatbox for users to communicate with each other
- Real time rendering, i.e. a user sees their edits as it is rendering. 
- Ability to edit project names
  >>
  
## SRS
https://docs.google.com/document/d/17a48Ve1xbLOr_g78OuTWj0fUKyWFHqJ2wLD4Xs0IKd8/edit?usp=sharing  

### Prerequisites
* [Docker](https://www.docker.com/)

### Installing
<<
Simply run "docker compose up", a local mongodb database will be hosted as well as the app itself, you should see a series of outputs from docker relating to a database as well as messages expressing successful connection to said database.
Simply open localhost:3000 and you will see the website
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

## License
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgments
* Hat tip to Professor Moore, and https://www.youtube.com/watch?v=ICMnoKxlYYg for guidance with building the project. 
