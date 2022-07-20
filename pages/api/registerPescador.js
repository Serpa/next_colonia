import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]"
const prisma = new PrismaClient();

export default async function Register(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    if (req.method === "POST") {
      let { ...data } = req.body;
      data = { ...data, acesso: token.user.acess };
      try {
        await prisma.pescadores.create({
          data,
        });

        return res.status(200).end();
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
}
