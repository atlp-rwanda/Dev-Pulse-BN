import models from '../database/models';
import response from '../helpers/response';
import userService from '../services/userService';
import attendanceService from '../services/attendanceService';

const Attendance = models.attendance;
const { sessions } = models;

class attendanceController {
  static async create(req, res) {
    try {
      const { body: { sessionId, data } } = req;

      const sessionExists = await sessions.findOne({
        where: {
          id: sessionId,
        },
      });
      if (!sessionExists) {
        return response.customResponse(res, 404, 'Session not found', {});
      }
      Object.keys(data).forEach(async (key) => {
        const { id, attendance, comment } = data[key][0];
        const trainee = await userService.findOneUser({ id });
        await Attendance.create({
          trainee: parseInt(id),
          sessionId: parseInt(sessionId),
          attendance: parseInt(attendance),
          comment,
          programId: trainee.program,
          date: new Date(),
        });
      });
      return response.customResponse(res, 201, 'Attendance created successfully', {});
    } catch (error) {
      response.serverError(res, error.message);
    }
  }

  static async getAll(req, res) {
    try {
      const { role } = req.user;
      const attendance = (role === 'Manager' ? await Attendance.findAll({
        attributes: ['id', 'trainee', ['sessionId', 'session'], 'attendance', 'comment', 'date'],
      }) : await Attendance.findAll({
        attributes: ['id', 'trainee', ['sessionId', 'session'], 'attendance', 'comment', 'date'],
        where: {
          trainee: req.user.id,
        },
      }));
      const getSession = await sessions.findAll({
        attributes: ['id', 'name'],
      });
      const payload = { sessions: getSession, attendances: attendance };
      return response.customResponse(res, 200, 'Attendance fetched successfully', payload);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }

  static async getTraineesAttendance(req, res) {
    try {
      const { params: { id } } = req;
      const traineesRecords = await attendanceService.getByTraineeById(id);
      return response.customResponse(res, 200, 'Attendance fetched successfully', traineesRecords);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }

  static async getAttendanceByProgram(req, res) {
    try {
      const { params: { id } } = req;
      const programsRecords = await attendanceService.getByProgramId(id);
      return response.customResponse(res, 200, 'Attendance fetched successfully', programsRecords);
    } catch (error) {
      response.serverError(res, error.message); v;
    }
  }
}
export default attendanceController;
