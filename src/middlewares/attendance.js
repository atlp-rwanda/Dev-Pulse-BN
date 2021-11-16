import userService from '../services/userService';
import AttendanceService from '../services/attendanceService';
import Response from '../helpers/response';

const allTraineesExists = async (req, res, next) => {
  try {
    const { data } = req.body;
    const allTrainees = Object.keys(data);
    const trainees = await userService.getTraineesById(allTrainees);
    if (trainees.length !== allTrainees.length) {
      return Response.customResponse(res, 400, 'Some trainees do not exist');
    }
    next();
  } catch (error) {
    throw new Error(error);
  }
};

const isSessionAssociatedWithAttendance = async (req, res, next) => {
  try {
    const { body } = req;
    const getBySessions = await AttendanceService.getBySessions(body);
    if (getBySessions.length > 0) {
      return Response.customResponse(res, 400, 'Session(s) already associated with attendance');
    }
    return next();
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  allTraineesExists,
  isSessionAssociatedWithAttendance,
};
