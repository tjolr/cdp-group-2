# Kegeland
**Table of Contents**
* [User Guide](#user-guide)
  * [Login and Registration](#login-and-registration)
  * [Main Menu](#main-menu)
  * [Games](#games)
  * [Game Session](#game-session)
* [Contributing](#contributing)
  * [Commits](#commits)
  * [Merge Strategy](#merge-strategy)
  * [Code Review](#code-review)

## User Guide

The following user guide provides a brief description of how to log in and register in the app, play a game and play a session.

### Login and Registration

At the opening of the app, a welcome screen (Figure 1) is showed to the user. When the user press the `Get started` button, the login page is showed (Figure 2).

If the user already has an account, they can log in by inserting their email and password and pressing `Sign in`, otherwise they have to press `Sign up` and create an account.

<img alt="Welcome screen" src="https://github.com/tjolr/cdp-group-2/blob/readme/screenshots/welcome.PNG?raw=true" width="200"> <img src="https://github.com/tjolr/cdp-group-2/blob/readme/screenshots/signin.PNG?raw=true" width="200">

Figure 1: Welcome screen Figure 2: Sign in screen

To proceed with the registration, the user has to insert their first name, last name, email and password and press `Sign up` (Figure 3).
The password has the following constraints:

- At least one uppercase character
- At least one lowercase character
- At least one number, but not in the first position
- At least 8 character

Afterwards, the app requests the user to fill in a registration questionnaire (Figure 4). The user must answer all the questions and then press the `Confirm` button.

<img src="https://github.com/tjolr/cdp-group-2/blob/readme/screenshots/register.PNG?raw=true" width="200"> <img src="https://github.com/tjolr/cdp-group-2/blob/readme/screenshots/acs.PNG?raw=true" width="200">

Figure 3: Sign up screen  Figure 4: Registration ACS questionnaire

### Main Menu

After login or registration, the app shows the Main Menu Screen (Figrue 5). From this screen the user can choose to start a single game with the options one control or multiple control, or start a game session.

<img src="https://github.com/tjolr/cdp-group-2/blob/readme/screenshots/home.PNG?raw=true" width="200">

Figure 5: Main menu screen

### Games

The games are a type of running game where the character has to move to avoid obstacles.
When it avoids an obstacle it gains one point and when it hits an obstacle it loses a life. The starting lives are 3 and the game ends when all lives are lost. Lives and points are showed on the top of the screen.

The speed of the game, showed as well on the top of the screen, can be changed from 1 up to 5 to increase the difficulty of the game.

The one control game (Figure 6) only has the possibility to move the character up by pressing on the whole screen (or pressing with the muscles if the sensor is connected) and move the character down by releasing. All the obstacles in this game are in the lower part of the screen.

In the multiple control game (Figure 7) there are three kind of obstacles: upper obstacles, lower obstacles and full screen obstacles. The character is positioned in the center of the screen and can be moved up by pressing the left-upper part of the screen (or compressing the higher muscles if the sensor is connected) or moved down by pressing the left-lower part of the screen (or compressing the lower muscles). The character returns to the starting position in the middle when releasing. To avoid the full screen obstacles, it is necessary to activate a shield and this can be done by pressing the right part of the screen (or compressing higher and lower muscles), the shield is removed when releasing.

<img src="https://github.com/tjolr/cdp-group-2/blob/readme/screenshots/onegame.jpg?raw=true" width="200"> <img src="https://github.com/tjolr/cdp-group-2/blob/readme/screenshots/multiplegame.jpg?raw=true" width="200">

Figure 6: One Control game  Figure 7: Multiple Control game

### Game Session

A game session is an exercise that consists of multiple games and questionnaires. In particular, the user has to fill in a Self Assessment questionnaire (Figure 8 and 9) at the beginning and at the end of the session, and a SAM questionnaire (Figure 10) before and after each game. The number of games inside a session can change.

An example of the game session workflow with 3 games is:

1. Self Assessment 1 questionnaire
2. SAM questionnaire
3. Game 1: One control
4. SAM questionnaire
5. Game 2: Multiple control
6. SAM questionnaire
7. Game 3: One control
8. SAM questionnaire
9. Self Assessment 2 questionnaire

<img src="https://github.com/tjolr/cdp-group-2/blob/readme/screenshots/selfass1.PNG?raw=true" width="200"> <img src="https://github.com/tjolr/cdp-group-2/blob/readme/screenshots/selfass2.PNG?raw=true" width="200"> <img src="https://github.com/tjolr/cdp-group-2/blob/readme/screenshots/sam.PNG?raw=true" width="200">

Figure 8: Self Assesment 1  Figure 9: Self Assesment 2 Figure 10: SAM questionnaire


## Contributing

### Commits

Features: feat-#321: `Message in imperative`
Example: feat-#123: `Add homescreen`

Bug: fix-#999: `Message in imperative`
Example: fix-#665: `Fix login issue`

Chore: chore-#999: `Message in imperative`
Example: chore-#665: `Update React navigation from 8 to 9`

### Merge Strategy

Rebase with squash. One PR per task.

### Code Review

Add reviewers that are working with the related PR.
Come with suggestions, constructive feedback and ask questions when you don't understand.
