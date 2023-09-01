const seePhotoLikesTypeDefs = `#graphql

    type Query{
        seePhotoLikes(id:Int!, offset:Int):[User]!
    }

`;

export default seePhotoLikesTypeDefs;
