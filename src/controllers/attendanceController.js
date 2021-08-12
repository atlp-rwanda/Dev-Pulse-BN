import attendanceService from "../services/attendanceService";

class AttendanceController {
    async createAttendance(req, res) {
        const attend = await attendanceService.createAttendance(req.body);

        return res.status(201).send(attend);
    }

    async retrieveAllAttendances(req, res) {
        const attandances = await attendanceService.retrieveAllAttendances();
        return res.status(400).send(attandances);
    }

    async findAttendancesById(req, res) {

        try {
            const id = req.params.id;
            const attend = await attendanceService.findAttendancesById(id);
            return res.send(attend);

            //console.log(attend);

        } catch (error) {
            return res.send(error);
            // console.log(error)
        }


    };

    async findAttendancesByProgramId(req, res) {

        try {
            const programid = req.params.id;
            const attend = await attendanceService.findAttendancesByProgram(programid);
            return res.send(attend);

            //console.log(attend);

        } catch (error) {
            return res.send(error);
            // console.log(error)
        }


    };
}

export default new AttendanceController();