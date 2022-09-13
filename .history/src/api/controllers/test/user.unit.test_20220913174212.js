const { it, expect, beforeEach, afterAll, afterEach, beforeAll } = require("@jest/globals");
const User = require("../../models/User");
const controller = require("../user");

const mongoose = require("mongoose");

 let mongo = null;
 
 const connectDB = async () => {
   mongo = await MongoMemoryServer.create();
   const uri = mongo.getUri();
  
   await mongoose.connect(uri, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
 };
/**
 * Drop database, close the connection and stop mongod.
 */
 const dropDB = async () => {
    if (mongo) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongo.stop();
    }
  };
/**
 * Remove all the data for all db collections.
 */
 const dropCollections = async () => {
    if (mongo) {
      const collections = await mongoose.connection.db.collections();
      for (let collection of collections) {
        await collection.remove();
      }
    }
  };

  module.exports = { connectDB, dropDB, dropCollections}
const sample = {
    chargeFlatRate: false,
    chargeByWeight: false,
    chargeByDistance: false,
    providerId: 7
};

const sample2 = {
    chargeFlatRate: false,
    chargeByWeight: false,
    chargeByDistance: false,
};

const sample3 = {
    chargeFlatRate: false,
    chargeByWeight: true,
    chargeByDistance: true,
    providerId: 7
};

User.create = jest.fn();
let next;
    beforeAll(async () => {
        await connectDB();
      });
       
      afterAll(async () => {
        await dropDB();
      });

      beforeEach(() => {
        next = null;
        req = null;
        res = null;
      })
      
describe("Create User Test", () => {
    it("should have a addUser function", () => {
        expect(typeof controller.addUser).toBe("function");
    })

    it("should pass when AddUser id updated for the first time", async () => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        req.body = sample;
        await controller.addUserPreference(req, res, next);
        expect(res.statusCode).toEqual(201)
        expect(res._getJSONData()).toStrictEqual({message: 'User Preference Updated Successfully', success: true});
    })

    it("should fail addUserPreference if No ProviderId", async () => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        req.body = sample2;
        await controller.addUserPreference(req, res, ()=>{
            expect(res.statusCode).toEqual(404);
            expect(res._getJSONData()).toStrictEqual({message: 'Provider cannot be empty', success: false});
        });
    })

    it("should pass addUserPreference Update User Details if Exists ProviderId", async () => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        req.body = sample3;
        await controller.addUserPreference(req, res, ()=>{
            expect(res.statusCode).toEqual(200);
            expect(res._getJSONData()).toStrictEqual({message: 'User Preference Updated Successfully', success: true});
        });

    })

})

describe("Retrieve User Details Tests", () => {

    it("should have a getMyUserPreference function", () => {
        expect(typeof controller.getMyUserPreference).toBe("function");
    })


    it("should pass getMyUserPreference Details if Authenticated and Records Exists in main backend", async () => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();

        try {
            let token = await loginProvider();

            const data = {
                success: true,
                data: {
                  _id: "631dc6a522a944ec94df9685",
                  firstName: "israel",
                  lastName: "lastName",
                  middleName: "middleName",
                  address: "address",
                  phoneNumber: "90123456789",
                  phoneNumber2: "9023456789",
                  whatsapp: "whatsapp",
                  email: "test1@email.com",
                  providerId: 1,
                  createdAt: "2022-09-11T11:29:41.933Z",
                  updatedAt: "2022-09-11T11:29:41.933Z",
                  __v: 0
                }
              };

              axios.get.mockResolvedValueOnce(data);

            // when
            req.headers.authorization = token;
              await controller.getMyUserPreference(req, res, ()=>{
                expect(res.statusCode).toEqual(200);
                expect(res._getJSONData()).toStrictEqual(data);
            });

        } catch (error) {
            
        }
    })

})