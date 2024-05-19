import { MiddlewareFunction, ProcedureParams } from "@trpc/server";

// type for having encapsulated middleware
// @see https://stackoverflow.com/questions/73763655/trpc-how-to-encapsulate-middleware - Encapsulating Middleware
// example function:

/*
    export const myMiddleWareFunc: BaseMiddlewareFunction<
    {
        req?: Request
    }
    > = (opts) => {
    const req =  opts.ctx.req 

    return opts.next({ctx: {
        ...opts.ctx, 
        'foo': 'bar'
    }})
    }
*/

// MUST define the elements within your ctx
// and their type, as done with "req"
// TODO: maybe find a better way to encapsulate tRPC middleware, or just put it in the trpc.ts file

export type BaseMiddlewareFunction<$ContextIn> = MiddlewareFunction<
  { _ctx_out: $ContextIn } & ProcedureParams,
  ProcedureParams
>