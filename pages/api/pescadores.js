import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function pescadores(req, res) {
  const token = await getToken({ req });
  if (token) {
    if (req.method === "GET") {
      try {
        const getPescadores = await prisma.pescadores.findMany({
          where: {
            nome_colonia: {
              id: token.user.acess,
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
