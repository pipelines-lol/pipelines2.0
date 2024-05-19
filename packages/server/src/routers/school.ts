import { z } from "zod";
import { authenticatedProcedure, publicProcedure, router } from "../trpc";
import { schoolSchema } from "@pipelines/database";

export const schoolRouter = router({
    create: authenticatedProcedure
        .input(schoolSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.schools.create({
                data: input
            })
        }),
    getSchool: publicProcedure
        .input(z.object({ id: z.string()}))
        .query(async ({ctx, input}) => {
            return await ctx.db.shcools.findUnique({
                where: {
                    id: input.id
                }
            })
        }),
    getSchools: publicProcedure
        .query(async ({ctx}) => {
            return await ctx.db.schools.findMany()
        }),
    searchSchools: publicProcedure
        .input(z.object({ query: z.string()}))
        .query(async ({ctx, input}) => {
            const regex = new RegExp("^" + input.query, "i")
            return await ctx.db.schools.findMany({
                where: {
                    name: regex
                }
            })
        }),
    updateSchool: authenticatedProcedure
        .input(z.object({
            newSchool: schoolSchema,
            oldSchool: schoolSchema
        }))
        .mutation(async ({ctx, input}) => {
            // tbd
        }),
    deleteSchool: authenticatedProcedure
        .input(z.object({ id: z.string()}))
        .mutation(async ({ctx, input}) => {
            await ctx.db.schools.delete({
                where: {
                    id: input.id
                }
            })
        })
})