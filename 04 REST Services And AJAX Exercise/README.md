04 Exercise: REST Services and AJAX
===================================

---
---

Problems for exercises and homework for the ["JavaScript Applications" course \@
SoftUni](https://softuni.bg/courses/js-applications). Submit your solutions in
the SoftUni Page -
<https://softuni.bg/trainings/2347/js-apps-july-2019#lesson-11778>

----

04.01 Bus Stop
--------------

Write a JS program that displays arrival times for all buses by a given bus stop
ID when a button is clicked. *Use the skeleton from the provided resources.*

When the button with ID **'submit'** is clicked, the name of the bus stop
appears and the list bellow gets filled with all the buses that are expected and
their time of arrival. Take the **value** of the input field with id
**'stopId'**. Submit a **GET** request to
**`https://judgetests.firebaseio.com/businfo/{stopId}.json`** (replace the
highlighted part with the correct value) and parse the response. You will
receive a JSON object in the format:

**stopId: {**

&nbsp;&nbsp;&nbsp;&nbsp;**name: stopName,**

&nbsp;&nbsp;&nbsp;&nbsp;**buses: { busId: time, … }**

**}**

Place the name property as text inside the div with ID **'stopName'** and each
bus as a list item with text:

**"Bus {busId} arrives in {time}"**

Replace all highlighted parts with the relevant value from the response. If the
request is not successful, or the information is not in the expected format,
display **"Error"** as **stopName** and nothing in the list. The list should be
cleared before every request is sent.

### Examples

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063028-5f6f4880-cbf7-11e9-866d-fb9fba1e0021.png" alt="alt text" width="400" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063035-6c8c3780-cbf7-11e9-80b4-4db6c74a555c.png" alt="alt text" width="600" height=""></kbd>


When the button is clicked, the results are displayed in the corresponding
elements:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063039-76ae3600-cbf7-11e9-8cb9-9471fae31c75.png" alt="alt text" width="400" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063048-8ded2380-cbf7-11e9-9e51-537520ba3586.png" alt="alt text" width="600" height=""></kbd>

If an error occurs, the stop name changes to Error:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063050-934a6e00-cbf7-11e9-8f54-63ee1e5c8a89.png" alt="alt text" width="400" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063054-9cd3d600-cbf7-11e9-80ee-5875b62ae7f6.png" alt="alt text" width="400" height=""></kbd>

### Hints

The webhost will respond with valid data to IDs 1287, 1308, 1327 and 2334.

<br/>

### Solution: <a title="01 Bus Stop" href="https://github.com/TsvetanNikolov123/JS-Core---JS-Apps/blob/master/04%20REST%20Services%20And%20AJAX%20Exercise/01.BUS-STOP/app.js">01 Bus Stop</a>

---

04.02 Bus Schedule
------------------

Write a JS program that tracks the progress of a bus on it’s route and announces
it inside an info box. The program should display which is the upcoming stop and
once the bus arrives, to request from the server the name of the next one. *Use
the skeleton from the provided resources.*

The bus has two states – **moving** and **stopped**. When it is **stopped**,
only the button “**Depart**” is **enabled**, while the info box shows the name
of the **current** stop. When it is **moving**, only the button “**Arrive**” is
**enabled**, while the info box shows the name of the **upcoming** stop.
Initially, the info box shows "**Not Connected**" and the "**Arrive**" button is
**disabled**. The ID of the first stop is "**depot**".

When the "**Depart**" button is clicked, make a **GET** request to the server
with the ID of the current stop to address
**`https://judgetests.firebaseio.com/schedule/{currentId}.json`** (replace the
highlighted part with the relevant value). As a response, you will receive a
JSON object in the following format:

**stopId {**

&nbsp;&nbsp;&nbsp;&nbsp;**name: stopName,**

&nbsp;&nbsp;&nbsp;&nbsp;**next: nextStopId**

**}**

Update the info box with the information from the response, disable the “Depart”
button and enable the “Arrive” button. The info box text should look like this
(replace the highlighted part with the relevant value):

**Next stop {stopName}**

When the "**Arrive**" button is clicked, update the text, disable the “Arrive”
button and enable the “Depart” button. The info box text should look like this
(replace the highlighted part with the relevant value):

**Arriving at {stopName}**

Clicking the buttons successfully will cycle through the entire schedule. If
invalid data is received, show "**Error**" inside the info box and **disable**
both buttons.

### Examples

Initially, the info box shows “Not Connected” and the arrive button is disabled.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063367-44530780-cbfc-11e9-8828-c414f05b613f.png" alt="alt text" width="600" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063379-5af95e80-cbfc-11e9-8b40-eae0ce1e3c39.png" alt="alt text" width="600" height=""></kbd>

When Depart is clicked, a request is made with the first ID. The info box is
updated with the new information and the buttons are changed:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063384-63519980-cbfc-11e9-9483-dca88e75ae32.png" alt="alt text" width="600" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063394-749aa600-cbfc-11e9-8601-9148f527c88b.png" alt="alt text" width="600" height=""></kbd>

Clicking Arrive, changes the info box and swaps the buttons. This allows Depart
to be clicked again, which makes a new request and updates the information:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063402-79f7f080-cbfc-11e9-92aa-6e33dd99abba.png" alt="alt text" width="600" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063404-811efe80-cbfc-11e9-84ae-7cdf70e5f8ab.png" alt="alt text" width="600" height=""></kbd>

<br/>

### Solution: <a title="02 Bus Schedule" href="https://github.com/TsvetanNikolov123/JS-Core---JS-Apps/blob/master/04%20REST%20Services%20And%20AJAX%20Exercise/02.BUS-SCHEDULE/app.js">02 Bus Schedule</a>

---

04.03 Phonebook
---------------

Write a JS program that can load, create and delete entries from a Phonebook.
You will be given an HTML template to which you must bind the needed
functionality.

*Use the skeleton from the provided resources.*

When the **[Load]** button is clicked, a **GET** request should be made to the
server to get all phonebook entries. Each received entry should be in a **li**
inside the **ul** with **id="phonebook"** in the following format with text
**"\<person\>: \<phone\> "** and a **[Delete]** button attached. Pressing the
**[Delete]** button should send a **DELETE** request to the server and delete
the entry. The received response will be an object in the following format:  
**{\<key\>:{person:\<person\>, phone:\<phone\>}, \<key2\>:{person:\<person2\>,
phone:\<phone2\>,…}** where **\<key\>** is an unique key given by the server and
**\<person\>** and **\<phone\>** are the actual values.

When the **[Create]** button is clicked, a new **POST** request should be made
to the server with the information from the Person and Phone textboxes, the
Person and Phone textboxes should be cleared and the Phonebook should be
automatically reloaded (like if the **[Load]** button was pressed).

The data sent on a **POST** request should be a valid JSON object, containing
properties **person** and **phone.** Example format:  

**{**

&nbsp;&nbsp;&nbsp;**"person": "\<person\>",**

&nbsp;&nbsp;&nbsp;**"phone": "\<phone\>"**  

**}**

The **url** to which your program should make requests is:

**`'https://phonebook-nakov.firebaseio.com/phonebook'`**

**GET** and **POST** requests should go to
**`https://phonebook-nakov.firebaseio.com/phonebook.json`**, while **DELETE**
requests should go to
**`https://phonebook-nakov.firebaseio.com/phonebook/\<key\>.json`**, where
**\<key\>** is the unique key of the entry (you can find out the **key** from
the key property in the **GET** request)

**You may create your own app** in Firebase.

### Screenshots:

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063449-073b4500-cbfd-11e9-8836-f7a2bca3be28.png" alt="alt text" width="300" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063450-09050880-cbfd-11e9-9f0e-3e9d2d28a219.png" alt="alt text" width="300" height=""></kbd>

<br/>

### Solution 1: <a title="03 Phonebook" href="https://github.com/TsvetanNikolov123/JS-Core---JS-Apps/blob/master/04%20REST%20Services%20And%20AJAX%20Exercise/03.PHONEBOOK/app.js">03 Phonebook</a>
### Solution 2: <a title="03 Phonebook" href="https://github.com/TsvetanNikolov123/JS-Core---JS-Apps/blob/master/04%20REST%20Services%20And%20AJAX%20Exercise/03.01.PHONEBOOK/app.js">03 Phonebook</a>

---

04.04 Messenger
---------------

Write a JS program that records and displays messages. The user can post a
message, supplying a name and content and retrieve all currently recorded
messages.  
*Use the skeleton from the provided resources*

**Firebase url** for the requests -
<https://rest-messanger.firebaseio.com/messanger>

When [**Send**] **button** is clicked you should create a **new object** and
send a **post request** to the firebase url. Use the following message
structure:

**{**

&nbsp;&nbsp;&nbsp;**author: authorName,**

&nbsp;&nbsp;&nbsp;**content: msgText,**

**}**

The key associated with each message object is not important - when making a
**POST** request with the message object as parameter, Firebase will
automatically assign a random key.

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063504-84ff5080-cbfd-11e9-9558-71ded5356103.png" alt="alt text" width="600" height=""></kbd>

If you click over [**Refresh**] **button** you should **get all** messages with
**GET request** and display them into the textarea. Use the following message
format:  
"**{author}: {message}**"

### Examples

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063505-8892d780-cbfd-11e9-8c87-569128ef024e.png" alt="alt text" width="600" height=""></kbd>

<kbd><img src="https://user-images.githubusercontent.com/32310938/64063506-8af53180-cbfd-11e9-8bee-b00ad6747448.png" alt="alt text" width="600" height=""></kbd>

<br/>

### Solution: <a title="04 Messenger" href="https://github.com/TsvetanNikolov123/JS-Core---JS-Apps/blob/master/04%20REST%20Services%20And%20AJAX%20Exercise/04.MESSENGER/app.js">04 Messenger</a>

---