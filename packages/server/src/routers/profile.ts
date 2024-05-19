import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { profiles } from "@prisma/client"
import { profileSchema } from "@pipelines/database";


export const profileRouter = router({
    getProfiles: publicProcedure
        .query(({ ctx }) => {
            return ctx.db.profiles.findMany()
        }),
    getProfile: publicProcedure
        .input(
            z.object({
                id: z.string()
            })
        )
        .query(({ ctx, input }) => {
            return ctx.db.profiles.findFirst({ where: { id: input.id}})
        }),
    getRandomProfiles: publicProcedure
        .input(
            z.object({
                amount: z.number()
            })
        )
        .query(async ({ ctx, input }) => {
            const profileCount = await ctx.db.profiles.count()
            
            // generate random indicies
            const randomIndices: number[] = [];
            while (randomIndices.length < input.amount) {
                const randomIndex = Math.floor(Math.random() * profileCount);
                if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
                }
            }

            const profiles = await ctx.db.profiles.findMany()
            const randomProfiles: profiles[] = [];
            for (let i = 0; i < randomIndices.length; i++) {
                randomProfiles.push(profiles[randomIndices[i]]);
            }

            return randomProfiles;

        }),
    updateProfile: publicProcedure
        .input(profileSchema)
        .mutation(async ({ctx, input}) => {
            await ctx.db.profiles.update({
                where: {
                    id: input.id
                },
                data: input,
            })
        }),
    deleteProfile: publicProcedure
        .input(z.object({ id: z.string()}))
        .mutation(async ({ctx, input}) => {
            await ctx.db.profiles.delete({
                where: {
                    id: input.id
                }
            })
        })
})