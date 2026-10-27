const errorHandler = (err, req, res, next) => {
  if (err.code === "P2025")
return res.status(404).json({ message: "Topilmadi" });
        if (err.code === "P2002")
    return res.status(409).json({ message: "Bunday yozuv allaqachon bor" });
  if (err.code === "P2003")
 return res
      .status(400)
.json({ message: "Bog'langan yozuv topilmadi yoki o'chirib bo'lmaydi" });

  console.error(err);
  res.status(500).json({ message: "Server xatosi" });
};

module.exports = errorHandler;
