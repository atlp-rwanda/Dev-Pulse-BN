/* eslint-disable class-methods-use-this */
import models from '../database/models';

const { program, cohort, user, rating } = models;

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
    const found = await program.findOne({
      where: { id },
      include: [{ model: user, as: 'users' }],
    });
    if (found.users.length) {
      return { error: 'Some users are using this program!' };
    }
    const rate = await rating.findOne({ where: { program: found.id } });
    if (rate) return { error: 'Please remove ratings associated to program' };
    const deleted = await program.destroy({ where: { id } });
    if (!deleted) return { error: 'Unable to delete program!' };
    return { deleted: found };
  }

  static async exists(id) {
    return program.findOne({ where: { id } });
  }

  static async update(id, programData) {
    return program.update(programData, { where: { id } });
  }
}
export default programsService;
