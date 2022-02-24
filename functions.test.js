const functions = require('./functions');
const request = require('supertest');
const app = require('./index');
// Test suite is the file
// toBe
test('Adds 2 + 2 to equal 4', () => {
    expect(functions.add(2, 2)).toBe(4);
});

// notToBe
test('Adds 2 + 2 to NOT equal 5', () => {
    expect(functions.add(2, 2)).not.toBe(5);
});

// toBeNull
test('should be null', () => {
    expect(functions.isNull()).toBeNull();
});

// toBeFalsy
test('should be falsy', () => {
    expect(functions.checkValue(null)).toBeFalsy();
});

// toEqual
test('user should be Timothy Mbaka', () => {
    expect(functions.createUser()).toEqual({
        firstName: 'Timothy',
        lastName: 'Mbaka'
    });
});

// Working with async data

// Promise
test('User fetched name should be Leanne Graham', () => {
  expect.assertions(1);
  return functions.fetchUser().then(data => {
    expect(data.name).toEqual('Leanne Graham');
  });
});

// Async Await
test('User fetched name should be Leanne Graham', async () => {
    expect.assertions(1);
    const data = await functions.fetchUser();
    expect(data.name).toEqual('Leanne Graham');
});


// Describe breaks your test suite into components. 
// Depending on your test strategy, you might have a describe for each function in your class, 
// each module of your plugin, or each user-facing piece of functionality.
describe('Get User endpoint',  () => {
    test("get user", (done) => {
    
        request(app)
       .get('/user/user')
       .expect(200)
       .then(function(res) {
        done();
    })
    .catch(err => done(err));   
    });
})


describe('Post Message',  () => {
    test("post", (done) => {
    
        request(app)
        .post('/user/post')
        .send({
            title: 'sunt aut facere repellat provident',
            body: 'sunt aut facere repellat provident',
            userId: 1
          })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function(res) {
                done();
            })
        .catch(err => done(err));  

    });
})

describe('Delete Post Message',  () => {
    test("delete post", (done) => {
        request(app)
        .delete('/user/post/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function(res) {
                done();
            })
        .catch(err => done(err));  

    });
})
