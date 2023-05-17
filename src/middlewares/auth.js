import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({ msg: "Token Obrigatório!" });
  }
  try {
    const replace = token.replace("Bearer ", "");

    jwt.verify(replace, String(process.env.TOKEN_KEY));

    next();
  } catch (e) {
    return res.json({ msg: "Credenciais inválidas!" });
  }
};
