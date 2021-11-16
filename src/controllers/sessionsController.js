import sessionsService from "../services/sessionsService";
import response from '../helpers/response';

class sessions {
    static async create(req, res) {
        try {
        const {body} = req;
        const sessions = body.map((session)=>({name:session}));
        const result = await sessionsService.createSession(sessions);
        return response.customResponse(res, 201, 'sessions added! ', result);
        } catch (error) {
            return response.serverError(res, error);
        }

    }
    static async getAll(req, res) {
        try {
            const result = await sessionsService.getAllSessions();
            return response.customResponse(res, 200, 'sessions retrieved! ', result);
        } catch (error) {
            return response.serverError(res, error);
        }
    }
    static async deleteBulk(req, res) {
        try {
            const {body} = req;
            console.log(body);
            const result = await sessionsService.deleteSessions(body);
            return response.customResponse(res, 200, 'sessions deleted! ', result);
        } catch (error) {
            return response.serverError(res, error);
        }
    }
}

export default sessions;