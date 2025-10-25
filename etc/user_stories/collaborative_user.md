# Joining a Collaborative Project

## **User Story**
As a Novice Artist, 
I want to join an art project, and create art collaboratively with my friends
so that I can have a good time. 

---

## **Acceptance Criteria**
- The user should be able to join a host's art project
- In the project itself each user should be able to view the work of others, as well as their changes in real time.
- Additionally, the user should be able to see the other's cursors as they work on the project
- All art tools should work as expected
- Handle all conflicts consistently

---

## **Notes**
- In the future we could implement a chatbox for the users to communicate with each other
- Might be one of the most difficult tasks to implement, need to synchronize edits and such
- Some conflicts with users editing the same area at the same time might arise, but as long as we implement simple consistent logic to handle this might be fine
- Some concerns about "undo" functionality as well, need to think that out more. 
- We need to have separate logic/data for a finished edit (i.e dragging and releasing a mouse to draw) and the data rendered with real time edits.