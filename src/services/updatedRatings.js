import database from '../database/models';

const { updatedRatings } = database;

class UpdatedRating {
  static async addRecord(data) {
    return await updatedRatings.create(data);
  }

  static async pending() {
    const results = await updatedRatings.findAll({
      where: {
        status: 'NOT_APPROVED',
      },
      include: [
        {
          model: database.rating,
          include: [
            {
              model: database.user,
            },
          ],
        },
      ],
    });
    return results;
  }

  static async approveRating(id) {
    try {
      const result = await updatedRatings.update({ status: 'APPROVED' }, { where: { id } });
      return result;
    } catch (error) {
      return error;
    }
  }

  static async rejectRating(id) {
    try {
      const result = await updatedRatings.update({ status: 'APPROVED' }, { where: { id } });
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getById(id) {
    const rating = updatedRatings.findOne({
      where: { id },
    });
    return rating;
  }
}
export default UpdatedRating;
