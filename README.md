# Zendesk Ticket Challenge

## Functional Requirements

* Connect to the API
* Request all the tickets for your account
* Display them in a list
* Display individual ticket details
* Page through tickets when more than 25 are returned

## Gotchas

* Do Not Use ​Javascript in the browser (running on Node is fine). You won’t be able to successfully complete a GET request as we prevent cross-domain requests.
* Remember that even though the response comes back as JSON format it is still just a string and needs to be parsed to be of any use to you.
* Use basic authentication.

## Approach

Use a back-end technology to connect to the ticket server API and pull the data for display. Basic Authentication and token access for API requests. I decided to use Node/Express because I enjoy JavaScript and wanted to learn more about it, with practice writing tests in Mocha/Chai. The tests are for API request data counts, fetching individual ID's and app server connectivity.

## Technologies Used

### Server Side
* Node
* Express
* EJS templating styled with Materialize CSS
* Nodemon for restarting server with development changes

### Testing
* Mocha
* Chai

## Usage

1. Clone the repository and install the node dependencies
  ```
  git clone https://github.com/jwon114/ticket_challenge.git
  npm install
  ```

2. Start the server 
  ```
  npm start
  ```

3. Run tests
  ```
  npm test
  ```

## Screenshots

Index View
![alt text](https://github.com/jwon114/ticket_challenge/raw/master/screenshots/index.png "All Tickets Index View")

Single Ticket View
![alt text](https://github.com/jwon114/ticket_challenge/raw/master/screenshots/single_ticket.png "Single Ticket View")

Pagination
![alt text](https://github.com/jwon114/ticket_challenge/raw/master/screenshots/pagination.png "Pagination")

Error Page
![alt text](https://github.com/jwon114/ticket_challenge/raw/master/screenshots/error.png "Page Error View")
