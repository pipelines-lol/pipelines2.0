import { Next } from "hono";
import type { HonoContext } from "../../config";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

export async function aws(c: HonoContext, next: Next) {
  const BUCKET_NAME = c.env.BUCKET_NAME;
  const BUCKET_REGION = c.env.BUCKET_REGION;
  const AWS_ACCESS_KEY_ID = c.env.AWS_ACCESS_KEY_ID;
  const AWS_SECRET_ACCESS_KEY = c.env.AWS_SECRET_ACCESS_KEY;

  const s3 = new S3Client({
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    region: BUCKET_REGION,
  });

  c.set("s3", s3);
  c.set("BUCKET_NAME", BUCKET_NAME);
  return next();
}
