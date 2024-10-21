const prisma = require('../prisma');
const {faker} = require('@faker-js/faker');

const seed = async (numDepartments = 5, numProfessors = 20) => {
  for (let i = 0; i < numDepartments; i++) {
    await prisma.department.create({
      data: {
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
        image: faker.image.avatar(),
        info: faker.lorem.sentence(),
      },
    });
    const Professors = Array.from({length: numProfessors}, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      bio: faker.lorem.paragraph(),
      image: faker.image.avatar(),

      departmentId: i + 1,
    }));
    await prisma.professor.createMany({
      data: Professors,
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
