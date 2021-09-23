import models from '../database/models';

const { cohort, user: users, program } = models;

class cohortService {
  static async addCohort(cohortData) {
    return cohort.create(cohortData);
  }

  static async getAllCohorts() {
    return cohort.findAll();
  }

  static async findOne(params) {
    return cohort.findOne({ where: params });
  }

  static async deleteOne(where) {
    const found = await cohort.findOne({
      where,
      include: [{ model: users, as: 'users' }, { model: program, as: 'programs' }],
    });

    if (found.users.length) {
      return { error: 'Please remove existing users to the cohort' };
    }
    if (found.programs.length) {
      return { error: 'Please remove existing programs of the cohort' };
    }

    const deleted = await cohort.destroy({ where });

    if (!deleted) return { error: 'Unable to delete cohort' };
    return { deleted: found };
  }

  static async updateOne(where, data) {
    const updated = await cohort.update(data, { where });

    if (!updated) return null;
    return updated;
  }
}
export default cohortService;
