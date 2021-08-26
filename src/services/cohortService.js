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
    const deleted = await cohort.delete({ where });

    if (!deleted) return null;
    return deleted;
  }

  static async updateOne(where, data) {
    const updated = await cohort.update(data, { where });

    if (!updated) return null;
    return updated;
  }
}
export default cohortService;
