
# MovieStorage

## Description

MovieStorage is a RESTful web service built with Node.js, TypeScript, and Express. The service processes CSV data and allows you to manage a collection of movies. It supports parsing CSV files and performing specific calculations,.

## Features

- CSV data parsing for movie information
- Ability to perform calculations based on movie data
- In-memory database with SQLite and Sequelize
- Integration tests using Jest
- Health route for monitoring the application's status
- **/producers-awards** route to fetch producers with the largest gap between consecutive awards and the fastest two awards

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable applications
- **TypeScript**: A superset of JavaScript with static typing
- **Express**: Web framework for Node.js
- **SQLite**: In-memory database for storing data
- **Sequelize**: ORM for interacting with SQLite
- **Jest**: Testing framework for integration tests

## File Structure
- __MovieStorage__
   - [LICENSE](LICENSE)
   - [README.md](README.md)
   - [jest.config.js](jest.config.js)
   - [node\_modules](node_modules)
   - [package\-lock.json](package-lock.json)
   - [package.json](package.json)
   - __src__
     - __app__
       - [app.ts](src/app/app.ts)
       - [csvParser.ts](src/app/csvParser.ts)
       - [movieService.ts](src/app/movieService.ts)
     - __data__
       - [Movielist.csv](src/data/Movielist.csv)
   - __tests__
     - [movieService.test.ts](tests/movieService.test.ts)
   - [tsconfig.json](tsconfig.json)


## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 22.x)
- [npm](https://www.npmjs.com/) (>= 10.x)

### Steps

1. Clone the repository:
```bash
   git clone https://github.com/ModestoDigital/MovieStorage.git
   cd movie-storage
```

2. Install dependencies:

```bash
Copy code
npm install
Run the application:
```
```bash
Copy code
npm run start:dev
The application will run on http://localhost:3000.
```

3. Usage
#### Endpoints
GET /health: Check the health of the application.

GET /producers-awards: Fetch producers with the largest gap between consecutive awards and the fastest two awards.

Example response:

json
Copy code
{
  "min": [
    {
      "producer": "Producer 1",
      "interval": 1,
      "previousWin": 2008,
      "followingWin": 2009
    },
    {
      "producer": "Producer 2",
      "interval": 1,
      "previousWin": 2018,
      "followingWin": 2019
    }
  ],
  "max": [
    {
      "producer": "Producer 1",
      "interval": 99,
      "previousWin": 1900,
      "followingWin": 1999
    },
    {
      "producer": "Producer 2",
      "interval": 99,
      "previousWin": 2000,
      "followingWin": 2099
    }
  ]
}
4. Running Tests
To run integration tests for the application:

```bash
Copy code
npm run test
This will run Jest with the specified configuration.
```
Running a specific test:
```bash
Copy code
npm run checkTest
```
Scripts
start: Starts the application in production mode.

```bash
npm run start
```
start:dev: Starts the application in development mode with nodemon.

```bash
Copy code
npm run start:dev
```

test: Runs Jest tests for integration.

````bash
Copy code
npm run test
````

checkTest: Runs Jest tests and detects open handles.

````bash
Copy code
npm run checkTest
````

5. License
MIT License

Copyright (c) 2025 Daniel Modesto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
Acknowledgements
Node.js for the runtime
TypeScript for static typing
Express for building the web service
Sequelize for ORM support with SQLite
Jest for testing

