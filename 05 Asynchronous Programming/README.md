05 Lab: Asynchronous Programming
================================

---
---

Problems for exercises and homework for the ["JavaScript Apps" course \@
SoftUni.](https://softuni.bg/courses/js-applications)  
The following tasks do not have tests in the Judge system. They are for
practice.

---

05.01 Github Commits
--------------------

Write a JS program that loads all commit messages and their authors from a
github repository using a given HTML.

*Skeleton will be provided in the Resources folder.*

The **loadCommits()** function should get the **username** and **repository**
from the HTML textboxes with IDs **"username"** and **"repo"** and make a
**GET** request to the **Github API**:  
**`https://api.github.com/repos/\<username\>/\<repository\>/commits`**

Swap **\<username\>** and **\<repository\>** with the ones from the HTML:

-   In case of **success**, for **each** entry add a **list item** (\<**li\>**)
    in the **unordered list** (\<**ul\>**) with **id "commits"** with text in
    the following format:

>   **"\<commit.author.name\>: \<commit.message\>"**

-   In case of an **error**, add a single **list item** (\<**li\>**) with text
    in the following format:  
    **"Error: \<error.status\> (\<error.statusText\>)"**

### Screenshots:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64067801-3e2e4c80-cc37-11e9-8c45-76f86771e0fe.png" alt="alt text" width="600" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64067804-4e462c00-cc37-11e9-845c-210f12e809b2.png" alt="alt text" width="600" height=""></kbd>

<br/>

### Solution: <a title="01 Github Commits" href="https://github.com/TsvetanNikolov123/JS-Core---JS-Apps/blob/master/05%20Asynchronous%20Programming/01.GITHUB-COMMITS/app.js">01 Github Commits</a>

---

05.02 Blog
----------

Write a program for reading blog content. It needs to make **requests** to the
**server** and display **all blog posts** and their **comments**.  
Firebase URL -
[https://blog-apps-c12bf.firebaseio.com/](https://blog-apps-c12bf.firebaseio.com/$%7bendPoint%7d.json)

*Skeleton will be provided in the Resources folder.*

The button with ID "**btnLoadPosts**" should make a **GET** request to
"**/posts**". The **response** from the **server** will be an **Object of
objects.**  


<kbd><img src="https://user-images.githubusercontent.com/32310938/64067832-ac730f00-cc37-11e9-885b-8fef3693fe18.png" alt="alt text" width="600" height=""></kbd>

Each object will be in the following format:

**{**

&nbsp;&nbsp;&nbsp;&nbsp;**body: {postBody},**

&nbsp;&nbsp;&nbsp;&nbsp;**id: {postId},**

&nbsp;&nbsp;&nbsp;&nbsp;**title: {postTitle}**

**}**

Create an **\<option\>** for each post using its **object key** as value and
**current object title property** as text inside the node with ID "**posts**".

<kbd><img src="https://user-images.githubusercontent.com/32310938/64067863-f3610480-cc37-11e9-9e36-ec4334571090.png" alt="alt text" width="600" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64067867-fb20a900-cc37-11e9-85e4-bef224882550.png" alt="alt text" width="600" height=""></kbd>

When the button with ID "**btnViewPost**" is clicked, a **GET** request should
be made to:

-   "**/posts/{postId}**" to obtain the selected post (from the dropdown menu
    with ID "**posts**") - The following **request** will return **a single
    object** as described above.

-   "**/comments -** to obtain all comments. The request will **return** a
    **Object** of **objects**.  
    

<kbd><img src="https://user-images.githubusercontent.com/32310938/64067870-007df380-cc38-11e9-8a1b-45f61ec370c9.png" alt="alt text" width="600" height=""></kbd>

Each object will be in the following format:

**{**

&nbsp;&nbsp;&nbsp;&nbsp;**id: {commentId},**

&nbsp;&nbsp;&nbsp;&nbsp;**postId: {postId},**

&nbsp;&nbsp;&nbsp;&nbsp;**text: {commentText}**

**}**  

You have to find this comments that are for the current post (check the postId
property)

Display the post title inside **h1** with ID "**post-title**" and the post
content inside **ul** with ID "**post-body**". Display **each comment** as a
**\<li\>** inside **ul** with ID "**post-comments**". Do not forget to clear its
content beforehand.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64067874-0b388880-cc38-11e9-8dd1-db6e93dd05d5.png" alt="alt text" width="600" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64067876-0e337900-cc38-11e9-922f-be7e5315c84d.png" alt="alt text" width="600" height=""></kbd>

<br/>

### Solution: <a title="02 Blog" href="https://github.com/TsvetanNikolov123/JS-Core---JS-Apps/blob/master/05%20Asynchronous%20Programming/02.BLOG/app.js">02 Blog</a>

---