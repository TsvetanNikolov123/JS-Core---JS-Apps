10 Exercise: Routing with Sammy.js and Templating
=================================================

---
---

Lab problem for the [“JavaScript Applications” course \@
SoftUni](https://softuni.bg/courses/javascript-applications).

---

10.01 Team Manager
==================

Create a JS application for managing teams. Use Handlebars for rendering,
Sammy.js for routing and Kinvey as a backend provider. Structure your work so
that it is easy to manage. The example is styled using
[Bootstrap](http://getbootstrap.com/).

App Structure
-------------

-   **Home Page** – show relevant info, depending on the status of the user

-   **Catalog** – a list of all registered teams

-   **About** – dummy page that would hold information about the app

-   **Register User**

-   **Create Team**

-   **Edit Team**

-   **View Team Details** – a detailed page that shows all members of the team
    and management controls

Create a header that is shared across all pages and place links to the relevant
sections in it.

CRUD Operations
---------------

The app must support user registration, login and logout. Store the user
credential in **session storage**. Once logged in, the user is free to browse
all registered teams and **join** or **create** a new team. At any point, the
user is able to **leave** the team he is a member of. The user can only join
**one** team at a time. Also when a user **creates** a team he **automatically**
joins it. He **cannnot** create a team **again** unless he leaves the newly
created team.

Entity Structure
----------------

A team has a **name** and a **comment** that are displayed while browsing. A
user has a **username**. You may create databases and entries as you see fit. A
sample collection structure is as follows:

**teams {**

&nbsp;&nbsp;&nbsp;&nbsp;**name,**

&nbsp;&nbsp;&nbsp;&nbsp;**comment**

**}**

Add a column **teamId** to the default **users** collection, showing which team
they have joined currently. When determining whether a person is the owner of a
team, look at the property **\_acl.creator** of the team record.

### Screenshots

Use this information as a guideline. You may style and structure your solution
differently, so long as the required functionality is present.

Home page when the user is logged in and a header, that is shared across all
pages.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64120416-d0a02e80-cda4-11e9-9824-8dfa16c3fa2f.png" alt="alt text" width="600" height=""></kbd>

User registration form

<kbd><img src="https://user-images.githubusercontent.com/32310938/64120426-d564e280-cda4-11e9-9450-b116e3096dc1.png" alt="alt text" width="600" height=""></kbd>

Login form

<kbd><img src="https://user-images.githubusercontent.com/32310938/64120431-d8f86980-cda4-11e9-95e0-cd6e99ebcbd7.png" alt="alt text" width="600" height=""></kbd>

Home page view for a registered user. Note the header navigation has changed to
reflect that.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64120560-2b398a80-cda5-11e9-9894-ab3e53bddc3c.png" alt="alt text" width="600" height=""></kbd>

Team browser.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64120585-3a203d00-cda5-11e9-8aa7-62520ff8cab4.png" alt="alt text" width="600" height=""></kbd>

Create team and edit team forms are identical.  


<kbd><img src="https://user-images.githubusercontent.com/32310938/64120593-43110e80-cda5-11e9-8ebb-5622dd32c818.png" alt="alt text" width="600" height=""></kbd>

Team details with option to join the team and a list of all current members.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64120610-545a1b00-cda5-11e9-946c-b45458ba0ce6.png" alt="alt text" width="600" height=""></kbd>

Team management. If the user is a member, they can leave the team. If the user
is the creator, they can edit it.

<br/>

### Solution: <a title="01 Team Manager" href="https://github.com/TsvetanNikolov123/JS-Core---JS-Apps/tree/master/10%20Routing%20And%20Architecture%20Exercise/Team%20Manager">01 Team Manager</a>

---
