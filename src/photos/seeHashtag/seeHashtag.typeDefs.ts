const seeHashtagTypeDefs = `#graphql
    
    type SeeHashtagResult{
        ok: Boolean!
        error: String
        hashtag: Hashtag
    }
    
    type Query{
        seeHashtag(hashtag: String!): SeeHashtagResult!
    }
`;

export default seeHashtagTypeDefs;
