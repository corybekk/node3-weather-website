const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')



//*** example ***/
// test() function used to run tests
// first arg is the test name, 2nd arg is the code which will verify the feature is working as expected
// if the function does not throw an error. the test is a success
// command: npm test (script specified in package.json)
test('Hello World', () =>{

})

test('geocode function', (done) => { // use done as a callback. this way the geocode function will wait for the callback to finish.
    geocode('Santa Rosa California', (error, response) => {
        if (error){
            return done(error)
        }
        expect(response.location).toBe('Santa Rosa, California, United States')
        done()
    }) 
})

test('forecast function', (done) => {
    forecast('38.4405', '-122.7144', (error, response) =>{
        if (error) {
            throw new Error(done(error))   
        }
        done() //response output will always be different so I dont match it with any expected 
    })
})

// ** example failure test **
// test('this should fail',() =>{
//     throw new Error('failure')
// })

