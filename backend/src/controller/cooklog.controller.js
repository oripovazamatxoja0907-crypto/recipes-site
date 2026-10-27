const prisma = require("../prisma");

const getAll = async (req, res) => {
  const { recipeId, userId } = req.query;
  const logs = await prisma.cookLog.findMany({
    where: {
      ...(recipeId && { recipeId: Number(recipeId) }),
      ...(userId && { userId }),
    },
    include: { recipe: { select: { id: true, title: true } } },
    orderBy: { cookedAt: "desc" },
  });
  res.json(logs);
};

const getOne = async (req, res) => {
  const log = await prisma.cookLog.findUnique({
    where: { id: Number(req.params.id) },
    include: { recipe: true },
  });
  if (!log) return res.status(404).json({ message: "Log topilmadi" });
  res.json(log);
};

const create = async (req, res) => {
  const log = await prisma.cookLog.create({ data: req.body });
  res.status(201).json(log);
};

const update = async (req, res) => {
  const log = await prisma.cookLog.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(log);
};

const remove = async (req, res) => {
  await prisma.cookLog.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
};

module.exports = { getAll, getOne, create, update, remove };
