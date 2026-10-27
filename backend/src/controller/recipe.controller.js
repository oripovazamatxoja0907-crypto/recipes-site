const prisma = require("../prisma");

const getAll = async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(recipes);
};

const getOne = async (req, res) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: Number(req.params.id) },
    include: { cookLogs: true },
  });
  if (!recipe) return res.status(404).json({ message: "Retsept topilmadi" });
  res.json(recipe);
};

const create = async (req, res) => {
  const recipe = await prisma.recipe.create({ data: req.body });
  res.status(201).json(recipe);
};

const update = async (req, res) => {
  const recipe = await prisma.recipe.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(recipe);
};

const remove = async (req, res) => {
  await prisma.recipe.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
};

module.exports = { getAll, getOne, create, update, remove };
