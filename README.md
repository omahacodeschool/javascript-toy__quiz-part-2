# JavaScript - Quiz (Part 2)

## In Brief

Your task in this assignment is to build a quiz game using JavaScript (and HTML), **including XHR**.

The previous version of this assignment tasked you with building a Quiz Game wherein both the game's "brain" (including answers!) as well as the game's front-end (UX) were stored on the client-side (as there was no server-side) of the application. This version is very similar from the front-end perspective, but it moves the game's "brain" to the server-side. The front-end and server "speak" to each other through the request/response cycle, as always; but this time those requests/responses are made/received through JavaScript's XHR objects.

As with the previous version, this assignment is split into two parts. Again, it's meant to be very similar to the previous version--with the modification of using XHR. So expect to be able to use your past work as a reference, but don't copy/paste on cruise control--know what you're copying over and why.

Please start out by creating a PR for this repo, and don't forget to push your code every 30-40 minutes just so we can see how its going.

## More Details

Separating the front-end and server-side of the application requires the use of the request/response cycle, but it would be annoying for the user to sit through repeated page loads for each new question. So you'll be using the XHR object in JavaScript to make requests to the server behind the scenes. Consider this sequence diagram:

![](http://cl.ly/fOab/Screen%20Shot%202016-03-14%20at%207.24.43%20AM.png)

### Server-Side

Based on the diagram above, consider what the server is responsible for in this application: It's entire purpose is to isolate the critical information about the Quiz Game--exposing bits of information about each question through requests/responses. It has absolutely no concern for how the information is going to be displayed--that is, it has no HTML views. Instead, its "views" are merely content-only replies containing the bare minimum information needed by the front-end.

In the **server/** folder included in this project, you'll find a working Sinatra application. This the server-side of the Quiz Game. We've already pre-populated its database with some questions and answers, but the controllers are incomplete. You'll need to write the relevant controller action to fulfill the server's responsibility in each feature.

### Front-End

The exact opposite of the server, the front-end is entirely concerned with the display of information. It does not know anything specific about questions or answers--except that it needs to ask the server for information about them, so it can display that information in some way to the client.

The Front-End consists of a singe HTML page and JavaScript. The HTML page is only ever loaded once by the client. After that, the DOM representing that page is updated by JavaScript based on events triggered by the client.

#### Getting Started & Making Progress

Work methodically through this assignment. Consider writing your own sequence diagrams to help you visualize how a particular feature works its way from one facet of the application to another. The one above was made on <https://www.websequencediagrams.com>, using the following code:

```
title Quiz Game Sequence

Client -> Front-End: Answers Question #1
Front-End -> Server: Submits Question #1 Answer
Server -> Front-End: Response: "correct"
Front-End -> Client: Displays "Nice job!"
Client -> Front-End: Clicks 'Next Question'
Front-End -> Server: Requests Question #2
Server -> Front-End: Response: [Question Text]
Front-End -> Client: Displays Question Text
Front-End -> Server: Requests Answer Set #2
Server -> Front-End: Response: [Answer Set]
Front-End -> Client: Displays Answer Set
note left of Client: + Increments question counter
Client -> Front-End: Answers Question #2
```

As always, commit frequently--and push your code every 30-40 minutes, so we can check in without having to interrupt you directly.

Don't take any creative liberties with this project. Keep it as simple as possible. If a feature is not explicitly required by the instructions, leave it out--or ask if you're unsure. Every minor feature/validation/interaction/etc that you add is an additional burden of maintenance but also an additional channel for bugs to find their way in.

##### Running Two Servers

You will want _at least_ two (I recommend three) tabs open in Terminal while working:

1. A tab for the **server/** folder, where you've run `rackup`
2. A tab for the **front-end/** folder, where you've run `http-server`
3. A tab for project's root folder, which you use for frequently doing `git commit`.

You'll be able to access the server via <http://localhost:9292>, as you always have. And your front-end server will be running on <http://localhost:8080>.

---

## Phase 1

This phase is an _abbreviated take_ on the first version's Phase 1. Instead of building the entire working quiz game using `prompt` and `alert`, this Phase guides you through building the display of **just one question and its answers**.

The goal is to get some practice writing controller actions for the server-side of the application and some JavaScript for the front-end. Don't try to implement everything within this Phase. Just get a single question to show, so that you have a working pattern in your mind for how to get the front-end and server-side talking with each other.

### User Story

1. Your user loads the **index.html** page, which contains a button to begin the game.
2. They are presented with a `prompt()` asking them a multiple choice question.
3. Upon answer, they see an `alert()` telling them whether they answered correctly or incorrectly.

That's all. Just the first question, and then the program ends.

The Sinatra application which this assignment includes already contains **four** questions and their respective answers (including which answer is correct). Check the database schema file to see the table/column structure.

For this Phase, don't worry about putting any content on the page -- we'll worry about DOM manipulation later. Just stick with a single `prompt` to show the question and receive the user's guess, and a single `alert` to tell them if they got the question correct.

---

Build this however you can--don't worry about optimizing, refactoring, best practices, etc. Just think through the steps and implement whatever solution you can come up with.

You should not need a loop at all for this Phase. It should be a fairly straightforward exercise to give you a small amount of practice before moving onto the next Phase.

### Implementation Details

To get you started, consider using the outline below. And remember, don't copy/paste from the first version too eagerly.

The first feature for this small Phase is "clicking the 'begin' button fetches the first question's text (along with its answer set)". Here's how we might diagram that out:

![](http://cl.ly/fP9v/Screen%20Shot%202016-03-14%20at%207.03.59%20AM.png)

Notice that, for this phase, we want to get the question text along with the answer set--because our UX is fairly limited right now (just `prompt` and `alert` instead of the more flexible DOM). The front-end doesn't have that informtion, so it has to ask the server for it. This means we need to write a controller action in the server that handles requests for combined question/answer text.

All this controller action should return is a _minimal_ view that contains barebones text needed by the view. There should not be any HTML in the response at all, because it's the front-end's responsibility to decorate the server's response.

Once you've built that controller action and verified that it works (and done a `git commit`), move to the front-end. You'll need to add an event listener to the 'begin' button so that when the client clicks to begin the game, an XHR object makes a request to the controller action you just created.

If your controller action's route path is `"/combined_question_and_answer/:id"`, and assuming Sinatra is running on its usual port, then your XHR object should make a request to <http://localhost:9292/combined_question_and_answer/1>.

Finally, the `load` event of the XHR object will automatically be triggered when the XHR object receives a response from the server. So you'll attach an event listener for `"load"` onto the XHR object, which contains a block of code that `prompts` the user with the combines question/answer text.

The next step will be to collect the user's input into the `prompt` and make another XHR request to ask the server-side if the answer was correct.

Remember, don't bother adding subsequent questions in this Phase. Just consider this template a "cliffs-notes" guide for building out the rest of the Quiz Game's functionality in Phase 2.

---

## Phase 2

Again, this Phase will be very similar to its corresponding Phase in the first version of the assignment.

This phase of the game will abandon the use of prompts/alerts and instead use HTML elements. You'll use JavaScript to read/interact with those HTML elements (a.k.a. the "DOM").

### Instructions

First, update **index.html** by creating HTML elements that will contain the information that was previously displayed using prompts and alerts.

The **index.html** page should have the following HTML structure. (Note: The structure outlined below is just that--an _outline_. It's not real code. It's meant to serve as an outline for you to write the actual HTML.)

```
- `div#quiz` (This means make a `div` and give it an `id` of `quiz`.)
  - `div#question`
    - Empty for now. We'll use JavaScript to put question text into this.
  - `div#choices`
    - Empty for now. We'll use JavaScript to put question text into this.
  - `input[type=text]#answer` (This means make an `input` tag with attribute `type=text` and an `id` of `answer`.
  - `button#submitter` (This means make a `button` tag with an `id` of `submitter`.)
- `div#question_result`
  - Empty for now. We'll use JavaScript to put each question's result into this.
- `button#next`
  - This will eventually be the button that the user clicks after they see that a question was correct/wrong. It will load up the next question.
- `div#total_result`
  - Empty for now. We'll use JavaScript to put the quiz's final result into this.
```

Now, modify your JavaScript so that when the page loads, the first question's content is added into `div#question`. And do the same thing for the question's choices (into `div#choices`).

One immediate difference between this and Phase 1 is that questions and their answer sets should be sent separately, so that each can be shown in their respective `div` containers in the DOM. In Phase 1, the only UX tools you had were `prompt` and `alert`; but with the addition of the DOM, each piece of information can easily have its own home.

If it makes things easier, you can comment out large portions of **global.js**, as much of that code will be changing and/or be moved around. Or even copy the current contents of your JavaScript file into another file (for reference later) and start **global.js** fresh for this Phase.

Continue to add functionality that uses the elements on the page instead of prompts/alerts to conduct the quiz game:

- The user should type their answer for a question into `input[type=text]#answer`
- They should click `button#submitter` to submit that answer
- Whether they got the question correct/incorrect should be displayed in `div#question_result`
- Clicking `button#next` should replace the question and choices content with the next question. (It should also clear the user's answer to the previous question from the text field.)
- When the game is complete, the final quiz result information should be displayed in `div#total_result`

If you have trouble with this, consider taking a couple steps back and implementing the game with _just one question_ first. Don't worry about the functionality for `button#next` or even for `div#total_result` at all. Often, when a series of steps stumps us, it's best to focus in on just one step and then only zoom back out to the series after we succeed.

---

## Bonuses

This is just a set of extensions that some students might enjoy. They are entirely optional. With the exception of the final bonus, they are identical to the bonusus from the previous version of this assignment.

- The user chooses their answer by selecting from a group of radio buttons instead of typing in their answer value
- Don't let a user move on to the next question until they find the current question's correct answer
- `button#submitter` cannot be clicked (i.e. it's disabled) if no answer has been typed/chosen yet
- Is there any way to reduce the number of requests that need to be made for this application to work? _TIAS_ with a few of your ideas.