import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]"
const prisma = new PrismaClient();

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    if (req.method === "GET") {
      try {
        const getPescadores = await prisma.pescadores.findMany({
          where: {
            nome_colonia: {
              id: session.token.user.acess,
            },
          },
        });
        return res.status(200).json(getPescadores);
      } catch (err) {
        return res.status(503).json({ err: err.toString() });
      }
    } else {
      return res
        .status(405)
        .json({ error: "This request only supports POST requests" });
    }
  } else {
    res.status(401);
  }
  res.end();

};
