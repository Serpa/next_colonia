import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

export default async function Register(req, res) {
  if (req.method === "POST") {
    const { usuario, senha, acesso, firstName, lastName, email, password } =
      req.body;

    try {
      const hash = await bcrypt.hash(senha, 0);
      await prisma.usuarios.create({
        data: {
          usuario: usuario,
          senha:  hash,
          acesso: acesso,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
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
};
