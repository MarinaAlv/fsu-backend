const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient().$extends({
  model: {
    user: {
      async register(username, password) {
        try {
          const hash = await bcrypt.hash(password, 10);
          const user = await prisma.user.create({
            data: { username, password: hash },
          });
          return user;
        } catch (error) {
          // Add error handling here to debug more specifically
          throw new Error("User registration failed");
        }
      },
      async login(username, password) {
        const user = await prisma.user.findUniqueOrThrow({
          where: { username },
        });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw Error("Wrong password");
        return user;
      },
    },
  },
});
module.exports = prisma;
