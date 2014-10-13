Scrummy
=======

Scrummy is a web app for developers to keep track of what you have been working on. It is designed primarily for mobile so that you can sound confident and intelligent during daily scrums.

It is engineered with AngularJS and Bootstrap, connected to and hosted by Firebase, built with Grunt and love.

Try it out here: https://scrummy.firebaseapp.com.

But don't get too attached! This is a work in progress and your data can be deleted at any time (scary) -- so treat it like a demo for now.

This project demonstrates the following conventions:
* Lean controllers and clean rootScope. Most logic is in services and injected into controllers.
* Use of "controller as" and dot-model syntax for readability and to keep scope inheritance tidy.
* Liberal use of promises for data transactions rather than callbacks.
* Using ui-router instead of ng-route for more robust state management and resolving asynchronous data dependencies.
* Wrapping 3rd party APIs to minimise pain when switching to another provider.
* Wrapping 3rd party controls in directives.
* Using IIFEs to avoid global variables.
* Design conventions suggested by John Papa (https://github.com/johnpapa/angularjs-styleguide), such as putting API methods at the top and implementation details below.
* Organising code by feature so that related files are easy to find.
* Clean code conventions championed by Uncle Bob (http://goo.gl/C6JOJK), such as using small methods to document code rather than comments (which easily become obsolete).
* Automated build with Grunt and package management with node and Bower.

The next step is to re-write it using TDD, now that I'm comfy with Angular.

And yes, I know my CSS sucks. I am currently devouring http://csswizardry.com/ and reading up on SMACSS and BEM. When I am test-driving more features (or a re-write) of Scrummy, I will be using proper CSS guidelines.
