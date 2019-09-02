JS Applications Exam - UniEnt SPA
=================================

You are assigned to implement a **Web application** (SPA) using HTML5,
JavaScript, AJAX, REST and JSON with cloud-based backend (Kinvey). Using
libraries like **jQuery**, **Handlebars** and **Sammy** is allowed but is not
obligatory. The app keeps **users** and **events**. **Guests** should be able to
**register** and **login**. Logged-in users should be able to view **all
events**, **create events**, **join events**, see **details** about a **event**
and **logout**. Logged-in users should also be able to **edit** or **delete**
the events **they have created**. There should also be a **section** where users
can **see only the events they have created**.

Create a Kinvey REST Service
----------------------------

Register at **Kinvey.com** and create application to keep your data in the
cloud.

Create a collection called **events.** Each **event** has a **name**, **date**,
**description**, **organizer** and **people interested in** (starting from 0).

<kbd><img src="https://user-images.githubusercontent.com/32310938/64122669-f4ff0980-cdaa-11e9-9bc3-79ccf8362dc4.png" alt="alt text" width="800" height=""></kbd>

In order to be able to keep track of the people interested in an event, you need
to give all users permission **to edit this collection**. So, go to the
**properties** of the collection.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64122691-00eacb80-cdab-11e9-8cba-8ef2b0de7a5a.png" alt="alt text" width="600" height=""></kbd>

Then go to the **permissions** and **edit** them to look like this:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64122713-0e07ba80-cdab-11e9-9ad4-bbeabacbb18e.png" alt="alt text" width="800" height=""></kbd>

Test the Kinvey REST Services
--------------------------------

Using **Postman** or other HTTP client tool (you can use Kinvey's built-in **API
Console**), test the REST service end points:

### User Registration (Sign Up)

| **POST** **`https://baas.kinvey.com/user/app_id/`** |                                                                                                                                                     |
|-------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                             | **Authorization: Basic base64(app_id:app_secret)<br/> Content-Type: application/json**                                                                       |
| **Request body**                                | **{ <br/>&nbsp;&nbsp;&nbsp;&nbsp;"username": "testuser", <br/>&nbsp;&nbsp;&nbsp;&nbsp;"password": "testuserpass890" <br/>}**                                                                                           |
| **Response 201 Created**                        | **{ <br/>&nbsp;&nbsp;&nbsp;&nbsp;"_id": "59930c78a743e20c7d3fca77", <br/>&nbsp;&nbsp;&nbsp;&nbsp;"username": "testuser", <br/>&nbsp;&nbsp;&nbsp;&nbsp;"password": "testuserpass890" <br/>}**                                                        |
| **Error response 409 Conflict**                 | **{ "error": "UserAlreadyExists", "description": "This username is already taken. Please retry your request with a different username", "debug": "" }** |
| **Error response 401 Unauthorized**             | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**            |

The request needs "**Basic**" **authentication.** Use the Kinvey **App Key** and
**App Secret** as credentials.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64124093-c5ea9700-cdae-11e9-94c4-f7247d7dfb32.png" alt="alt text" width="400" height=""></kbd>

### User Login

| **POST** **`https://baas.kinvey.com/user/app_id/login`** |                                                                                                                                                       |
|------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                  | **Authorization: Basic base64(app_id:app_secret) <br/>Content-Type: application/json**                                                                         |
| **Request body**                                     | **{ <br/>&nbsp;&nbsp;&nbsp;"username": "testuser", <br/>&nbsp;&nbsp;&nbsp;"password": "testuserpass890" <br/>}**                                                                                             |
| **Response 200 OK**                                  | **{ <br/>&nbsp;&nbsp;&nbsp;"_id": "59930c78a743e20c7d3fca77",<br/>&nbsp;&nbsp;&nbsp;"username": "testuser"<br/>&nbsp;&nbsp;&nbsp; "_kmd": {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "authtoken":"8e6471bc-3712-4cfb-b92e-50e62a0c80….Duj5fHdM /7XHIe6KdY="<br/>&nbsp;&nbsp;&nbsp;&nbsp; … <br/>&nbsp;&nbsp;&nbsp;&nbsp;},<br/>&nbsp;&nbsp; … <br/>}** |
| **Error response 401 Unauthorized**                  | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**              |

Successful login returns an **authtoken** which is later used to authenticate
the CRUD operations.

### User Logout

| **POST** **`https://baas.kinvey.com/user/app_id/_logout`** |                                                                                                                                          |
|--------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                    | **Authorization: Kinvey authtoken**                                                                                                          |
| **Response 204 No Content**                            |                                                                                                                                          |
| **Error response 401 Unauthorized**                    | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }** |

To logout, you need to provide the **authtoken** given by login/register as
"**Kinvey**" authorization header.

### List All Events

| **GET** **`https://baas.kinvey.com/appdata/app_id/events`** |                                                                                                                                                                                                                                                                                                                          |
|---------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                     | **Authorization: Kinvey authtoken**                                                                                                                                                                                                                                                                                          |
| **Response 200 OK**                                     | **[{ <br/>&nbsp;&nbsp;&nbsp;"name":"Graduation Party", <br/>&nbsp;&nbsp;&nbsp;"dateTime":"1 June - 9 PM",<br/>&nbsp;&nbsp;&nbsp;"description":"Are you parent of...", <br/>&nbsp;&nbsp;&nbsp;"imageURL":"https://....", <br/>&nbsp;&nbsp;&nbsp;"peopeInterestedIn":"0", <br/>&nbsp;&nbsp;&nbsp;"organizer": "peter.georgiev" <br/>&nbsp;&nbsp;&nbsp;"_acl": <br/>&nbsp;&nbsp;&nbsp;{ <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator":"5bfd4674682ae23931b4f91c" <br/>&nbsp;&nbsp;&nbsp;&nbsp;}, <br/>&nbsp;&nbsp;&nbsp;&nbsp;"_kmd": <br/>&nbsp;&nbsp;&nbsp;&nbsp;{ <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"lmt":"2018-11-28T15:25:24.521Z", <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ect":"2018-11-28T14:55:00.958Z" <br/>&nbsp;&nbsp;&nbsp;&nbsp;} <br/>}, …]** |
| **Error response 401 Unauthorized**                     | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**                                                                                                                                                                                 |

### Create Event

| **POST** **`https://baas.kinvey.com/appdata/app_id/events`** |                                                                                                                                                                                                                                                                                                                                                             |
|----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                      | **Authorization: Kinvey authtoken Content-Type: application/json**                                                                                                                                                                                                                                                                                              |
| **Request body**                                         | **{ <br/>&nbsp;&nbsp;&nbsp;"name": "Graduation Party",<br/>&nbsp;&nbsp;&nbsp; "dateTime": "1 June - 9 PM",<br/>&nbsp;&nbsp;&nbsp;"description": "Are you parent of...",<br/>&nbsp;&nbsp;&nbsp; "imageURL": "https://...",<br/>&nbsp;&nbsp;&nbsp; "peopleInterestedIn":0,<br/>&nbsp;&nbsp;&nbsp; "organizer": "peter.georgiev" <br/>}**                                                                                                                                                                        |
| **Response 201 Created**                                 | **{ <br/>&nbsp;&nbsp;&nbsp;"name": "Graduation Party", <br/>&nbsp;&nbsp;&nbsp;"dateTime": "1 June - 9 PM",<br/>&nbsp;&nbsp;&nbsp;"description": "Are you parent of...", <br/>&nbsp;&nbsp;&nbsp;"imageURL": "https://...", <br/>&nbsp;&nbsp;&nbsp;"peopleInterestedIn":0, <br/>&nbsp;&nbsp;&nbsp;"organizer": "peter.georgiev" <br/>&nbsp;&nbsp;&nbsp;"_acl": { <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator": "5bfd4674682ae23931b4f91c" <br/>&nbsp;&nbsp;&nbsp;}, <br/>&nbsp;&nbsp;&nbsp;"_kmd": { <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"lmt": "2018-11-28T15:39:58.801Z", <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ect": "2018-11-28T15:39:58.801Z" }, <br/>&nbsp;&nbsp;&nbsp;"_id": "5bfeb6ce682ae23931bf7d26" <br/>}** |
| **Error response 401 Unauthorized**                      | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**                                                                                                                                                                                                                    |

### Edit Event

| **PUT** **`https://baas.kinvey.com/appdata/app_id/events/event_id`** |                                                                                                                                                                                                                          |
|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                              | **Authorization: Kinvey authtoken <br/>Content-Type: application/json**                                                                                                                                                           |
| **Request body**                                                 | **{ <br/>&nbsp;&nbsp;&nbsp;"name": "Graduation Party", <br/>&nbsp;&nbsp;&nbsp;"dateTime": "9 June - 11 PM", <br/>&nbsp;&nbsp;&nbsp;"description": "Are you parent of...", <br/>&nbsp;&nbsp;&nbsp;"imageURL": "https://...", <br/>&nbsp;&nbsp;&nbsp;"peopleInterestedIn":0, <br/>&nbsp;&nbsp;&nbsp;"organizer": "peter.georgiev" <br/>}**                                    |
| **Response 200 Ok**                                              | **{ <br/>&nbsp;&nbsp;&nbsp;"_id": "59931398996ab5127d2a84d1", <br/>&nbsp;&nbsp;&nbsp;"name": "Graduation Party", <br/>&nbsp;&nbsp;&nbsp;"dateTime": "9 June - 11 PM", <br/>&nbsp;&nbsp;&nbsp;"description": "Are you parent of...", <br/>&nbsp;&nbsp;&nbsp;"imageURL": "https://...", <br/>&nbsp;&nbsp;&nbsp;"peopleInterestedIn":0, <br/>&nbsp;&nbsp;&nbsp;"organizer": "peter.georgiev" <br/>}** |
| **Error response 401 Unauthorized**                              | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**                                                                                 |

### Delete Event

| **DELETE** **`https://baas.kinvey.com/appdata/app_id/events/event_id`** |                                                                                                                                          |
|---------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                                 | **Authorization: Kinvey authtoken**                                                                                                          |
| **Response 200 OK**                                                 | **{ "count": 1 }**                                                                                                                           |
| **Error response 404 Not Found**                                    | **{ "error": "EntityNotFound", "description": "This entity not found in the collection", "debug": "" }**                                     |
| **Error response 401 Unauthorized**                                 | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }** |

### Join Event

| **PUT** **`https://baas.kinvey.com/appdata/app_id/events/event_id`** |                                                                                                                                                                                                                                                                                                                                                               |
|------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                              | **Authorization: Kinvey authtoken <br/>Content-Type: application/json**                                                                                                                                                                                                                                                                                                |
| **Request body**                                                 | **{ <br/>&nbsp;&nbsp;&nbsp;"name": "Graduation Party", <br/>&nbsp;&nbsp;&nbsp;"dateTime": "9 June - 11 PM", <br/>&nbsp;&nbsp;&nbsp;"description": "Are you parent of...", <br/>&nbsp;&nbsp;&nbsp;"imageURL": "https://...", "peopleInterestedIn":1, <br/>&nbsp;&nbsp;&nbsp;"organizer": "peter.georgiev" <br/>}**                                                                                                                                                                         |
| **Response 200 Ok**                                              | **{ <br/>&nbsp;&nbsp;&nbsp;"name": "Graduation Party", <br/>&nbsp;&nbsp;&nbsp;"dateTime": "9 June - 11 PM", <br/>&nbsp;&nbsp;&nbsp;"description": "Are you parent of...", <br/>&nbsp;&nbsp;&nbsp;"imageURL": "https://...", "peopleInterestedIn":1, <br/>&nbsp;&nbsp;&nbsp;"organizer": "peter.georgiev", <br/>&nbsp;&nbsp;&nbsp;"_id": "5bfeb6ce682ae23931bf7d26", <br/>&nbsp;&nbsp;&nbsp;"_acl": { <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator": "5bfd4674682ae23931b4f91c" <br/>&nbsp;&nbsp;&nbsp;}, <br/>&nbsp;&nbsp;&nbsp;"_kmd": { <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"lmt": "2018-11-28T15:45:13.760Z", <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ect": "2018-11-28T15:39:58.801Z" <br/>&nbsp;&nbsp;&nbsp;} <br/>}** |
| **Error response 401 Unauthorized**                              | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**                                                                                                                                                                                                                      |

### My Events

| **GET** **`https://baas.kinvey.com/appdata/app_id/events?query={"_acl.creator":"\${user_id}"}`** |                                                                                                                                                                                                                            |
|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                                                              | **Authorization: Kinvey authtoken**                                                                                                                                                                                                                                                                                          |
| **Response 200 OK**                                                                              | **[{ <br/>&nbsp;&nbsp;&nbsp;"name":"Graduation Party", <br/>&nbsp;&nbsp;&nbsp;"dateTime":"1 June - 9 PM", <br/>&nbsp;&nbsp;&nbsp;"description":"Are you parent of...", <br/>&nbsp;&nbsp;&nbsp;"imageURL":"https://....", <br/>&nbsp;&nbsp;&nbsp;"peopeInterestedIn":"0", <br/>&nbsp;&nbsp;&nbsp;"organizer": "peter.georgiev" <br/>&nbsp;&nbsp;&nbsp;"_acl": { <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator":"5bfd4674682ae23931b4f91c" <br/>&nbsp;&nbsp;&nbsp;},<br/>&nbsp;&nbsp;&nbsp; "_kmd": { <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"lmt":"2018-11-28T15:25:24.521Z", <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ect":"2018-11-28T14:55:00.958Z" <br/>&nbsp;&nbsp;&nbsp;} <br/>}, …]** |
| **Error response 401 Unauthorized**                                                              | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**                                                                                                                                                                                 |

UniEnt - HTML and CSS
----------------------

You have been given the web design of the application as **HTML** + **CSS**
files.

-   Initially all views and forms are shown by the HTML. Your application may
    **hide**/**show elements** by CSS (**display: none**) or
    **delete**/**reattach** from and to the DOM all unneeded elements, or just
    display the views it needs to display.

-   You may render the views/forms/components with **jQuery** or **Handlebars**.

**Important**: Don’t change the elements’ **class names** and **ids**. Don’t
rename form fields/link names/ids. You are **allowed** to add **data
attributes** to any elements. You may modify **href attributes** of links and
add **action/method attributes** to **forms**, to allow the use of a routing
library.

UniEnt - Client-Side Web Application
------------------------------------

**Design** and **implement** a client-side front-end app (SPA) for managing
**events**. Implement the functionality described below.

### Notifications (5 pts)

The application should notify the users about the result of their actions.

-   In case of a **successful** action, a **notification message (green)**
    should be shown, which disappears automatically after 5 seconds or manually
    when the user clicks it.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133021-4ecbf780-cddc-11e9-8f9a-2cd6bbe3ab3e.png" alt="alt text" width="600" height=""></kbd>

-   In case of **error**, an **error notification message (red)** should be
    shown, which disappears on user click.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133022-5095bb00-cddc-11e9-8c90-adb7eb04dcec.png" alt="alt text" width="600" height=""></kbd>

-   During the **AJAX calls** a **loading notification message (blue)** should
    be shown. It should disappear automatically as soon as the AJAX call is
    completed.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133026-51c6e800-cddc-11e9-8988-b6e2bbea7b68.png" alt="alt text" width="600" height=""></kbd>

-   **NOTE**: You get all the points if **all** the notifications have the
    **exact content** as described in each section above.

### Navigation Bar (5 pts)

Navigation links should correctly change the current page (view).

-   Clicking on the links in the **NavBar** should display the view behind the
    link (views are represented as sections in the HTML code).

-   Your application may **hide**/**show elements** by CSS (**display: none**)
    or **delete**/**reattach** from and to the DOM all unneeded elements, or
    just display the views it needs to display.

-   The Logged-in user navbar should contain the following elements: **Icon**
    (**icon.jpg**) which is a **link** to the **Home page**, [**Organize
    Event**], the user caption ("{**username**}"), [**Logout**].

    -   The user caption should be a link that navigates to the **currently
        logged in user’s profile**.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133048-7d49d280-cddc-11e9-8213-79d43c783d95.png" alt="alt text" width="600" height=""></kbd>

-   The guest users navbar should contain the following elements: : **Icon**
    (**icon.jpg**) which is a **link** to the **Home page** and [**Login**].

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133050-7fac2c80-cddc-11e9-9282-303a570ae877.png" alt="alt text" width="600" height=""></kbd>

### Home Page (Guest) (5 pts)

The initial page (view) should display the **guest navigation bar** ("**Home**"
(icon) and "**Login**") + **Guest Home Page** + **Footer**.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133092-a9fdea00-cddc-11e9-8df3-57a30448033d.png" alt="alt text" width="800" height=""></kbd>

### Register User (5 pts)

By given **username** and **password,** the app should register a new user in
the system.

-   The following validations should be made:

    -   The **username** should be **at least 3 characters** long

    -   The **password** should be **at least 6 characters** long

    -   The **repeat password** should be **equal to the password**

-   After a **successful registration**, a notification message **"User
    registration successful."** should be displayed and the app should
    **redirect** to the **home page with the right navbar**.

-   In case of **error** (eg. invalid username/password), an appropriate error
    **message** should be displayed, and the user should be able to **try** to
    register again.

-   Keep the user session data in the browser's **session storage**.

Register once and create/join awesome events!

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133099-b2562500-cddc-11e9-9338-7fce6646e6b4.png" alt="alt text" width="800" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133108-bda95080-cddc-11e9-8da8-becfaaee61e8.png" alt="alt text" width="800" height=""></kbd>

### Login User (5 pts)

By given **username** and **password,** the app should login an existing user.

-   After a **successful login**, a notification message **"Login successful."**
    should be shown and the user home screen should be displayed.

-   In case of **error**, an appropriate error message should be displayed and
    the user should be able to fill in the login form again.

-   Keep the user session data in the browser's **session storage**.

-   Clear **all** input fields after a **successful** login.

You are one step away from awesome events!

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133139-dca7e280-cddc-11e9-9b20-5f29f036a013.png" alt="alt text" width="800" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133149-e7fb0e00-cddc-11e9-93a8-a357b167bf76.png" alt="alt text" width="800" height=""></kbd>

### Logout (5 pts)

Successfully logged in users should be able to **logout** from the app.

-   After a **successful** logout, a **notification** message **"Logout
    successful."** should be displayed and the **anonymous screen** should be
    shown

-   The **"logout" REST service** at the back-end **must** be called at logout

-   All local information in the browser (**user session data**) about the
    current user should be deleted

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133160-f9441a80-cddc-11e9-8a94-d7c950ca43d0.png" alt="alt text" width="800" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133163-ffd29200-cddc-11e9-8936-c3e193168556.png" alt="alt text" width="800" height=""></kbd>

### Home Page (30 pts)

Successfully logged-in users should be welcomed by the **Home page**. They
should be able to see all created (organized) events.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133236-6d7ebe00-cddd-11e9-8cb5-86fcc76fed2a.png" alt="alt text" width="600" height=""></kbd>

If there are **NO** such events, the following view should be displayed:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133240-740d3580-cddd-11e9-9a8b-62eb0e266d1a.png" alt="alt text" width="600" height=""></kbd>

[**Create the first one?**] **button** should refer to the **organize event
form**

### Organize Event (10 pts)

Logged-in users should be able to **Create (organize)** events.

Clicking the [**Organize Event**] **link** in the **NavBar** should **display**
the **Organize Event page**.

-   The form should contain the following validations:

    -   The **event name** should be **at least 6 characters** long.

    -   The **date** should be in **string** format (24 February; 24 March - 10
        PM;).

    -   The **description** should be **at least 10 characters** long.

    -   The **image** should start with **"http://"** or **"https://"**.

    -   **By default**, every newly created event must have additional
        information:

        -   **Organizer:** string representing the current event creator;

        -   **People interested in:** number starting from 0;

    -   After a **successful** event creation, a notification message **"Event
        created successfully."** should be displayed and the **Home page**
        should be shown.

-   The inputs fields in the form **should be cleared.**

-   The newly organizer event should be stored in the Kinvey collection
    "**events**".

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133243-7a031680-cddd-11e9-9d0d-dec399849ea9.png" alt="alt text" width="600" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133252-825b5180-cddd-11e9-8e1f-00abff26c9ea.png" alt="alt text" width="600" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133255-86876f00-cddd-11e9-9f17-0aa895b2cd29.png" alt="alt text" width="600" height=""></kbd>

### Details Event (5 pts)

Logged-in users should be able to **view details** about events.

Clicking the [**More**] **link** in of a **particular event** should **display**
the **Event Details page**.

-   If the currently logged-in user is the organizer of the event, the
    [**Edit**] and [**Close**] **buttons** should be set to **visible**,
    otherwise there should be only 1 button [**Join**].

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133261-8dae7d00-cddd-11e9-835f-7efac4fef98a.png" alt="alt text" width="600" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133263-92733100-cddd-11e9-8103-95dc32da02a1.png" alt="alt text" width="600" height=""></kbd>

### Edit Event (5 pts)

Logged-in users should be able to **edit** their **own** events.

Clicking the [**Edit the event**] **link** of a **particular event** on the
**Event Details page** should **display** the **Edit Event page**:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133318-f990e580-cddd-11e9-8775-dbf633082c0d.png" alt="alt text" width="600" height=""></kbd>

-   After a **successful edit**, a notification message "**Event edited
    successfully.**" should be **displayed**, and the user should be redirected
    to the **Home page**.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133324-001f5d00-cdde-11e9-9b7f-330d8827f59e.png" alt="alt text" width="600" height=""></kbd>

### Join Event (5 pts)

Logged-in users should be able to **Join** events, organized by **other users**.

**NOTE**: A user should **NOT** be able to join an **event**, organized by
**himself**.

Clicking the [**Join the event**] **link** of an **event** (on the **Event
Details page**) should **increase** the property for the **people interested
in** the corresponding event.  
Users can **join events** multiple times**.**

-   After **successfully joining** an **event**, a notification message **"You
    join the event successfully."** should be displayed.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133334-0dd4e280-cdde-11e9-824c-e215087cdd0f.png" alt="alt text" width="600" height=""></kbd>

### Delete Event (5 pts)

Logged-in users should be able to **delete their** events.

Clicking the [**Close the event**] **link** of an **event** (on the **Event
Details page**) should **delete** the **event**.

-   After **successful event delete** a notification message **"Event closed
    successfully."** should be displayed and the **Home page** should be
    **shown**

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133343-13cac380-cdde-11e9-98bb-93c700e8b76c.png" alt="alt text" width="600" height=""></kbd>

### User Profile (10 pts)

Logged-in users should be able to **view their profile**.

Clicking the **user caption** ({**USERNAME**}) **link** on the **navigation
bar** should **display** the  
**User Profile page**:

-   Each user profile should display user info - **profile picture**,
    **username** and **organization information**

    -   **"Organizer of {count} events**"

    -   The **names** of **all events** which the user has **organized**.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133377-4e346080-cdde-11e9-8f74-cd0da9ebdea6.png" alt="alt text" width="600" height=""></kbd>

-   In case of **no events**, display "**No events**".

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133378-5096ba80-cdde-11e9-99db-9ffc313dc24f.png" alt="alt text" width="600" height=""></kbd>

### (BONUS) Sorting: (5 pts)

The events in the **home page** (for **registered** users), should be sorted in
**descending** order by **people interested in.**

### Submitting Your Solution

Exclude the **node_modules** folder and ZIP your project. Upload the archive to
Judge system.

<https://judge.softuni.bg/Contests/Compete/Index/1645#0>

<br/>

### Solution: <a title="UniEnt SPA" href="https://github.com/TsvetanNikolov123/JS-Core---JS-Apps/tree/master/14%20Workshop%20Single%20Page%20Application">UniEnt SPA</a>

---
