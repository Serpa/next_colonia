import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
const prisma = new PrismaClient();

export default async function Register(req, res) {
  const token = await getToken({ req });
  if (token) {
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
