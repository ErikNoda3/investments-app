import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../prisma/client";

export async function clientAssetRoutes(server: FastifyInstance) {
  server.get("/clients/:id/assets", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().transform(Number),
    });
    const { id } = paramsSchema.parse(request.params);

    const allocations = await prisma.clientAsset.findMany({
      where: { clientId: id },
      include: { asset: true },
    });
    return allocations;
  });

  server.post("/clients/:id/assets", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().transform(Number),
    });
    const bodySchema = z.object({
      assetId: z.number(),
      quantity: z.number(),
    });

    const { id } = paramsSchema.parse(request.params);
    const { assetId, quantity } = bodySchema.parse(request.body);

    const existing = await prisma.clientAsset.findUnique({
      where: {
        clientId_assetId: {
          clientId: id,
          assetId,
        },
      },
    });

    if (existing) {
      const updated = await prisma.clientAsset.update({
        where: { id: existing.id },
        data: { quantity },
      });
      return reply.send(updated);
    }

    const allocation = await prisma.clientAsset.create({
      data: {
        clientId: id,
        assetId,
        quantity,
      },
    });

    return reply.status(201).send(allocation);
  });
}
