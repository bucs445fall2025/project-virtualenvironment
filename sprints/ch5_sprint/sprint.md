# Sprint Meeting Notes


**Attended**: << record the team members in attendance (virtual counts as long as they are participating) >>

**DATE**: << meeting date >>

***

## Sprint << num >> Review

### SRS Sections Updated

Updated the Software Architecture Diagram, additionally updated Requirements section to include "Canvas Layers"

### User Story

Simple_Art

### Sprint Requirements Attempted

Simple Draw on Canvas Requirement 

### Completed Requirements

Simple Draw on Canvas Requirement 

### Incomplete Requirements

Basic Draw is implemented, in the future more tools must be added. 

### The summary of the entire project

So far we have the website, a canvas - and the ability to draw on this canvas with two tools:
There is a square tool which draws a line of squares as a user drags his mouse, and there is a rectangle tool 
which will draw a rectangle where a user clicks and then releases his mouse. 
Additionally, the canvas can zoom in and out, as well as be dragged back and forth

***

## Sprint 6 Planning

## Requirements Flex

<< # 5/5 requirement flexes remaining

## Technical Debt

None so Far

### Requirement Target

Canvas Layers (We also want to implement a Color Picker which would follow under Simple Draw)

### User Stories

Simple_draw and layered_artwork

### Planning

We will reconvene towards the beginning of the week to work out the minute details together, but we essentially
want to implement a "layer" class which would be contained in the "project_api" class, containing the edits for each layer. These layers would then be combined to form the overall pixel data which will be rendered. Color Picker should be simpler, will store a color variable in the tool class containing a rgb value. We also will present!

### Action Items

- Implement a simple color picker 
- Create Layer Functionality

### Issues and Risks

- Might run into some trouble handling conflicts between layers, i.e. what if two layers paint over one another
- Our current renderer is a little wonky with colors, need to fix that

### Team Work Assignments

- Brendan: Project Manager, will work on fixing the small color rendering bug, as well as help implement the logic for layers
- Justin: Will implement color picker
- Theo: Will write next sprint, and work on layering functionality, and thorougly test. 