12 Exercises: Templating
========================

---
---

Problems for exercises and homework for the ["JavaScript Applications" course \@
SoftUni](https://softuni.bg/trainings/2347/js-apps-july-2019).

---

12.01 List Towns
----------------

You are a given an **input field** with a **button**. In the input field you
should enter **elements separated** by comma and whitespace ("**,** "). Your
task is to create a simple **template** that defines a **list** of towns. Each
**town** comes from the **input** field.

In your **attachEvents()** function you **should** attach a click event to the
**button** with **id "btnLoadTowns"** and **render** the **towns** that come
from the input field in the **HTML template** with **id "towns-template".**

### Screenshots 

<kbd><img src="https://user-images.githubusercontent.com/32310938/64121997-152dc900-cda9-11e9-88c7-c469721ffef7.png" alt="alt text" width="600" height=""></kbd>

This is how the HTML looks like:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64122002-165ef600-cda9-11e9-8c7a-95856c2b2f69.png" alt="alt text" width="300" height=""></kbd>

<br/>

### Solution: <a title="01 List Towns" href="https://github.com/TsvetanNikolov123/JS-Core---JS-Apps/blob/master/12%20Templating%20Exercise/01.%20List%20Towns/app.js">01 List Towns</a>

---

12.02 HTTP Status Cats
----------------------

We all love cats. They are also a fun way to learn all the HTTP status codes.

Your task is to **refactor** the given **HTML** and to create a **template** to
represent **each** cat card block on it's own. After you have **created** the
templete **render** it into the div with **id "allCats".**

A **cat** has an **id, statusCode, statusMessage** and **imageLocation**. The
cats are **seeded** using the **function** from the js **file** named
**"catSeeder.js"**

Each card block has a **button** that **unveils** status code information
**connected** to each cat. You should **toggle** the button and change it's text
from "**Show status code**" to "**Hide status code**".

### Screenshots 

<kbd><img src="https://user-images.githubusercontent.com/32310938/64122014-1e1e9a80-cda9-11e9-81c2-903bc6b478fb.png" alt="alt text" width="600" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64122021-21198b00-cda9-11e9-8e14-6df862e9cda9.png" alt="alt text" width="400" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64122024-237be500-cda9-11e9-9a41-853b3219a009.png" alt="alt text" width="400" height=""></kbd>

<br/>

### Solution: <a title="02 HTTP Status Cats" href="https://github.com/TsvetanNikolov123/JS-Core---JS-Apps/blob/master/12%20Templating%20Exercise/02.%20HTTP%20Status%20Cats/template.js">02 HTTP Status Cats</a>

---

12.03 Popular Monkeys
---------------------

You are provided with a **skeleton.** Your task is to implement the function in
the **'monkeysTemplate.js'** file to render the six most popular monkeys in the
browser. You should also add an **event** to each **'Info'** button to show the
**details** about the monkey. Each monkey also has a **name** and an **image**.
Explore the **'monkeys.js'**file for more details. At the end the page should
look like this:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64122031-2676d580-cda9-11e9-8f1c-af0dd8c62ee8.png" alt="alt text" width="800" height=""></kbd>

<br/>

### Solution: <a title="03 Popular Monkeys" href="https://github.com/TsvetanNikolov123/JS-Core---JS-Apps/blob/master/12%20Templating%20Exercise/03.%20Popular%20Monkeys/monkeys.js">03 Popular Monkeys</a>

---