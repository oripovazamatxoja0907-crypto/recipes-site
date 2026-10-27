const prisma = require("../prisma");

const getAll = async (req, res) => {
  res.json(await prisma.user.findMany());
};

const getOne = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
    include: { recipe: true, cooklog: true },
  });
  if (!user) return res.status(404).json({ message: "User topilmadi" });
  res.json(user);
};

const create = async (req, res) => {
  const user = await prisma.user.create({ data: req.body });
  res.status(201).json(user);
};

const update = async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(user);
};

const remove = async (req, res) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.status(204).send();
};

module.exports = { getAll, getOne, create, update, remove };
