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

describe('status endpoint',  () => {
    test("fetch user", (done) => {
    
        request(app)
       .get('/user/user')
       .expect(200)
       .then(function(res) {
        done();
    })
    .catch(err => done(err));   
    });
})

