import {
  CompleteMultipartUploadCommandOutput,
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const credentials = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
};

export const uploadToS3 = async (
  file,
  userId: number,
  folderName: string,
  existingUrl?: string
) => {
  const { filename, createReadStream } = await file;
  const stream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;

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

    // if edit photo, then delete old photo
    if (existingUrl) {
      await deleteFromS3(existingUrl, folderName);
    }

    return Location;
  } catch (e) {
    console.log(e);
  }
};

export const deleteFromS3 = async (url: string, folderName: string) => {
  const splitArray = url.split("/");
  const fileToDelete = `${folderName}/${splitArray[splitArray.length - 1]}`;

  const client = new S3Client(credentials);
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: fileToDelete,
  });

  await client.send(command);
};
