import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default {
  async createUser(req, res) {
    try {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPassword;
      const { name, email, password } = req.body;

      let user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        return res.json({ error: "já existe um usuário com este email!" });
      }

      user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      return res.json(user);
    } catch (e) {
      return res.json({ e });
    }
  },
  async findAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (e) {
      return res.json({ e });
    }
  },

  async findUser(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.json({ msg: "não foi possivel encontrar o usuário!" });
      }

      return res.json(user);
    } catch (e) {
      return res.json({ e });
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      let user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.json({ msg: "não foi possivel encontrar o usuário!" });
      }
      user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email, password },
      });

      return res.json(user);
    } catch (e) {
      return res.json({ e });
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.json({ msg: "Não possivel encotrar esse usuario" });

      await prisma.user.delete({ where: { id: Number(id) } });

      return res.json({ msg: "Usuario deletado" });
    } catch (e) {
      return res.json({ e });
    }
  },
};
