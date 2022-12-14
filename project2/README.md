**VEGGINERS**
Social net to share vegan recipes and experiences.

User Stories
**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
**homepage: NEWS** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
sign up - As a user I want to sign up on the webpage so that I can see all the events that I could attend
**login** - As a user I want to be able to log in on the webpage so that I can get back to my account
**logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
**CREATE A POST** - As a user I want to see all the events available so that I can choose which ones I want to attend
**COMMENT a Post** - As a user I want to create an event so that I can invite others to attend
**SEARCH random RECIPE** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend

**Backlog**:

NEWS:
see the list of POSTS
upload my profile picture
see other users profile
list of events created by the user
list events the user is attending

Home:
add geolocation to events when creating
show event in a map in event detail page
show all events in a map in the event list page
Homepage

...
**ROUTES**:
GET /

renders the homepage
GET /auth/signup

redirects to / if user logged in
renders the signup form (with flash msg)
POST /auth/signup

redirects to / if user logged in
body:
username
email
password
GET /auth/login

redirects to / if user logged in
renders the login form (with flash msg)
POST /auth/login

redirects to / if user logged in
body:
username
password
POST /auth/logout

body: (empty)
GET /events

renders the event list + the create form
POST /events/create

redirects to / if user is anonymous
body:
name
date
location
description
GET /events/:id

renders the event detail page
includes the list of attendees
attend button if user not attending yet
POST /events/:id/attend

redirects to / if user is anonymous
body: (empty - the user is already stored in the session)

**Models**

User model

email: email
password: String

Event model

owner: ObjectId<User>
name: String
description: String
date: Date
location: String
attendees: [ObjectId<User>]

**Links**
Trello
https://trello.com/b/7p95docl/veginners

Git
https://github.com/nzang5/vegginers.git
Repository Link

Deploy Link

Slides
The url to your presentation slides

Slides Link
