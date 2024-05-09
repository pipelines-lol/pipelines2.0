/* eslint-disable @typescript-eslint/consistent-type-definitions */

import type { Context, Input } from "hono";

export type Bindings = {
    DATABASE_URL: string;
    DIRECT_URL: string;
}

export type Variables = {
  db: any
}

export type HonoConfig = {
    Bindings: Bindings;
    Variables: Variables;
};

export type HonoContext<
  P extends string = string,
  I extends Input = Input,
> = Context<HonoConfig, P, I>;