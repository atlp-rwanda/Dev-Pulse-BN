
/* eslint-disable indent */
const database = require('../database/models');

const Attendance = database.attendance;
const User = database.user;
const Session = database.session;


export default class attendanceService {

    // Create and Save new attendances
    static async createAttendance(attendance) {

        try {
            const attendances = await Attendance.create(attendance);
            return attendances;
        } catch (error) {
            console.log(error)
        }
    }

    static async retrieveAllAttendances() {
        try {
            const attendances = await Attendance.findAll();
            return attendances;
        } catch (error) {
            return error;
        }
    }

    static async findAttendancesById(userId) {

        try {
            const attendances = await User.findAndCountAll({

                include: [{ model: Attendance, where: { trainee: userId } }]


            });
            return attendances;
        } catch (error) {
            return error;
        }


    };

    static async findAttendancesByProgram(program) {

        try {
            const attendances = await Session.findAndCountAll({

                include: [{ model: Attendance, where: { sessionid: program } }]


            });
            return attendances;
        } catch (error) {
            return error;
        }


    };

}
