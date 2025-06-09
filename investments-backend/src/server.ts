// src/server.ts
import Fastify from "fastify";
import cors from "@fastify/cors";
import { clientRoutes } from "./routes/clients";
import { assetRoutes } from "./routes/assets";
import { clientAssetRoutes } from "./routes/clientAssets";

const app = Fastify();

app.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});
app.register(clientRoutes);
app.register(assetRoutes);
app.register(clientAssetRoutes);

app.listen({ port: 3001 }, () => {
  console.log("HTTP server running on port 3001");
});
