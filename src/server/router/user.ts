import { z } from "zod";
import { createRouter } from "./context";
import * as trpc from '@trpc/server';

export const userRouter = createRouter()
  .query("get-user", {
    input: z.object({
      username: z.string()
    }),
    async resolve({input}) {
      console.log('getting user', input.username)
      const user = await prisma?.user.findUnique({
        where: {
          username: input.username
        },
        select: {
          username: true
        }
      })
      if (!user) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: `User with username ${input.username} not found`
        })
      }

      return user
    }
  })