# SPRINT 1

## Sprint Planning
**Date**: 11/3/2025

**Main Objective**: 
Divide the first user story’s tasks and assign 1 screen to each one.

**Details**:
Start working on the first user story (As a user, I want to be able to smoothly navigate through the game so that I can choose and play each level at will.)
Decided to work on the screen view for the first sprint.
Look over the first user story’s tasks and assign one screen to each. (Anthony - Level Select, Nick - Game Screen, Alexander - Main Menu Screen and Results Screen)

## Stand-Up
**Date**: 11/5/2025

**Main Objective**: 
Show a quick demo of our screens.

**Details**:
Make sure our screen elements (i.e. buttons, text) are dynamically declared so that they adjust to different screen sizes.
Resolve the miscommunication of Nick and Alexander working on the same screen.
Showed a quick demo of the different screens.

## Sprint Review (Retrospective)
**Date**: 11/9/2025

**Main Objective**: 
Merge our individual branches to main, through pull requests, and make sure we can link all screens together.

**Details**:
Merged our branches to main.
Start working on resolving the merging conflicts because gamescreen was used for both the level screen and the level select screen. 
Solution: put all level screens to the screen switcher.
After solving the merge conflict, pull the new main onto local machines and make sure it runs without errors.
Cleaned up details about universal sizing and expandability for level template
Todo before the next meeting, resolve merge conflicts and create "test screens" to navigate to placeholders for levels.
For Monday, work on organizing the level select screen and make sure we can navigate through the different screens.

# SPRINT 2

## Sprint Planning
**Date**: 11/10/2025

**Main Objective**: 
Work on organizing the level select screen and make sure we can navigate through the different screens by resolving the merging conflict.

**Details**:
Solved the merge conflict. Uploaded the requirements and architecture documents. Finalize the navigation user story.
Made sure to user story 1 works on all of our devices. Added tasks in issues in github. 
For this sprint, we will focus on inputHandler class, player class, and enemy class. View should reflect inputted question and user input.
Add animations, make sure theres input validaiton, and do string cleaning.

## StandUp
**Date**: 11/13/2025

**Main Objective**: 
Work on Player, Enemy, and Input Handler Classes.

**Details**: 
Anthony:  Refactored and added extra files and directorys for mvc
Alex: Starting input detection view and validaton as well as enemy class.
NicK: cleaned up refactored game screen view to work with input.
No problems so far, however anticpating large merge conflicts
keeping most stuff in seperate classes to redcue merge conflicts

## Sprint Review
**Date**: 11/16/2025

**Main Objective**: 
Create pull request and solve any merge conflict that might arise for incorporating the Player, Enemy, and Input Handler Classes. 

**Details**: 
Get Gamescreenview.ts in main, so we can work with our model and view classes to work with his visuls as he cleaned up the file a good portion.
Start planning level progression logic, lvel manager, questionmanager, game state. 
Todo: answer checking /input validation'/ cleaning/ sanitzing etc.
Todo: create tests for the player enemy and input valdiaiton.

# SPRINT 3

## Sprint Planning
**Date**: 11/17/2025

**Main Objective**: 
Work on input validation, gameplay, and level manager.

**Details**:
For this week's work, we need:
Nick - Input validation: cleaning and validating text input. 
Alexander - Gameplay: Implementing player and enemy gameplay, including attack, hit, and defeat animations.
Anthony - Level manager: progress level and maintaining program integrity, if player is at half health it should remain at half health.

## StandUp
**Date**: 11/20/2025

**Main Objective**: 
Work on input validation, gameplay, and level manager.

**Details**:
The animations for the player and enemy attack, hit, and defeat are done. A timer was added in order to add some level of difficulty to the game. Working on question manager class. Add an automated enemy attack system that damages the player at regular intervals, along with scoring improvements and level structure refinements.

## Sprint Review
**Date**: 11/23/2025

**Main Objective**: 
Finish input validation, gameplay, and level manager.

**Details**:
Implemented auto-attacks that trigger independently of player input every 10% of total game duration. Added the logic and visual for the player and enemy, including attack animation, hit animation, and defeat animation. Recorded the progress of the user by showing stars in the results screen. Handled user input and input validation, created question bank and answers allowing user to interact with game and having game react to user accordingly.

# SPRINT 4

## Sprint Planning
**Date**: 11/24/2025

**Main Objective**: 
Work on adding testing to the project.

**Details**:
Add CI testing for GameScreen model testing character health values, alive check's, and auto attacks. Add testing on the Character Object.

## StandUp
**Date**: 11/26/2025

**Main Objective**: 
Work on adding testing to the project.

**Details**:
Added testing for ResultsScreen model testing that the number of stars, the final score and the leaderboard display the correct values. Also added testing for the main attacks of the characters by checking health values, alive check's, and attack damage.

## Sprint Review
**Date**: 11/30/2025

**Main Objective**: 


**Details**:

