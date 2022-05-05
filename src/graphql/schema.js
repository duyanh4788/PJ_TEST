const { buildSchema } = require('graphql');

const graphqlSchema = buildSchema(`
    type  Users {
        id : Int!
        account: String!
        passWord: String!
        fullName: String!
        birthDay: String!
        phone: Int!
        isActive: Boolean!
        userTypeCode: String!
    }

    input InputUsers {
        account: String!
        passWord: String!
        fullName: String!
        birthDay: String!
        phone: Int!
        isActive: Boolean!
        userTypeCode: String!
    }

    type rootMutation{
        createUser (inputUsers : InputUsers) : Users
    }

    type rootQuery{
        user(id : Int) : Users!
        users : [Users]!
    }

    schema {
        query : rootQuery
        mutation : rootMutation
    }
`)

module.exports = {
    graphqlSchema
}