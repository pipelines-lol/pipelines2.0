import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const schoolRouter = router({
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                domains: z.string().array(),
                country: z.string(),
                state_province: z.string(),
                alpha_two_code: z.string(),
                web_pages: z.string().array(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.schools.create({
                data: {
                    name: input.name,
                    domains: input.domains,
                    country: input.country,
                    state_province: input.state_province,
                    alpha_two_code: input.alpha_two_code,
                    web_pages: input.web_pages,
                }
            })
        })
})