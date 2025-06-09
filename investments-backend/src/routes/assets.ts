import { FastifyInstance } from "fastify";
import { prisma } from "../prisma/client";
import { z } from "zod";

export async function assetRoutes(server: FastifyInstance) {
  server.get("/assets", async () => {
    const assets = await prisma.asset.findMany();
    return assets;
  });

  server.post("/assets", async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      price: z.number(),
    });

    const { name, price } = bodySchema.parse(request.body);

    const asset = await prisma.asset.create({
      data: { name, price },
    });
    return reply.status(201).send(asset);
  });
}
