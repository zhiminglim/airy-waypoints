
<!-- PROJECT LOGO -->
<br />
<p align="center">
    <h3 align="center">Hi there 👋 I'm Zhiming!</h3>
    <p align="center">
    AIR Lab Tech Challenge
    <br />
    <a href="https://gameofwits.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/zhiminglim/airy-waypoints/issues">Report Bug</a>
    ·
    <a href="https://github.com/zhiminglim/airy-waypoints/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">The Start</a>
      <ul>
        <li><a href="#response-sample">Response Samples</a></li>
        <li><a href="#get-request-sid">GET /api/v1/sids/busy-waypoints</a></li>
        <li><a href="#get-request-stars">GET /api/v1/stars/busy-waypoints</a></li>
      </ul>
    </li>
    <li><a href="#code">The Code</a></li>
    <li><a href="#test">The Test</a></li>
    <li><a href="#build">The Build</a></li>
    <li><a href="#cicd">The CI/CD</a></li>
    <li><a href="#cicd">The Easter Egg</a></li>
    <li><a href="#cicd">Feedback & Takeaways</a></li>
    <li><a href="#cicd">Others</a></li>
    <li><a href="#cicd">Acknowledgements</a></li>
  </ol>
</details>

## About The Project


![readme-franchise-atm](https://user-images.githubusercontent.com/21197092/111905230-887b5680-8a85-11eb-82ca-8712791d0ea3.jpg)
<br />

AIR Lab has provided endpoints for accessing services provided by the Open ATMS systems.

🚀 **The Challenge:** Access those APIs, manipulate the data retrieved, and return processed data in JSON.

As I have been learning Javascript in my spare time, I decided to use that knowledge to build a stand-alone web service with **Node.js** and **Express**, and then call the APIs in my personal website to display the JSON data in a user friendly manner.

*Side note: There was no particular reason choosing Javascript over Java for this web service in terms of performance (this is a whole separate topic on its own). It was simply because I have been building web services with Javascript in my spare time* 😆


## The Start

First, a small introduction on the technologies used. **Express** is a minimal and flexible Node.js web application framework that helps developers to manage routing, requests, and views. Given that the tasks was to find the top 2 waypoints that are associated with the most number of SIDs, and also for STARs, I used Express to handle requests in this web service via the following endpoints:

```
1. GET /api/v1/sids/busy-waypoints
2. GET /api/v1/stars/busy-waypoints
```

### Response Samples
The actual responses are shown in the images below, but you may also head over to the hosted web app by clicking on the following links to have a look as well (more on how this is hosted later on).  🙂


#### GET /api/v1/sids/busy-waypoints

https://busy-waypoints.azurewebsites.net/api/v1/sids/busy-waypoints
![readme-api-get-sids-json](https://user-images.githubusercontent.com/21197092/111905225-874a2980-8a85-11eb-94f8-13c3e99f7a84.png)


#### GET /api/v1/stars/busy-waypoints

https://busy-waypoints.azurewebsites.net/api/v1/stars/busy-waypoints
![readme-api-get-stars-json](https://user-images.githubusercontent.com/21197092/111905231-887b5680-8a85-11eb-84df-ddf424438e6e.png)


## [The Code](https://github.com/zhiminglim/airy-waypoints/blob/master/index.js)

As I had to make 2 different API requests, the first being to retrieve a list of airports, and the second which is to retrieve a list of SIDs for each airport, I made use of **async/await** in Javascript to handle fetching of consecutive requests that require information from the previous request.

After getting all the information I needed, I looped through the lists of SIDs, and for each SID, I keep records of the waypoints by using a Javascript Map object, structured in the example here where I used the *key* as the waypoint, and the *value* as the counter:

key (waypoint) | value (occurrence)
--- | -----
waypoint1 | 2
waypoint3 | 9
waypoint4 | 4

Finally I processed the map to return a sorted array, where I would extract out the top 2 waypoints, and then packaged it into a JSON response with the appropriate format.


## The Test


## The Build


## The CI/CD


## The Easter Egg


## Feedback & Takeaways


## Others


## Acknowledgements

