/* eslint-disable @typescript-eslint/consistent-type-definitions */

import type { Context, Input } from "hono";

export type Bindings = {
  DATABASE_URL: string;
  DIRECT_URL: string;

  // Linkedin providers
  LINKEDIN_CLIENT_ID: string;
  LINKEDIN_CLIENT_SECRET: string;

  // AWS Providers
  BUCKET_NAME: string;
  BUCKET_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
};

export type Variables = {
  db: any;
  s3: any;
  BUCKET_NAME: any;
  isAuthenticated: boolean;
};

export type HonoConfig = {
  Bindings: Bindings;
  Variables: Variables;
};

export type HonoContext<
  P extends string = string,
  I extends Input = Input,
> = Context<HonoConfig, P, I>;
