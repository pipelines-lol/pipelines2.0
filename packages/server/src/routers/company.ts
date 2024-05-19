import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { companies } from "@prisma/client"
import { companySchema } from "@pipelines/database";

export const companyRouter = router({
    createCompany: publicProcedure
        .input(companySchema)
        .mutation(async ({ctx, input}) => {
            await ctx.db.companies.create({
                data: input
            })
        }),
    getCompany: publicProcedure
        .input(z.object({ id: z.string()}))
        .query(async ({ctx, input}) => {
            return await ctx.db.companies.findUnique({
                where: {
                    id: input.id
                }
            })
        }),
    getCompanies: publicProcedure
        .input(z.object({ query: z.string()}))
        .query(async ({ctx, input}) => {
            const regex = new RegExp("^" + input.query, "i")
            return await ctx.db.companies.findMany({
                where: {
                    name: regex
                }
            })
        }),
    updateCompany: publicProcedure
        .input(z.object({
            newCompany: companySchema,
            oldCompany: companySchema
        }))
        .mutation(async ({ctx, input}) => {
            // tbd
        }),
    updateCompanies: publicProcedure
        .input(z.object({
            newCompanies: companySchema.array(),
            oldCompanies: companySchema.array()
        }))
        .mutation(async ({ctx, input}) => {
            // tbd
        }),
    deleteCompanies: publicProcedure
        .input(z.object({ id: z.string()}))
        .mutation(async ({ ctx, input}) => {
            await ctx.db.companies.delete({
                where: {
                    id: input.id
                }
            })
        })
    
})