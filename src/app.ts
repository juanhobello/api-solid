import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

export const app = fastify()

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: 'Juan Bello',
    email: 'juan.bello@gmail.com',
  }
})