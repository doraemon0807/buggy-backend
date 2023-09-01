const seeFeedTypeDefs = `#graphql

type Query {
    seeFeed(offset: Int): [Photo]!
}

`;

export default seeFeedTypeDefs;
