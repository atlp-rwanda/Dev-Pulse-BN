import database from '../database/models';

const { sprint } = database;

class sessionsService {
  static async createSprint(data) {
    const createdSprint = await sprint.create(data);
    return createdSprint;
  }

  static bulkCreate(data) {
    return sprint.bulkCreate(data);
  }

  static async findOne(id) {
    const foundSprint = await sprint.findOne({
      where: { id },
    });
    return foundSprint;
  }

  static async findByNameAndProgram({ name, programId }) {
    const foundSprint = await sprint.findOne({
      where: {
        name,
        programId,
      },
    });
    return foundSprint;
  }

  static async findAll() {
    return sprint.findAll();
  }
}

export default sessionsService;
