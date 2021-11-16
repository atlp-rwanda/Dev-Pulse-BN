import sprintService from '../services/sprintService';
import Response from '../helpers/response';

const sprintExists = async (req, res, next) => {
  try {
    const sprintId = req.query.sprintId || req.body.sprintId;
    if (sprintId) {
      const getsprint = await sprintService.findOne(sprintId);
      if (!getsprint) {
        return Response.notFoundError(res, 'sprint not found');
      }
      req.sprintName = getsprint.name;
      req.sprintId = getsprint.id;
      return next();
    }

    return Response.badRequestError(res, 'Sprint is required');
  } catch (error) {
    return Response.serverError(res, error.message);
  }
};

export const getSprintByName = async (req, res, next) => {
  try {
    const { name, programId } = req.body;
    const sprint = await sprintService.findByNameAndProgram({ name, programId });
    if (sprint) {
      return Response.badRequestError(res, 'Sprint already exists');
    }
    return next();
  } catch (error) {
    return Response.serverError(res, error.message);
  }
};

export default sprintExists;
