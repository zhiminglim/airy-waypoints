const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
var index = require("../index.js");
var request = require("request");

chai.use(chaiHttp);
var host = "http://localhost:5000";

describe("Busy Waypoints Finder", () => {
  describe("Retrieve top 2 waypoints associated with the most SIDs", () => {
    var path = "/api/v1/sids/busy-waypoints";

    it("it should return a JSON of airports and topWaypoints", (done) => {
      chai.request(host)
      .get(path)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        res.body.should.be.a("array");

        var result = res.body;
        result.forEach((e) => {
          e.should.have.keys("airport", "topWaypoints");
        });

        done();
      })
    })
  })

  describe("Retrieve top 2 waypoints associated with the most STARs", () => {
    var path = "/api/v1/stars/busy-waypoints/";

    it("it should return a JSON of airports and topWaypoints", (done) => {
      chai.request(host)
      .get(path)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        res.body.should.be.a("array");

        var result = res.body;
        result.forEach((e) => {
          e.should.have.keys("airport", "topWaypoints");
        });

        done();
      })
    })
  })
})