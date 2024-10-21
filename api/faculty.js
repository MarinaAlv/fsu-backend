const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const faculty = await prisma.professor.findMany();
    res.json(professors);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const professor = await prisma.professor.findUniqueOrThrow({
      where: { id: +id },
    });
    res.json(professor);
  } catch (error) {
    next(error);
  }
});
