import programService from '../services/programsService';
import Response from '../helpers/response';

const programExists = async (req, res, next) => {
  try {
    const {
      body: { programId },
    } = req;
    const getProgram = await programService.getOne({ id: programId });
    if (!getProgram) {
      return Response.notFoundError(res, 'program not found');
    }
    return next();
  } catch (error) {
    return Response.serverError(res, error.message);
  }
};

export default programExists;
