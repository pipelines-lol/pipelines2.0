import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { schoolSchema } from "@pipelines/database";

export const schoolRouter = router({
    create: publicProcedure
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
    updateSchool: publicProcedure
        .input(z.object({
            newSchool: schoolSchema,
            oldSchool: schoolSchema
        }))
        .mutation(async ({ctx, input}) => {
            // tbd
        }),
    deleteSchool: publicProcedure
        .input(z.object({ id: z.string()}))
        .mutation(async ({ctx, input}) => {
            await ctx.db.schools.delete({
                where: {
                    id: input.id
                }
            })
        })
})