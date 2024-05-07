/* eslint-disable @typescript-eslint/consistent-type-definitions */

import type { Context, Input } from "hono";

export type Bindings = {
    DATABASE_URL: string;
}

export type HonoConfig = {
    Bindings: Bindings;
};

export type HonoContext<
  P extends string = string,
  I extends Input = Input,
> = Context<HonoConfig, P, I>;