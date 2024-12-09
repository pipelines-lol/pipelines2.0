import { z } from "zod";
import { authenticatedProcedure, publicProcedure, router } from "../trpc";
import { profiles } from "@prisma/client";
import { profileSchema } from "@pipelines/database";
import { auth } from "../middlewares";

export const profileRouter = router({
  getProfiles: publicProcedure.query(({ ctx }) => {
    return ctx.db.profiles.findMany();
  }),
  getProfile: authenticatedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.db.profiles.findFirst({ where: { id: input.id } });
    }),
  getRandomProfiles: publicProcedure
    .input(
      z.object({
        amount: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const profiles = await ctx.db.profiles.findMany();

      if (profiles.length == 0) {
        return [];
      }

      const randomProfiles: profiles[] = [];
      while (randomProfiles.length < input.amount) {
        const randomIndex = Math.floor(Math.random() * profiles.length);
        if (
          profiles[randomIndex].pipeline.length > 0 &&
          profiles[randomIndex].pfp
        ) {
          randomProfiles.push(profiles[randomIndex]);
        }
      }

      return randomProfiles;
    }),
  updateProfile: authenticatedProcedure
    .input(profileSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.profiles.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
  deleteProfile: authenticatedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.profiles.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
