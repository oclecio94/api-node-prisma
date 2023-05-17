import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.json({ msg: "Email e senha são obrigatórios!" });
    }

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return res.json({ msg: "Email e/ou senha incorretos!" });
    }
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email,
          name: user.name,
        },
        String(process.env.TOKEN_KEY),
        {
          expiresIn: "6h",
        }
      );
      return res.json({ token });
    } else {
      return res.json({ msg: "Email e/ou senha incorretos!" });
    }
  } catch (e) {
    return res.json({ e });
  }
};
