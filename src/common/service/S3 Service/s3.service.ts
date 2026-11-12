// import {
//     DeleteObjectCommand,
//     GetObjectCommand,
//     ObjectCannedACL,
//     PutObjectCommand,
//     S3Client
// } from "@aws-sdk/client-s3";
// import { env } from "../../../configuration/env.service.js";
// import { createReadStream } from "node:fs";


// export class S3_service {

//     private client: S3Client;

//     constructor() {

//         console.log({
//             accessKeyId: env.accessKeyId ? "EXISTS" : "MISSING",
//             secretAccessKey: env.secretAccessKey ? "EXISTS" : "MISSING",
//             bucket: env.awsBucketName ? "EXISTS" : "MISSING"
//         });

//         this.client = new S3Client({
//             region: "eu-north-1",

//             credentials: {
//                 accessKeyId: env.accessKeyId as string,
//                 secretAccessKey: env.secretAccessKey as string
//             }
//         });

//     }

//     //////////////////////////////////////////////////////////////////////////////////////////////

//     async uploadfile({
//         storagekey = Multer_Storage.memoryStorage,
//         Bucket = env.awsBucketName,
//         path = "general",
//         file,
//         Acl = ObjectCannedACL.private,
//         contentType

//     }: {
//         storagekey?: Multer_Storage,
//         Bucket?: string,
//         path?: string,
//         file: Express.Multer.File,
//         Acl?: ObjectCannedACL,
//         contentType?: string
//     }) {

//         const key = `SocialMedia/${path}/${Math.round(Date.now() / 1000)}-${file.originalname}`;

//         await this.client.send(
//             new PutObjectCommand({
//                 Bucket: Bucket,
//                 Key: key,
//                 Body: storagekey == Multer_Storage.memoryStorage
//                     ? file.buffer
//                     : createReadStream(file.path),
//                 ACL: Acl,
//                 ContentType: contentType
//             })
//         );

//         return {
//             location: key
//         };
//     }

//     //////////////////////////////////////////////////////////////////////////////////////////////

//     async uploadBigfile({
//         storagekey = Multer_Storage.diskStorage,
//         Bucket = env.awsBucketName,
//         path = "general",
//         file,
//         Acl = ObjectCannedACL.private,
//         contentType,
//         PartSize = 5

//     }: {
//         storagekey?: Multer_Storage,
//         Bucket?: string,
//         path?: string,
//         file: Express.Multer.File,
//         Acl?: ObjectCannedACL,
//         contentType?: string,
//         PartSize?: number

//     }) {

//         const key = `SocialMedia/${path}/${Math.round(Date.now() / 1000)}-${file.originalname}`;

//         const result = await new Upload({
//             client: this.client,

//             params: {
//                 Bucket,
//                 Key: key,
//                 ACL: Acl,
//                 Body: storagekey == Multer_Storage.memoryStorage
//                     ? file.buffer
//                     : createReadStream(file.path),
//                 ContentType: contentType,
//             },

//             partSize: PartSize * 1024 * 1024
//         });

//         result.on("httpUploadProgress", (Progress) => {
//             console.log(
//                 `${(Progress.loaded as number) / (Progress.total as number) * 100}&`
//             );
//         });

//         await result.done();

//         return {
//             key: key
//         };
//     }

//     //////////////////////////////////////////////////////////////////////////////////////////////

//     async getFile({
//         Bucket = env.awsBucketName,
//         Key
//     }: {
//         Bucket?: string,
//         Key: string
//     }) {

//         const file = await new GetObjectCommand({
//             Bucket,
//             Key
//         });

//         return await this.client.send(file);
//     }

//     //////////////////////////////////////////////////////////////////////////////////////////////

//     async createPreSignedUrl({
//         Bucket = env.awsBucketName,
//         path = "general",
//         ContentType,
//         Key,
//         Expires = 60 * 2,
//         Originalname
//     }: {

//         Bucket?: string,
//         Key?: string,
//         Expires?: number,
//         Originalname: string,
//         path?: string,
//         ContentType: string

//     }): Promise<string> {

//         const key = `socialMedia/${path}/${Math.round(Math.random() * 1e9)}-${Originalname}`;

//         const result = new PutObjectCommand({
//             Bucket,
//             Key: key,
//             ContentType
//         });

//         const url = await getSignedUrl(this.client, result, {
//             expiresIn: Expires
//         });

//         return url;
//     }

//     //////////////////////////////////////////////////////////////////////////////////////////////

//     async deleteFile({
//         Bucket = env.awsBucketName,
//         Key,
//     }: {
//         Bucket?: string,
//         Key: string,
//     }) {

//         const result = await new DeleteObjectCommand({
//             Bucket,
//             Key
//         });

//         return this.client.send(result);
//     }

//     //////////////////////////////////////////////////////////////////////////////////////////////

// }

// export const sS3_Service = new S3_service();