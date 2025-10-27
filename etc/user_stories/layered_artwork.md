# Layers

## **User Story**
As a casual artist,
I want to use multiple layers in my project
so that I can more easily organize and structure my art.
---

## **Acceptance Criteria**
- Like other digital art platforms, each project will consist of multiple layers
- These layers will be independent of one another, so that changes in one will not affect the others at all. 
- A user can turn a layer off (and back on again), hiding all the components of that layer
- Layers must have some system of ordering so that one layer get's priority over another (if both layers affect the same pixel)

---

## **Notes**
- Might be challenging to figure out this priority, i.e. might need to conditionally render certain pixels.
- We need to figure out how to store these layers, when a user saves and then loads a project, the layers should be restored. 

