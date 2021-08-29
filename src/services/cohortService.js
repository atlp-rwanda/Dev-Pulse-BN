import models from '../database/models';

const { cohort } = models;

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
    const found = await cohort.findOne({ where });
    const deleted = await cohort.destroy({ where });

    if (!deleted) return null;
    return found;
  }

  static async updateOne(where, data) {
    const updated = await cohort.update(data, { where });

    if (!updated) return null;
    return updated;
  }
}
export default cohortService;
