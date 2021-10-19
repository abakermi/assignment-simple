const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType, Kind } = require('graphql')

let dataSource = require('./data/checklist.json');

dataSource = dataSource.map((e) => {
    e.dueDate = new Date(e.dueDate)
    return e
})


// should be separated
const DateType = new GraphQLScalarType({
    name: 'DateType',
    description: 'Date type',
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Query error: Can only parse dates strings, got a: ${ast.kind}`,
                [ast],
            );
        }
        if (isNaN(Date.parse(ast.value))) {
            throw new GraphQLError(`Query error: not a valid date`, [ast]);
        }
        return new Date(ast.value);
    },
})

const typeDefs = gql`
  
type Task{
    title: String
    status:Boolean
}

  type Checklist {
    reference: String
    dueDate: DateType
    isLaunch: Boolean
    isWorkingDay: Boolean
    tasks: [Task]
    
  }
  scalar DateType

  type Query {
    checklists: [Checklist]
    findByRef(ref: String): Checklist
  }
`;

const resolvers = {
    Query: {
        checklists: () => dataSource.sort((a, b) => b.dueDate - a.dueDate),
        findByRef: (_, { ref }) => dataSource.find((e) => e.reference == ref)

    },
    DateType
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Appolo server ready at ${url}`);
});
