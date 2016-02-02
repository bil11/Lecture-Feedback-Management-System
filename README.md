# Lecture-Feedback-Management-System
Lecture Feedback Management System was developed as a prototype to showcase a working example of a centralized feedback management system for Fachhochschule Kiel. The purpose of this project was to solve two major problems that were being faced by the student community.

1. No proper lecture feedback system where students can give their opinions after every lecture. It was necessary because it can help the professor better understand the response of his students which can help him make his future lectures better.

1. No single platform where a professor can timely convey any important announcement to his students.

In light of the issues mentioned above, we made a hybrid web/mobile app to solve these issues. Main features of this app are

1. After every lecture, a notification is being sent on a student's smart phone, informing him that a lecture feedback is due (only if the student is enrolled in that particular course). Afterwards, he can use the web app or mobile app to give the lecture feedback. Student's identity will remain anonymous. (Note: The notification part is currently disabled in this particular feature).

1. If a professor has an announcement to make, he can do it via the app and corresponding notification will be sent (via Ionic Push Notification Service) to all the respective students, informing them of the update.

##HOW TO RUN THIS APP:

1. Install nodeJS, Cordova and Ionic Frameworks. More info at (ionicframework.com/getting-started).

1. Use "ionic serve" on CLI to view the web version of the app and "ionic emulate android" to test the app on Android Emulator. Alternatively, you can connect an Android phone and can use "ionic run android" to test the app on your android smartphone.

1. Live version of the app can be accessed via the following link: feedback-system.firebaseapp.com

1. Test Student Account: (username: teststudent@student.fh-kiel.de , password: 123456)

1. Test Professor Account: (username: testprofessor@fh-kiel.de , password: 123456)

##TECH STACK

#####Front End:
* ngCordova
* Ionic
* AngularJS

#####Back End:
* Firebase
