import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../prisma/client";

export async function clientRoutes(server: FastifyInstance) {
  server.get("/clients", async () => {
    return await prisma.client.findMany({
      include: { assets: true },
    });
  });

  server.post("/clients", async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      status: z.boolean(),
    });

    const { name, email, status } = bodySchema.parse(request.body);

    const client = await prisma.client.create({
      data: { name, email, status },
    });
    return reply.status(201).send(client);
  });

  server.put("/clients/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().transform(Number),
    });

    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      status: z.boolean(),
    });

    const { id } = paramsSchema.parse(request.params);
    const { name, email, status } = bodySchema.parse(request.body);

    const updated = await prisma.client.update({
      where: { id },
      data: { name, email, status },
    });
    return reply.send(updated);
  });
}
