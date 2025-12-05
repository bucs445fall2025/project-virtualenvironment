# Sprint Meeting Notes

*note: replace anything surrounded by << >> and **remove** the << >>*

**Attended**: Theo, Brendan, Justin

**DATE**: 11/10/2025

***

## Sprint 9 Review

### SRS Sections Updated

Known Bugs

### User Story

None fully completed, a couple attempted with progress made - save_artwork, user_profile, simple_art

### Sprint Requirements Attempted

No requirements completed, many started on, worked on - Undo/Redo Functionality,Permanent Storage, Export Images,
User Login/Create account

### Completed Requirements

No requirements finished.

### Incomplete Requirements

- Undo/Redo Functionality - Progress made, not all the way there yet
- Permanent Storage - Got DB set up, set up data schema and relevant framework, almost there
- Export Images - Not sure the exact extent of progress made here, follow up with Brendan
- (Note, we didn't mark this as a goal from last sprint - it's more of a sideproduct of setting up Permanent Storage) User Login/Create Account- Some framework and data schema's set up, can successfully create an account with POST requests, front-end/UI and login not set up though. However, we didn't set this as a goal for the last sprint, rather I found that it goes along well with setting up the storage so I thought why not. (Not counting for Flex).

### The summary of the entire project

Currently we have what we had before, with changes to the UI for layer functionality and a button that indicates saving a project(Not Functional at this point in time). 
***

## Sprint 10 Planning

## Requirements Flex

0/5 requirement flexes remaining

## Technical Debt

- Undo/Redo Functionality
- Permanent Storage 
- Export Images

### Requirement Target

-All technical debt requirements
- User Communication (Multiplayer)
- Login/Create Account
- Preview

I think this will give us a good MVP.
### User Stories

Collaborative_host
Collaborative_user
simple_art
user_profile

### Planning

We need to lock in, we will meet up/communicate more frequently as we do have a decently sized plate of work. We will stay in frequent contact over messages. However, we have a nice skeleton for our code so we don't expect anything to be TOO challenging, probably time consuming though. 

### Action Items

- Work out dynamic sized canvas bug, important for our canvas to draw properly
- Allow users to load saved projects
- Establish socket connections in multiplayer between users

### Issues and Risks

- Multiplayer might definitely come with trouble we run into.
- Time crunch is a big factor, will need to lock in. 
-

### Team Work Assignments

Justin - Finish Working on GUI, home page, login sign up screens.
Brendan - Front end logic (drawing logic etc), multiplayer
Theo - Backend Logic, Login, Homepage logic, Multiplayer, Relevant Unit Tests