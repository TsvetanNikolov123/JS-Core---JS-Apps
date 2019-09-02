11 Lab: Templating
==================

---
---

Problems for in-class lab for the ["JavaScript Applications" course \@
SoftUni](https://softuni.bg/courses/js-apps).

---

11.01 Contacts Book
-------------------

Create a simple page containing some cards with contacts. Each card should have
a **name** and a **button "Details"**. Each time the button is pressed, you have
to **toggle a div** containing more detailed information about the corresponding
contact.

You will be provided with the **HTML, CSS** and a **JavaScript** file with all
the contacts data. You have to create a **separate template** for the contact
cards and display all of them on the main page. At the end, the page should look
like this:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64121113-8e77ec80-cda6-11e9-994a-e69a8f08972a.png" alt="alt text" width="600" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64121117-90da4680-cda6-11e9-936c-fcaf0d9ce36b.png" alt="alt text" width="600" height=""></kbd>

### Hints

First, let us create a **separate html file**, where we will put **our contact
cards**:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64121120-93d53700-cda6-11e9-8867-3db8d3a91299.png" alt="alt text" width="600" height=""></kbd>

We **loop through all the contacts** and we **render the data** about each of
them

The next step is to create the functionality for displaying all cards.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64121122-959efa80-cda6-11e9-8e99-08290c7c8722.png" alt="alt text" width="600" height=""></kbd>

-   Create a function that gets our **template.html** file

-   Pass the **contacts** variable to the context

-   Create the **template**

-   Get the **div** and fill it with the **compiled HTML**

-   Create the **function** that **shows** the additional info about each
    contact


<br/>

### Solution: <a title="01 Contacts Book" href="https://github.com/TsvetanNikolov123/JS-Core---JS-Apps/tree/master/11%20Templating/Lab-Solution">01 Contacts Book</a>

---