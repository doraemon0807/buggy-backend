const searchPhotosTypeDefs = `#graphql

    type Query{
        searchPhotos(keyword:String!, offset: Int): [Photo]!
    }
`;

export default searchPhotosTypeDefs;
