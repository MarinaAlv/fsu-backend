const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

//import of the authentication to perform actions if the user is loged in
const { authenticate } = require("./auth");

// router.use();
router

  .get("/", async (req, res, next) => {
    try {
      const departments = await prisma.department.findMany();
      res.json(departments);
    } catch (e) {
      next(e);
    }
  })

  .get("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
      const department = await prisma.department.findUniqueOrThrow({
        where: { id: +id },
      });
      res.status(201).json(department);
    } catch (e) {
      next(e);
    }
  })

  .post("/", authenticate, async (req, res, next) => {
    const { name, description, image, info, professors } = req.body;
    const faculty = professors.map((id) => ({ id }));

    try {
      const department = await prisma.department.create({
        data: {
          name,
          description,
          image,
          info,
          faculty: { connect: faculty },
        },
      });
      res.status(201).json(department);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
