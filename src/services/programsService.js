/* eslint-disable class-methods-use-this */
import models from '../database/models';

const { program, cohort } = models;

class programsService {
  static async create(programData) {
    return program.create(programData);
  }

  static async getOne(where) {
    const { dataValues } = await program.find({
      where,
      attributes: ['id', 'name', 'start_date', 'end_date', 'cohortId'],
      include: [
        {
          model: cohort,
        },
      ],
    });

    return dataValues;
  }

  static async getAll() {
    return program.findAll({
      attributes: ['id', 'name', 'start_date', 'end_date', 'cohortId'],
      include: [
        {
          model: cohort,
        },
      ],
    });
  }

  static async removeOne(id) {
    const found = await program.findOne({ where: { id } });
    const deleted = await program.destroy({ where: { id } });
    if (!deleted) return null;
    return found;
  }

  static async exists(id) {
    return program.findOne({ where: { id } });
  }

  static async update(id, programData) {
    return program.update(programData, { where: { id } });
  }
}
export default programsService;
