const supertest = require("supertest");
const assert = require("assert");
const api_prefix = "/api/v1";

const app = "http://localhost:5000";
const server = require("request");

module.exports = {
  supertest,
  app,
  assert,
  api_prefix,
  server
};