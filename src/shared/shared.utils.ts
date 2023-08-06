import {
  CompleteMultipartUploadCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

export const uploadPhoto = async (file, userId: number) => {
  const credentials = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
    },
  };

  const { filename, createReadStream } = await file;
  const stream = createReadStream();
  const objectName = `${userId}-${Date.now()}-${filename}`;

  try {
    const parallelUploads3 = new Upload({
      client: new S3Client(credentials),
      params: {
        Bucket: process.env.AWS_BUCKET,
        Key: objectName,
        Body: stream,
        ACL: "public-read-write",
      },
    });

    const { Location }: CompleteMultipartUploadCommandOutput =
      await parallelUploads3.done();

    return Location;
  } catch (e) {
    console.log(e);
  }
};
