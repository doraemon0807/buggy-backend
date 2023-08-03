const seeFeedTypeDefs = `#graphql

type SeeFeedResult{
    ok: Boolean!
    error: String
    photos: [Photo]
}

type Query {
    seeFeed(lastId: Int): SeeFeedResult!
}

`;

export default seeFeedTypeDefs;
