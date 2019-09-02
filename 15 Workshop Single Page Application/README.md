15 JS Applications Exam - Movies SPA
====================================

---

You are assigned to implement a **Web application** (SPA) using HTML5,
JavaScript, AJAX, REST and JSON with cloud-based backend (Kinvey). Using
libraries like **jQuery**, **Handlebars** and **Sammy** is allowed but is not
obligatory. The app keeps **users** and **movies**. Guests should be able to
**register** and **login**. Logged-in users should be able to view **all
movies**, **create movies**, **buy tickets** for the movies, see **details**
about a **movie** and **logout**. Logged-in users should also be able to
**edit** or **delete** the movies **they have created**. There should also be a
**section** where users can **see only the movies they have created**.

#### Submitting Your Solution

Submit a ZIP file with your project folder. Exclude the **node_modules** folder.
Upload the archive to the Judge.

<https://judge.softuni.bg/Contests/Practice/Index/1646#0>


---

Create a Kinvey REST Service
----------------------------

Register at **Kinvey.com** and create an application to keep your data in the
cloud.

Create a collection called **movies**. Each **movie** has a **title,
description, imageURL, tickets** and **genres (array)**.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133982-fd733680-cde2-11e9-94e5-c99ba742ad1e.png" alt="alt text" width="800" height=""></kbd>

In order to be able to keep track of the **tickets** of each movie, you need to
**allow all users to edit this collection**. So go to the **properties** of the
collection:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133993-07953500-cde3-11e9-8975-fcdacc0c1019.png" alt="alt text" width="600" height=""></kbd>

Then go to **permissions** and edit them to look like this:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64133998-0e23ac80-cde3-11e9-8c49-67126a6025f6.png" alt="alt text" width="800" height=""></kbd>

Test the Kinvey REST Services
-----------------------------

Using **Postman** or other HTTP client tool (you can use Kinvey’s built-in **API
Console**), test the REST service endpoints:

### User Registration (Sign Up)

| **POST** **`https://baas.kinvey.com/user/app_id`** |                                                                                                                                                     |
|--------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                                                  | Authorization: **Basic base64(app_id:app_secret)** <br/>Content-Type: **application/json**                                                               |
| **Request body**                                                                     | **{ <br/>&nbsp;&nbsp;&nbsp;"username": "testuser", <br/>&nbsp;&nbsp;&nbsp;"password": "testuserpass890" <br/>}**                                                                                           |
| **Response 201 Created**                                                             | **{ <br/>&nbsp;&nbsp;&nbsp;"_id": "59930c78a743e20c7d3fca77", <br/>&nbsp;&nbsp;&nbsp;"username": "testuser", <br/>&nbsp;&nbsp;&nbsp;"password": "testuserpass890"** <br/>}                                                        |
| **Error response 409 Conflict**                                                      | **{ "error": "UserAlreadyExists", "description": "This username is already taken. Please retry your request with a different username", "debug": "" }** |
| **Error response 401 Unauthorized**                                                  | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**            |

The request needs "**Basic**" authentication. Use the Kinvey **App Key** and
Kinvey **App Secret** as credentials.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134117-ca7d7280-cde3-11e9-9e3a-8b6dc595496a.png" alt="alt text" width="400" height=""></kbd>

### User Login

| **POST** **`https://baas.kinvey.com/user/app_id/login`** |                                                                                                                                                        |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                  | **Authorization: Basic base64(app_id:app_secret) <br/>Content-Type: application/json**                                                                          |
| **Request body**                                     | **{ <br/>&nbsp;&nbsp;&nbsp;"username": "testuser",<br/> &nbsp;&nbsp;&nbsp;"password": "testuserpass890" <br/>}**                                                                                              |
| **Response 200 OK**                                  | **{ <br/>&nbsp;&nbsp;&nbsp;"_id": "59930c78a743e20c7d3fca77", <br/>&nbsp;&nbsp;&nbsp;"username": "testuser" <br/>&nbsp;&nbsp;&nbsp;"_kmd": { "authtoken": "8e6471bc-3712-4cfb-b92e-50e62a0c80….Duj5fHdM /7XHIe6KdY=" <br>&nbsp;&nbsp;&nbsp;… <br/>&nbsp;&nbsp;&nbsp;}, <br/>&nbsp;&nbsp;… <br>}** |
| **Error response 401 Unauthorized**                  | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**               |

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

### List All Movies

| **GET** **`https://baas.kinvey.com/appdata/app_id/movies>?query={}&sort={}`** |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|--------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                                      | **Authorization: Kinvey authtoken**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Response 200 OK**                                                      | **[ <br/>&nbsp;&nbsp;{ <br/>&nbsp;&nbsp;&nbsp;&nbsp;"_id": "5c9234b6cad7d87d9f873b90", <br/>&nbsp;&nbsp;&nbsp;&nbsp;"title": "Us (2019)", <br/>&nbsp;&nbsp;&nbsp;&nbsp;"imageUrl":"`https://m.media-amazon.com/images/M/MV5BZTliNWJhM2YtNDc1MC00YTk1LWE2MGYtZmE4M2Y5ODdlNzQzXkEyXkFqcGdeQXVyMzY0MTE3NzU\@._V1_UX140_CR0,0,140,209_AL_.jpg`", <br/>&nbsp;&nbsp;&nbsp;&nbsp;"description": "A family's serenity turns to chaos when a group of doppelgängers begins to terrorize them.", <br/>&nbsp;&nbsp;&nbsp;&nbsp;"genres": [ "Horror,Triller" ], <br/>&nbsp;&nbsp;&nbsp;&nbsp;"tickets": "52", <br/>&nbsp;&nbsp;&nbsp;&nbsp;"_acl": { "creator": "5c91f497dc781901a7e5745c" }, <br/>&nbsp;&nbsp;&nbsp;&nbsp;"_kmd": { "lmt": "2019-03-21T08:31:38.656Z", "ect": "2019-03-20T12:40:22.352Z" } <br/>&nbsp;&nbsp;&nbsp;}, <br/>&nbsp;&nbsp;&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;"_id": "5c92353231f05528ddabc64d", <br/>&nbsp;&nbsp;&nbsp;&nbsp;"title": "Triple Threat (2019)", <br/>&nbsp;&nbsp;&nbsp;&nbsp;"imageUrl": "`https://m.media-amazon.com/images/M/MV5BYTY1MjRhYmYtZDg4Yy00ZWRiLWIwYzktZThkY2E0YjZlNjgxXkEyXkFqcGdeQXVyMTc3MjY3NTY\@._V1_UY209_CR0,0,140,209_AL_.jpg`", <br/>&nbsp;&nbsp;&nbsp;&nbsp;"description": "A hit contract is taken out on a billionaires daughter intent on bringing down a major crime syndicate. A down and out team of mercenaries must take on a group of professional assassins and stop them before they kill their target.", <br/>&nbsp;&nbsp;&nbsp;&nbsp;"genres": [ "Action", "Thriller" ], <br/>&nbsp;&nbsp;&nbsp;&nbsp;"tickets": "22", <br/>&nbsp;&nbsp;&nbsp;&nbsp;"_acl": { "creator": "5c9234f4dc781901a7e87ce9" }, <br/>&nbsp;&nbsp;&nbsp;&nbsp;"_kmd": { "lmt": "2019-03-20T13:47:12.419Z", "ect": "2019-03-20T12:42:26.360Z" } <br/>&nbsp;&nbsp;&nbsp;}** <br/>] |
| **Error response 401 Unauthorized**                                      | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### Create Movie

| **POST** `https://baas.kinvey.com/appdata/app_id/movies` |                                                                                                                                                                                                                                                                                                                                                                                                           |
|----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                      | **Authorization: Kinvey authtoken Content-Type: application/json**                                                                                                                                                                                                                                                                                                                                            |
| **Request body**                                         | **{"title": "test movie", "description": "test movie description", "imageUrl": "`https://m.media-amazon.com/images/M/MV5BMTQzOTUyODMyOV5BMl5BanBnXkFtZTcwNzY2MzU1MQ\@\@._V1_.jpg`", "genres": ["Thriller", "Drama"], "tickets": 50}**                                                                                                                                                                           |
| **Response 201 Created**                                 | **{ "title": "test movie", "description": "test movie desciption", "imageUrl":"`https://m.media-amazon.com/images/M/MV5BMTQzOTUyODMyOV5BMl5BanBnXkFtZTcwNzY2MzU1MQ\@\@._V1_.jpg`", "genres": [ "Thriller", "Drama" ], "tickets": 50, "_acl": { "creator": "5c91f497dc781901a7e5745c" }, "_kmd": { "lmt": "2019-03-21T08:57:28.073Z", "ect": "2019-03-21T08:57:28.073Z" }, "_id": "5c9351f8b66da201acf6ffb8" }** |
| **Error response 401 Unauthorized**                      | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**                                                                                                                                                                                                                                                                  |

### Edit Movie

| **PUT** `https://baas.kinvey.com/appdata/app_id/movies/movie_id` |                                                                                                                                                                                                                                                                                                                                                                                                           |
|------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                              | **Authorization: Kinvey authtoken Content-Type: application/json**                                                                                                                                                                                                                                                                                                                                            |
| **Request body**                                                 | **{ "title": "test movie", "description": "test movie desciption", "`imageUrl":"https://m.media-amazon.com/images/M/MV5BMTQzOTUyODMyOV5BMl5BanBnXkFtZTcwNzY2MzU1MQ\@\@._V1_.jpg`", "genres": [ "Thriller", "Drama" ], "tickets": 49 }**                                                                                                                                                                         |
| **Response 200 Ok**                                              | **{ "title": "test movie", "description": "test movie desciption", "`imageUrl":"https://m.media-amazon.com/images/M/MV5BMTQzOTUyODMyOV5BMl5BanBnXkFtZTcwNzY2MzU1MQ\@\@._V1_.jpg`", "genres": [ "Thriller", "Drama" ], "tickets": 49, "_id": "5c9351f8b66da201acf6ffb8", "_acl": { "creator": "5c91f497dc781901a7e5745c" }, "_kmd": { "lmt": "2019-03-21T09:02:01.340Z", "ect": "2019-03-21T08:57:28.073Z" } }** |
| **Error response 401 Unauthorized**                              | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**                                                                                                                                                                                                                                                                  |

### Delete Movie

| **DELETE** `https://baas.kinvey.com/appdata/app_id/movies/movie_id` |                                                                                                                                          |
|---------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                                 | **Authorization: Kinvey authtoken**                                                                                                          |
| **Response 200 OK**                                                 | **{ "count": 1 }**                                                                                                                           |
| **Error response 404 Not Found**                                    | **{ "error": "EntityNotFound", "description": "This entity not found in the collection", "debug": "" }**                                     |
| **Error response 401 Unauthorized**                                 | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }** |

### Buy Tickets

| **PUT** `https://baas.kinvey.com/appdata/app_id/movies/movie_id` |                                                                                                                                                                                                                                                                                                                                                                                                           |
|------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                              | **Authorization: Kinvey authtoken Content-Type: application/json**                                                                                                                                                                                                                                                                                                                                            |
| **Request body**                                                 | **{ "title": "test movie", "description": "test movie description", "`imageUrl": "https://m.media-amazon.com/images/M/MV5BMTQzOTUyODMyOV5BMl5BanBnXkFtZTcwNzY2MzU1MQ\@\@._V1_.jpg`", "genres": ["Thriller", "Drama"], "tickets": 49 }**                                                                                                                                                                         |
| **Response 200 Ok**                                              | **{ "title": "test movie", "description": "test movie desciption", "`imageUrl":"https://m.media-amazon.com/images/M/MV5BMTQzOTUyODMyOV5BMl5BanBnXkFtZTcwNzY2MzU1MQ\@\@._V1_.jpg`", "genres": [ "Thriller", "Drama" ], "tickets": 49, "_id": "5c9351f8b66da201acf6ffb8", "_acl": { "creator": "5c91f497dc781901a7e5745c" }, "_kmd": { "lmt": "2019-03-21T09:02:01.340Z", "ect": "2019-03-21T08:57:28.073Z" } }** |
| **Error response 401 Unauthorized**                              | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**                                                                                                                                                                                                                                                                  |

### My Movies

| **GET** `https://baas.kinvey.com/appdata/app_id/movies?query={"_acl.creator":"\${user_id}"}` |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request headers**                                              | **Authorization: Kinvey authtoken**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Response 200 OK**                                              | **[ { "_id": "5c9234b6cad7d87d9f873b90", "title": "Us (2019)", "imageUrl": "`https://m.media-amazon.com/images/M/MV5BZTliNWJhM2YtNDc1MC00YTk1LWE2MGYtZmE4M2Y5ODdlNzQzXkEyXkFqcGdeQXVyMzY0MTE3NzU\@._V1_UX140_CR0,0,140,209_AL_.jpg`", "description": "A family's serenity turns to chaos when a group of doppelgängers begins to terrorize them.", "genres": [ "Horror,Triller" ], "tickets": "52", "_acl": { "creator": "5c91f497dc781901a7e5745c" }, "_kmd": { "lmt": "2019-03-21T08:31:38.656Z", "ect": "2019-03-20T12:40:22.352Z" } } … ]** |
| **Error response 401 Unauthorized**                              | **{ "error": "InvalidCredentials", "description": "Invalid credentials. Please retry your request with correct credentials", "debug": "" }**                                                                                                                                                                                                                                                                                                                                                                                                 |

Movies - HTML and CSS
---------------------

You have been given the web design of the application as **HTML** + **CSS**
files.

-   Initially all views and forms are shown by the HTML. Your application may
    **hide**/**show elements** by CSS (**display: none**) or
    **delete**/**reattach** from and to the DOM all unneeded elements, or just
    display the views it needs to display.

-   You may render the views/forms/components with **jQuery** or **Handlebars**.

**Important**: Don’t change the elements’ **class names** and **ids**. Don’t
rename form fields/link names/ids. You are **allowed** to add **data
attributes** to any elements. You may modify **href** attributes of links and
add **action**/**method** attributes to **forms**, to allow the use of a routing
library.

Movies - Client-Side Web Application
------------------------------------

**Design** and **implement** a client-side front-end app (SPA) for managing
**movies**. Implement the functionality described below.

### Notifications (5 pts)

The application should notify the users about the result of their actions.

-   In case of successful action an **informational (green) notification
    message** should be shown, which disappears automatically after 3 seconds or
    manually when the user clicks it.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134487-f1897380-cde6-11e9-8a90-e295c01bfeb9.png" alt="alt text" width="600" height=""></kbd>

-   In case of **error**, an **error notification message** (red) should be
    shown which disappears on user click.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134491-f9e1ae80-cde6-11e9-9e32-39c0f563ec4e.png" alt="alt text" width="600" height=""></kbd>

-   During the AJAX calls a **loading notification message (blue)** should be
    shown. It should disappear automatically as soon as the AJAX call is
    completed.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134494-ff3ef900-cde6-11e9-9c75-120536f9ffd1.png" alt="alt text" width="600" height=""></kbd>

-   **NOTE: You get all 5 point if the notifications contain the right
    messages.**

### Navigation Bar (5 pts)

Navigation links should correctly change the current page (view). **The navbar
should be displayed in every view!**

-   Clicking on the links in the **NavBar** should display the view behind the
    link (views are represented as sections in the HTML code).

-   Your application may **hide**/**show elements** by CSS (**display: none**)
    or **delete**/**reattach** from and to the DOM all unneeded elements, or
    just display the views it needs to display.

-   The links [**Cinema**], [**Add Movie**], [**My Movies**], [**Logout**], and
    the user caption  
    "**Welcome, {username}!**" should be visible **only** for logged-in users.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134511-2e556a80-cde7-11e9-95fc-744832f63172.png" alt="alt text" width="600" height=""></kbd>

-   Anonymous users have access only to the following links: [**Home**],
    [**Login**] and [**Register**].

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134514-31505b00-cde7-11e9-916e-80ab20a1de15.png" alt="alt text" width="600" height=""></kbd>

### Home Screen (5 pts)

The initial page (view) should display:

-   **NavBar** with the following links [**Home**], [**Login**], [**Register**]

-   The **image** from the resources (**background.jpg**)

-   The **Footer**

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134527-51801a00-cde7-11e9-9378-3e635b0dd346.png" alt="alt text" width="600" height=""></kbd>

### Register User (5 pts)

By given **username** and **password** the app should register a new user in the
system.

-   You should make the following validations:

    -   The **username** should be **at least 3 characters** long

    -   The **password** should be **at least 6 characters** long

    -   The **repeat password** should be **equal to the password**

-   After a **successful registration**, a notification message **"User
    registration successful."** should be **displayed** and the user should be
    **logged-in**.

    -   **Home page** should be **displayed** with the **User navbar**.

-   In case of **error** (eg. **duplicate** username, **non-matching**
    passwords), an appropriate **error message** should be **displayed** and the
    client should be able to **try** to register again.

-   Keep the **user session data** in the browser’s **session storage**.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134532-5b098200-cde7-11e9-85ed-283982316210.png" alt="alt text" width="600" height=""></kbd>

### Login User (5 pts)

By given **username** and **password** the app should be able to login an
existing user.

-   After a **successful login**, a notification message **"Login successful."**
    should be displayed and the user should be **logged-in**.

    -   **Home page** should be **displayed** with the **User navbar**.

-   In case of **error**, an appropriate **error message** should be
    **displayed** and the user should be able to fill the **login form** again.

-   Keep the **user session data** in the browser’s **session storage**.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134533-6066cc80-cde7-11e9-9d62-09089489d62e.png" alt="alt text" width="600" height=""></kbd>

### Logout (5 pts)

Logged-in users should be able to **logout** from the app.

-   After a **successful** logout, a **notification** message **"Logout
    successful."** should be displayed and the user should be **logged-out**.

    -   **Login page** should be **displayed** with the **user navbar**.

-   The **Logout REST service** at the back-end should be obligatory **called**
    at logout.

-   All local information in the browser (**user session data**) about the
    current user should be **deleted**.

### Cinema (30 pts)

Logged-in users should be able to **view all movies**.

Clicking the [**Cinema**] **link** in the **NavBar** should **display** the
**Cinema page**.

The **Cinema page** should **list all** of the **movies**, in a **formatted**
and **ordered** manner:

-   The **movies** should be listed in the **format** as shown in the web design
    (see the screenshot below).

-   The **movies** must be **sorted** by the **available tickets** in
    **descending**.

-   Each **movie** has **title**, **image, available tickets, buttons:** [**Buy
    Ticket**] **and** [**Details**].

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134538-68bf0780-cde7-11e9-8c87-bf7538d48f0c.png" alt="alt text" width="200" height=""></kbd>

-   The **Cinema page** should look like this:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134541-71afd900-cde7-11e9-8a4f-79db736ce6ca.png" alt="alt text" width="600" height=""></kbd>

### Add Movie (10 pts)

Logged-in users should be able to **Add** movies.

Clicking the [**Add Movie**] **link** in the **NavBar** should **display** the
**Add Movie page**.

-   The form should contain the following validations:

    -   The **title** should be **at least 6 characters** long.

    -   The **description** should be **at least 10 characters** long.

    -   The **image** should start with **"http://"** or **"https://"**.

    -   The **available tickets** should be a **number**.

    -   The **genres** must be separated by a **single space**.

-   After a **successful movie creation**, a notification message **"Movie
    created successfully."** should be **displayed** and the **Home page**
    should be shown.

-   The inputs fields in the form **should be cleared.**

-   The newly created movie should be stored in the Kinvey collection
    "**movies**".

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134543-78d6e700-cde7-11e9-8c61-26d19806c797.png" alt="alt text" width="600" height=""></kbd>

### Buy Ticket (5 pts)

Logged-in users should be able to **Buy tickets** for movies.

Clicking the [**Buy Ticket**] **link** of a **particular movie** should
**decrease** its **available tickets**. If there are **no available tickets**,
an appropriate **notification** should be **displayed** and the **available
tickets** should **not be changed**.  
Users can **buy multiple tickets** for **one movie.**

-   After **successfully buying** a **ticket**, a notification message
    **"Successfully bought ticket for {movie name}!"** should be displayed.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134546-7eccc800-cde7-11e9-9832-24a07afe2620.png" alt="alt text" width="600" height=""></kbd>

### Movie Details (5 pts)

Logged-in users should be able to **view details** about movies.

Clicking the [**Details**] **link** in of a **particular movie** should
**display** the **Movie Details page**.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134547-855b3f80-cde7-11e9-9e48-108ad1ce4047.png" alt="alt text" width="300" height=""></kbd>

-   From this **view**, the user should also be able to **buy tickets** - [**Buy
    Tickets**] link.

### My Movies (10 pts)

Logged-in users should be able to **view their** movies.

Clicking the [**My Movies**] **link** in the **NavBar** should **display** the
**My Movies page**.

-   The **movies** should be listed like in the **cinema** section, except the
    user should see only the **movies** that he created and each movie should
    have [**Edit**] and [**Delete**] buttons, which will **show** the
    **corresponding pages**.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134548-8ab88a00-cde7-11e9-91cc-480ecc4672cf.png" alt="alt text" width="600" height=""></kbd>

### Edit Movie (5 pts)

Logged-in users should be able to **edit their** movies.

Clicking the [**Edit**] **link** of a **particular movie** on the **My Movies
page** should **display** the **Edit Movie page**:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134549-9015d480-cde7-11e9-926d-a404ee566e2c.png" alt="alt text" width="400" height=""></kbd>

-   After a **successful edit**, an appropriate notification should be
    **displayed**!

### Delete Movie (5 pts)

Logged-in users should be able to **delete their** movies.

Clicking the [**Delete**] **link** of a **particular movie** on the **My Movies
page** should **display** the **Delete Movie page**:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134555-9dcb5a00-cde7-11e9-9dba-14a98635ccd2.png" alt="alt text" width="400" height=""></kbd>

-   The **input fields** should be **disabled**.

-   After **successful movie delete** a notification message **"Movie removed
    successfully!"** should be displayed and the **Home page** should be
    **shown**.

### (BONUS) Search: (5 pts)

Logged-in users should be able to **search** for movies, by typing some
**genre** (**case sensitive**) on the **search field** of the **Cinema page**.

Clicking the [**Search**] link should **display** the **same view** (**Cinema
page**), but **only** with the **movies** which **contain** the **given genre**:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64134559-a58afe80-cde7-11e9-9cbc-5d8039238a01.png" alt="alt text" width="600" height=""></kbd>

---