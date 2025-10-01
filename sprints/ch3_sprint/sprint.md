# **Project Overview**

## **Application Vision/Goal:**

Our application is a simple, collaborative vector art program. It will allow for the creation and manipulation of digital art and images on a canvas that multiple users can collaborate on at once. 

## **Scope:**

- Creating projects.
- Importing/exporting image files.
- Layers.
- Drawing and editing with a modular set of tools.

## **Deliverables:**

- A finished application with full support for creating and exporting images, and collaborating in real time with others. 
- A complete set of tools and features.
    - "Complete" is subjective, minimum goal is the basics needed for simple digital art.
    - If time allows, can experiment with more complex tools or features later; project will be designed such that implementing new features should not affect the core functionality.

## **Success Criteria:**
The sprints built-in to the class will probably serve best for goal-setting. We will likely meet a minimum of once for each sprint, with additional meetings organized if there are concerns that need to be addressed or work that needs to be completed together. For each sprint, we will clearly delegate tasks such that each team member knows what they need to do, when they need to finish it by, and can complete that work independently.

The design of the project should be such that the core functionality of the application (as in, the way it manages data and users) is seperate from the actual art tools and features that are built on top of it. Therefore, once the core functionality is complete, completing the program comes down to creating as many tools and features as necessary. Minimally, the list of tools the application should probably support is
- Brush
- Erase
- Fill
- Shape (Rectangle, Oval, etc.)
- Color Select
- Object Select/Transform
This list is obviously subject to change, but since tools are modular we can implement them each seperately and add as many as we want until we are satisfied. Therefore, the goal would be to work on getting the core functionality fully completed by late October/early November, and spend the rest of the time implementing as many features as possible on top of that base. 

## **Assumptions:**
- We are creating a vector art program as opposed to a raster one, since it seems like it would allow for more careful control over the way project data is stored.
- There are libraries that exist to create image files that we can use to implement the export feature.
- We can properly interface with art tools such as drawing pads.

## **Risks:**
- Projects will store drawings as vector data. There are many different approaches we can take on how to define this data, and a misstep can cause problems for basically every aspect of the application.
- Implementing collaboration will require careful control on how project data is accessed and it may be difficult to resolve conflicts between users (ex. multiple users select and transform part of a drawing in different ways at the same time)
    - To some extent, technical issues with collaboration may just exist as limits for users, ie. users will just have to be aware that if they try to edit the same part of the drawing at the same time it may lead to unexpected behavior, since that's not something it makes sense to be doing in the first place. But this should be reduced as much as possible, and that "unexpected behavior" should not be destructive or cause larger issues for the application, just that their edits may not go through properly.

## **Design / Architectural Review:**
Simple frontend/server/database structure, similar to what we've discussed in class so far.
- Projects will be saved on database, when opened are then stored on server and frontend.
- Server and frontend coordinate so that edits appear consistent between all users.
    - Maybe implement disconnect protocol s

## **Test Environment:**
Use of automated testing will be limited, likely exclusively to test data and user management. Testing of the actual application will likely be done informally during programming, since the only way to see if the program is working is to try and make something in it. It may be beneficial to devise more formal standards for testing various features down-the-line.

---

# **Team Setup**

## **Team Members:**
- Brendan Bulger
- Justin Tunney
- Theo Fahey

## **Team Roles:**
[Define roles for each team member, such as developer, designer, project manager, QA tester, etc.]

## **Team Norms:**
As of right now, we have a group chat for informal or urgent communications (setting meeting times, etc.) and a Discord server for formal meetings and organizing resources. 

## **Application Stack:**
[List all the technologies being used in the project, including programming languages, frameworks, and tools.]
- Node.js
- React
- 

### **Libraries/Frameworks:**
[List any specific libraries or frameworks your application will use, such as React, Flask, Django, etc.]