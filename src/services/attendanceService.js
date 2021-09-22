import models from '../database/models';

const { attendance,  user } = models;

class attendanceTrainees{
    static async getByTraineeById(traineeId){
        try {
            const attendanceTrainees = attendance.findAll({
                where: {
                    trainee: traineeId,
                },
                include:[{
                    model: user,
                    as: 'traineeInfo',
                }]
            });
            return attendanceTrainees;
        } catch (error) {
            throw error;
        }
    }
    static async getByProgramId(programId){
        try {
            const records = await attendance.findAll({
                where: {
                    programId: programId,
                },
                include:[{
                    model: user,
                    as: 'traineeInfo',
                }]
            });
            return records;
        } catch (error) {
            throw error;
        }
    }

}
export default attendanceTrainees;