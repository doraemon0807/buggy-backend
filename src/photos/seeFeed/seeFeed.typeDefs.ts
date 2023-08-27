const seeFeedTypeDefs = `#graphql

# type SeeFeedResult{
#     ok: Boolean!
#     error: String
#     photos: [Photo]
# }

type Query {
    seeFeed(offset: Int): [Photo]!
}

`;

export default seeFeedTypeDefs;
