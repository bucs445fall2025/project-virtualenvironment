const test = require('node:test');
const assert = require('node:assert/strict');

// Modules to mock manually
const Project_Data = require('../models/dataModel');
const {storeProject, getProjects, loadProject, deleteProject} = require('../controllers/dataController');

function mockReq(body = {}, session = {}) {
    return { body, session };
  }

function mockRes(){
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
    }
}

test('store projects works as expected', async () => {
    Project_Data.findOne = async () => null;
    Project_Data.create = async () => null;

    const req = mockReq({
        create_new: true,
        project_name: "test",
        resolution: [],
        layers: [],
        layer_data: []
    },
{user: {
    email: "test@test.com"
}});
    const res = mockRes();
    await storeProject(req, res);

    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.jsonData, {redirect: "/dashboard", name: 'test'});

    const req_two =  mockReq({
        create_new: false,
        project_name: "test",
        resolution: [],
        layers: [],
        layer_data: []
    },
    {user: {
        email: "test@test.com"
    }});

    Project_Data.findOne = async () => {
        return{
        data: null,
        save(){
            this.data = null;
        },
    }

    };
    await storeProject(req_two, res);
    assert.deepEqual(res.jsonData, {message: "save success"});
});

test('getProjects works as expected', async () => {
    const req = mockReq({
    },
{user: {
    email: "test@test.com"
}});
    Project_Data.find = async () => {
        return ["Project A", "Project B"];
    }
    const res = mockRes();
    await getProjects(req, res);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.jsonData, {names: ['Project A', 'Project B']});
})

test('loadProject works as expected', async () => {
    const req = mockReq({
        project_name: "test"
    },
{user: {
    email: "test@test.com"
}});
    const res = mockRes();
    Project_Data.findOne = async () => {
        return {
            data: "test_data"
        }
    }
    await loadProject(req, res);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.jsonData, {data:"test_data"});
    });

test('deleteProject works as expected', async () => {
    const req = mockReq({
        project_name: "test"
    },
{user: {
    email: "test@test.com"
}});
    const res = mockRes();
    Project_Data.deleteOne = async () => null;
    await deleteProject(req, res);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.jsonData, {message: "Deleted Successfully"});
})
