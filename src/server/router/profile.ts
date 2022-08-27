import { z } from "zod";
import { createProtectedRouter } from "./protected-router";
import * as trpc from '@trpc/server';

export const profileRouter = createProtectedRouter()
  .query('get-profile', {
    input: z.object({
      id: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      if (!input.id) {
        throw new trpc.TRPCError({ code: 'NOT_FOUND' });
      }

      const profile = await prisma?.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          profile: true,
        },
      });
      return profile;
    }
  });