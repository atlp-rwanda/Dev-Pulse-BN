import database from '../database/models';

const { sessions } = database;
import { Op } from 'sequelize';




class sessionsService {
    static async createSession(data) {
        try {
            const session = await sessions.bulkCreate(data, { returning: true });
            return session;
        } catch (error) {
            throw error
        }
    }

    static async getAllSessions() {
        const session = await sessions.findAll();
        return session;
    }
    static async deleteSessions(data) {
        try {
            return await sessions.destroy({
                where: {
                    id: {
                        [Op.in]: data
                    }
                }
            });
        } catch (error) {
            throw error
        }
    }
}

export default sessionsService;