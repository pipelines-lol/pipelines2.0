import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { profiles } from "@prisma/client";
import { profileSchema } from "@pipelines/database";

const isLinkedInImage = (pfp: string) => {
  const linkedInImageRegex = /^https:\/\/media\.licdn\.com\/dms\/image\/.+$/;

  return linkedInImageRegex.test(pfp);
};

export const pfpRouter = router({
  getPfp: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const profile = ctx.db.profiles.findUnique({ where: { id: input.id } });

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No such Profile.",
        });
      }

      const pfp = profile.pfp;

      if (!pfp) {
        return { pfp: "" };
      }

      if (pfp === "") {
        return { pfp: "" };
      }

      if (isLinkedInImage(pfp)) {
        return { pfp };
      }

      const getObjectParams = {
        Bucket: ctx.BUCKET_NAME,
        Key: pfp,
      };

      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(ctx.s3, command);

      return { pfp: url };
    }),
});
