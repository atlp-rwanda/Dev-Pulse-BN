import sprintService from '../services/sprintService';
import response from '../helpers/response';

class sprintController {
  static async create(req, res) {
    try {
      const result = await sprintService.createSprint(req.body);
      return response.customResponse(res, 201, 'sprint added! ', result);
    } catch (error) {
      return response.serverError(res, error);
    }
  }

  static async getAll(req, res) {
    try {
      const result = await sprintService.findAll();
      return response.customResponse(res, 200, 'sprint retrieved! ', result);
    } catch (error) {
      return response.serverError(res, error);
    }
  }
}

export default sprintController;
