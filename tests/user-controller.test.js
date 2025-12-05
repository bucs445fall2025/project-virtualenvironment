// Tests the User-Controller functionality (Authentication)
const { registerUser, loginUser, currentUser, logoutUser } = require("../controllers/userController");

const test = require('node:test');
const assert = require('node:assert/strict');

// Modules to mock manually
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Helper: mock req & res
function mockReq(body = {}, session = {}) {
  return { body, session };
}

function mockRes() {
  return {
    statusCode: null,
    jsonData: null,
    cookieData: null,

    status(code) {
      this.statusCode = code;
      return this;
    },

    json(data) {
      this.jsonData = data;
      return this;
    },

    cookie(name, value, options) {
      this.cookieData = { name, value, options };
      return this;
    },

    clearCookie(name) {
        this.clearCookieCalled = true;
    }

  };
}

test('registerUser functions as expected', async () => {
    User.findOne = async () => null;
    bcrypt.hash = async () => "test_password"
    User.create = async () => ({
      id: "abc123",
      username: "test_user",
      email: "test@test.com"
    });
    jwt.sign = () => "fake_token";

    const req = mockReq(
        {
          username: "test_user",
          email: "test@test.com",
          password: "test_password"
        },
        {}      
      );
    const res = mockRes();

    await registerUser(req, res);

    assert.equal(res.statusCode, 201);

    assert.deepEqual(res.jsonData, {
        _id: "abc123",
        email: "test@test.com",
        redirect: '/homepage'
    });
}); 

test('loginUser functions as expected', async () => {
    User.findOne = async () => 'test@test.com';
    bcrypt.compare = async () => true;
    jwt.sign = () => "fake_token";

    const req = mockReq(
        {
          email: "test@test.com",
          password: "test_password"
        },
        {}      
      );
    const res = mockRes();

    await loginUser(req, res);

    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.jsonData, {
        redirect: '/homepage',
    })
})

test('logoutUser functions as expected', async () => {
    const req = {
        session: {
            user: {id: "123"},
        save(callback) {
            this.saveCalled = true;
            callback(null); // simulate no error
          },
    
        regenerate(callback) {
        this.regenerateCalled = true;
        callback(null); // simulate no error
        }
    }
    }
    const res = mockRes();
    await logoutUser(req, res);

    assert.equal(res.statusCode, 201);
    assert.deepEqual(res.jsonData, {
        redirect: '/',
    })
    assert.equal(req.session.regenerateCalled, true);
    assert.equal(req.session.saveCalled, true);
    assert.equal(res.clearCookieCalled, true);


})