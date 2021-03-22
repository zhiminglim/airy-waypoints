
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
      <a href="#the-functionality">The Functionality</a>
      <ul>
        <li><a href="#response-samples">Response Samples</a></li>
      </ul>
    </li>
    <li><a href="#the-code">The Code</a></li>
    <li><a href="#the-test">The Test</a></li>
    <li><a href="#the-cicd">The CI/CD</a></li>
    <li><a href="#the-easter-egg">The Easter Egg</a></li>
    <li><a href="#feedback-and-takeaways">Feedback and Takeaways</a></li>
    <li><a href="#others">Others</a></li>
    <li><a href="#references">References</a></li>
  </ol>
</details>

## About The Project


![readme-franchise-atm](https://user-images.githubusercontent.com/21197092/111905230-887b5680-8a85-11eb-82ca-8712791d0ea3.jpg)
<br />
<br />

AIR Lab has provided endpoints for accessing services provided by the Open ATMS systems.

🚀 **The Challenge:** Access those APIs, manipulate the data retrieved, and return processed data in JSON.

As I have been learning Javascript in my spare time, I decided to use that knowledge to build a stand-alone web service with **Node.js** and **Express**, and then call the APIs in my personal website to display the JSON data in a user friendly manner.

*Side note: There was no particular reason choosing Javascript over Java for this web service in terms of performance (this is a whole separate topic on its own). It was simply because I have been building web services with Javascript in my spare time* 😆


## The Functionality

First, a small introduction on the technologies used. **Express** is a minimal and flexible Node.js web application framework that helps developers to manage routing, requests, and views. Given that the tasks was to find the top 2 waypoints that are associated with the most number of SIDs, and also for STARs, I used Express to handle requests in this web service via the following endpoints:

```
1. GET  /api/v1/sids/busy-waypoints
2. GET  /api/v1/stars/busy-waypoints
```

### Response Samples
The actual responses are shown in the images below, but you may also head over to the hosted web app by clicking on the following links to have a look as well (more on how this is hosted later on).  🙂

<br />

**GET /api/v1/sids/busy-waypoints**
https://busy-waypoints.azurewebsites.net/api/v1/sids/busy-waypoints
![readme-api-get-sids-json](https://user-images.githubusercontent.com/21197092/111905225-874a2980-8a85-11eb-94f8-13c3e99f7a84.png)

<br />

**GET /api/v1/stars/busy-waypoints**
https://busy-waypoints.azurewebsites.net/api/v1/stars/busy-waypoints
![readme-api-get-stars-json](https://user-images.githubusercontent.com/21197092/111905231-887b5680-8a85-11eb-84df-ddf424438e6e.png)


## The Code

*(logic in <a href="https://github.com/zhiminglim/airy-waypoints/blob/master/index.js" target="_blank">index.js</a>)*

As I had to make 2 different API requests, the first being to retrieve a list of airports, and the second which is to retrieve a list of SIDs for each airport, I made use of **async/await** in Javascript to handle fetching of consecutive requests that require information from the previous request *(in this case, I needed to know the list of airports before retrieving the list of SIDs)*.

After getting all the information I needed, I looped through the lists of SIDs, and for each SID, I keep records of the waypoints by using a Javascript Map object, structured in the example here where I used the waypoint as the *key*, and a counter as the *value*:

key (waypoint) | value (counter)
--- | -----
WP111 | 2
WP222 | 9
WP333 | 4
... | ...

Finally I processed the map to return a sorted array, where I would extract out the top 2 waypoints, and then packaged it into a JSON response with the appropriate format.

The same is done for STARs statistics.


## The Test
With Node.js I used a testing library called [Mocha](https://mochajs.org/), and paired it with assertion libraries like [Chai](https://www.chaijs.com/) and [Should](https://shouldjs.github.io/), which provides BDD/TDD styles.

Code sample for local testing:
*(actual [test code](https://github.com/zhiminglim/airy-waypoints/blob/master/test/index.js) in /test/index.js)*

```javascript
describe("Busy Waypoints Finder", () => {
  describe("Retrieve top 2 waypoints associated with the most SIDs", () => {
    var path = "http://localhost:5000/api/v1/sids/busy-waypoints";
    
    it("it should return a JSON of airports and topWaypoints", (done) => {
      chai.request(host)
      .get(path)
      .end((err, res) => {
	    if (err) done(err);
	    res.should.have(status.200);
	    res.body.should.be.a("array");
	    
	    res.body.forEach((e) => {
		  e.should.have.keys("airport", "topWaypoints");
		});
		done();
	  });
    });
  });
});

```

After setting up the installations and test script in package.json, I simply had to run tests with:

```bash
$ npm test
```

and the result will be as followed:

![npm-test-example](https://user-images.githubusercontent.com/21197092/111941264-a095b900-8b0b-11eb-9882-c8d620cfe96a.png)


## The CI/CD

Now the DevOps/fun part! 🥳

For my personal projects I've learnt to deploy my applications to platforms like Heroku and Netlify, but I wanted to learn how to do it on Azure this time.

I started with creating a Resource Group in Azure, followed by creating an Azure Container Registry (ACR), which is like a repository that is able to host Docker images.

![azure-acr-page](https://user-images.githubusercontent.com/21197092/111942392-26b2ff00-8b0e-11eb-972e-4423282d5882.png)

To use Docker, I created a **Dockerfile** so that Docker can build images automatically by reading the instructions written inside. This file will be in the root directory of the app.

Next, I head over to Azure DevOps, and created a new project with a new pipeline to automate the building and pushing of a docker image which is based on my code on GitHub.

*Configuring the pipeline:*

![azure-pipeline-creation](https://user-images.githubusercontent.com/21197092/111954995-e2caf480-8b23-11eb-9dfd-5f5fddac84fc.png)


*Build success:*
![azure-pipeline-build-success](https://user-images.githubusercontent.com/21197092/111956382-aef0ce80-8b25-11eb-9fde-b67b0cf8c49d.png)

When the pipeline build has completed, it means that the built Docker image has now been pushed to the Azure Container Registry (ACR).

**Deployment**
With the ACR image ready, I created a Web App in Azure, and configure it to publish with Docker by selecting the image from ACR.

![azure-web-app-config](https://user-images.githubusercontent.com/21197092/111957285-c67c8700-8b26-11eb-9fbf-924d7847eb03.png)

After turning Continuous Deployment *"On"* in the Deployment Center settings, Azure creates a Webhook in the ACR so that whenever I push to the master branch in GitHub, the changes are automatically updated on the web app.

*Website URL available at:*
https://busy-waypoints.azurewebsites.net/

*Endpoints:*
https://busy-waypoints.azurewebsites.net/api/v1/sids/busy-waypoints
https://busy-waypoints.azurewebsites.net/api/v1/stars/busy-waypoints


## The Easter Egg

With all that in mind, I proceed to create a simple frontend page (built with React), nestled within my current Game of WITs app to display the top waypoints for SIDs and STARs. 

You may head over to my app at https://gameofwits.netlify.app/ and click on the Play button for the Omok Card to visualize the waypoints. *(here's the [git repo](https://github.com/zhiminglim/game-of-wits) for my Game of WITs app if you're interested to take a look)*

For visualization, I used the [CanvasJS](https://canvasjs.com/) library which provides an API to display a nice and simple chart for the information collected. 📊

![gameofwits-airlab-example-sids](https://user-images.githubusercontent.com/21197092/111959266-30962b80-8b29-11eb-8871-93e87b6d8922.png)

## Feedback and Takeaways

- Very engaging tech challenge that provided a lot of avenue for learning
- Opportunity to leverage theoretical knowledge of topics like containerization, CI/CD, and put them into practice
- Learned how to use Azure, Azure DevOps and pipelines
- Explored TDD and BDD frameworks

## Others


📝 *How would I work differently if this was a two week sprint:*
- Make use of scrum artifacts like the product backlog and sprint backlog
- Daily scrum to answer questions that help to achieve sprint goal
- Create a trello board to manage the above

📦 *Improve code for production quality:*
- Right now testing is being done locally, but I would like to learn how to integrate testing into the pipeline
- Reduce latency for web service requests



## References

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.dev/)
- [Netlify](https://www.netlify.com/)
- [Azure](https://azure.microsoft.com/en-us/)
- [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Deploy Node.js to Azure Web App](https://www.avanade.com/en/blogs/techs-and-specs/software-development/deploying-node-js-api-to-azure-web-apps)
- [Mocha tutorial](https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha)
- [Canvas.js](https://canvasjs.com/)
- [AIR Lab](https://www.airlab.aero/)
- [StackEdit](https://stackedit.io/)

