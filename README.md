 Please feel free to visit my Notion blog page where I elaborate on the project and share my thought process that informed its development. https://www.notion.so/Authenticated-User-Management-System-ec3acee554d341c09360c6abed6b89e9?pvs=4/

## created with:
*   Node.Js as the server-side run time
*   Express.js as the backend framework
*   MongoDB AS THE DATABASE SOLUTION
*   EJS AS THE VIEW ENGINE.
*   Passport 
*   Passport-local as the Strategy of choice
*   Connect Flash for flash messages
*   Bcrypt for encryption
*   Mongoose as the Mongo ODM


# Purpose of this project 
The purpose of project is simply to show I can build a secure and efficient user management platform that can be easily integrated into various web applications. By utilizing passport.js and cookies/sessions, the system ensures that user identities are authenticated and that access to sensitive areas is regulated based on user roles.


---

# Flow of the system.

### Roles.
Firstly,This being a role-based user management system, I have defined 3 User roles in this system. Users have the ability to access certain resources and can perform certain actions based on their given roles. 

A user can only be assigned one role at a time. A user can select a role at the sign up page when creating an account on the system.

These roles are: 
1. `Registrar`: Users with this role have the ability to only create('register') a transaction.

2. `Reconciler`: Users with this role have the ability to only search for transactions that have been registered into the system

3. `Admin`: Users with this role have the ability to register transactions, delete transactions, add users, edit users and delete users from the system.

# Implementation

As stated before my main goal for this project is to showcase authentication and the maintainance of state in HTTP. 

I will digress a bit to briefly talk about the default nature of the HTTP protocol and why building a project like this would prove to be difficult without tweaking this nature.

## The pain of the HTTP request-response cycle.
---
There are 2 major bodies in any HTTP request-response cycle and these are the CLIENT and the SERVER.
A client can be anything from a phone to a smart fridge. A server is a special computer tasked with the purpose of 'responding' to a client's 'request'

Clients make requests to Servers using HTTP methods such as GET, POST, PUT, DELETE. These methods correspond to a certain action that the a client wants a server to respond to.

- GET - fetch a resource
- POST - create a resource
- PUT - update a resource
- DELETE - you guessed it, delete a resource.

All this is good and fine but the problem with this cycle is that by default, in adherence to the HTTP protocol, this cycle is STATELESS, this means that every request the server receives is independent and has no connection to other incoming requests. 

Lol that was a mouthful but simply put this means that once a request-response cycle is completed, the server completely forgets everything about a client. no matter how many times a client makes a request to a server, once the server sends a response, it forgets the client.

To tweak this issue of statelessness, the use of COOKIES(not the sweet kind lol) and SESSIONS have been implemented.

COOKIES and SESSIONS work hand in hand to provide some sort of state in an HTTP request-response cycle. A cookie is metadata about a client sent in the request headers to a server, this cookie contains a session's ID on the server. 
A cookie is stored in a client's local storage while a session is stored in a database or cloud storage of some sort.

The flow of Cookies and Sessions is as flows:
- A Client makes request to a Server for the first time. In this first request there are no cookies sent in the request headers sent to a Server, remember this is the first time these two are ever communicating (awkward).
- The Server receives this request and recongnizes this request as the first time a client is ever making contact because it sees no cookies in the headers to match any of its sessions.
- The Server responds to the client and also sends a `set-cookie` property in the response headers to the client. This cookie contains some properties like how long it should last in the client's local storage but a major one is a `session-id` property. This Id property matches a session's id that has been created by the server in the session storage on the database
- The client receives this response and then sets this cookie in its local storage. 
- Every subsequent request from this client to this server will have the cookie attached to the request
- Since the session id in the cookie matches a session's id in the session store, the server is able to remember this certain client and perform whatever logic it wants to with this client's information. 


--- 
In the scope of this project, I have written server-side code using this technique to let my server keep information about users and their roles to be able to guard certain resources from certain users depending on these roles. A User's session is maintained for a week, so even if you close the browser, the server still remembers who you are for up to a week. (p.s, this is if you don't log out or clear cookies ;) )

I have used Passport and the Passport-local strategy to attach authenticated users to sessions and guard resources based on their roles. Of-course this can be implemented without passport but that would require a lot of custom middlewares and that would take more time. (Why reinvent the wheel?)


# Protected Resources

- A User with the role `Registrar` can only access the route '/transaction-entry' and register a transaction

- A User with the role `Registrar` can only access the route '/transaction-search' and search a transaction

- A User with the role `Admin` can only access the routes starting with '/admin/portal' and basically performing the duties of the admin stated in the roles section above

If a user tries to access a route which the user does not have access to, the user will be greeted with a 'You are not authorized to view this resource' page

To access protected routes, simply create a user with the specific role and signIn.



# Demo
- Video showing the creating of a user with the `Registrar` Role then attempting to sign In with an existing email but a wrong password and then a non-existing email finally a correct email and correct password. Also shows the ability of a registrar.

Please feel free to play around these roles and find the abilities of the other roles.


https://user-images.githubusercontent.com/49108697/233733945-d4b61ef9-9cc3-4960-aa10-ee2f68fed7b7.mp4





# PROJECT SETUP

### Installation

_Follow these steps to setup the project locally on your computer_

1. Clone the repo
```
git clone https://github.com/aytheotaku/authenticated-user-management-system.git
```

2. Install NPM Dependencies 
```
npm install
```
**_Note:_** If dependencies are deprecated at time of installation, then upgrade these packages by simplying running
```
npm audit fix --force
```

3. Create .env file <br>
When you clone this repository you will not have an env file because it would have been gitignored. Create yours and store the credentials. for example
```
DB_CONNECTION_URI =  'mongodb://127.0.0.1:27017/authDb'
SESSION_STORE_COLLECTION = 'sessionsCollection'
SESSION_SECRET = 'sessionsecret'

```
4. 
```
npm start
```
