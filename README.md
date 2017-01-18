# MEAN Sample App

A Node app (Express web server) built with MongoDB and Angular. For demonstration purposes.
We are dealing with simple entities that correspond to a property having:
  - name
  - address
  - phone
  - email
  - location {lon, lat}

Node provides the RESTful API that is performing all the CRUD operations.
Angular provides the frontend SPA and accesses the API.

## Requirements

- [Node and npm](http://nodejs.org)
- MongoDB - install it locally - here I am using the test database with the campings collection
- start MongoDB: run this (for MacOSX) 

'''
mongod
'''

- some sample data are loaded into the MongoDB by issuing the command from the fixtures directory:

'''
mongoimport -d test -c campings --file campingsData.json --jsonArray
'''

## Installation

1. Install the application: `npm install`
2. Start the server: `node server.js`
3. View in browser at `http://localhost:8080`

## GULP AUTOMATION

There are several example of tasks that can be performed with gulp. The available tasks are included in the
task folder

1. Scrap of some website for collecting fixture data (gulp scrap or simply gulp). This will generate the 
2. Deployment to Amazon Web Services
3. Development tasks
4. Production pre-deployment tasks

## Reamrks / Improvments to be done

1. Separate totally the FRONTEND from API: bootstrap the Angular app and organize it in modules using Browserify
2. Unit and functional testing (Karma / ProtractorJs)
3. Not all tasks are fully functional (some of them are needing some configuration params first)




