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
}
export default cohortService;
