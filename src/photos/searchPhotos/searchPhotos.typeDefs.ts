const searchPhotosTypeDefs = `#graphql
    type SearchPhotosResult {
        ok: Boolean!
        error: String
        photos: [Photo]
    }

    type Query{
        searchPhotos(keyword:String!, lastId: Int): SearchPhotosResult!
    }
`;

export default searchPhotosTypeDefs;
