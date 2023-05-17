import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async craetePost(req, res) {
    const { content } = req.body;
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.json({ msg: "Usuario inexistente" });
      }

      const post = await prisma.post.create({
        data: {
          content,
          userId: user.id,
        },
        include: {
          author: true,
        },
      });

      return res.json(post);
    } catch (e) {
      return res.json({ msg: e.message });
    }
  },

  async FindAllPosts(req, res) {
    try {
      const posts = await prisma.post.findMany();

      return res.json(posts);
    } catch (e) {
      return res.json({ e });
    }
  },

  async UpdatePost(req, res) {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const post = await prisma.post.findUnique({ where: { id: Number(id) } });

      if (!post) {
        return res.json({ msg: "Post inexistente" });
      }

      await prisma.post.update({
        where: { id: Number(id) },
        data: { content },
      });

      return res.json({ msg: "Post Atualizado!" });
    } catch (e) {
      return res.json({ msg: e.message });
    }
  },
};
