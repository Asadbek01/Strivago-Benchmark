import dotenv from 'dotenv'
import supertest from 'supertest'
import mongoose from 'mongoose'
import { server } from '../app'

dotenv.config()
const request = supertest(server)
const { MONGO_URL_TEST } = process.env

if (!MONGO_URL_TEST) throw new Error('Add Environment Variables')

describe('Testing all the user routes', () => {

    beforeAll(done => {
        mongoose.connect(MONGO_URL_TEST, () => {
            console.log('Connected to DB')
            done()
        })
    })

    afterAll(done => {
        mongoose.connection.dropDatabase()
            .then(() => {
                return mongoose.connection.close()
            })
            .then(done())
    })

    // Test user Validity

    const validUserRegistration = {
        name: 'Asadbek',
        surname: 'Azamjonov',
        email: 'Asadbek@gmail.com',
        password: '1234'
    }

    const InvalidUserRegistration = {
        name: 'jscbjkbsc',
        email: 'Asadbek@gmail.com',
        password: '1234'
    }

    const validHouseRequest = {
        name: "Test",
        host: "",
        description: "description",
        maxGuests: 10
    }
    const InvalidHouseRequest = {
        name: "Test",
        host: "",
        description: "description",
    }

    const InvalidUserLogin ={
        name:"Unknown",
        password: "0000"
    }

    // const validAccomadationRequest = {
    //     name: "big house",
    //     description: "cool",
    //     maxGuests: 5, 
    //     host: ""
    // }


    it('Should create a new user with a hashed password but not returned', async () => {
        const response = await request.post('/users/register').send(validUserRegistration)
        expect(response.status).toBe(200)
        expect(response.body._id).toBeDefined()
        expect(response.body.password).not.toBeDefined()
        validHouseRequest.host = response.body._id
    })

    it('Shouldnt  create a new user but should return 400 because of required property', async () => {
        const response = await request.post('/users/register').send(InvalidUserRegistration)
        expect(response.status).toBe(400)
        expect(response.body.message).toBeDefined()
        InvalidHouseRequest.host = response.body._id
    })

    it('Shouldnt  create a new user but should return 400 because of required property', async () => {
        const response = await request.post('/users/login').send(InvalidUserLogin)
        expect(response.status).toBe(401)
    })

    it("should return the GET/ user information", async () => {
        const response = await request.get('/users')
        expect(response.status).toBe(200)
    })

    //  Accomadation
    // let houseId: string
    // it('should add a new accomadation', async () => {
    //     const response = await request.post('/accommodations').send(validAccomadationRequest)
    //     expect(response.status).toBe(200)
    //     expect(response.body._id).toBeDefined()
    //     houseId = response.body._id
    // })
    it("should return the GET/ Accomadation information", async () => {
        const response = await request.get('/accommodations')
        expect(response.status).toBe(200)
    })


})