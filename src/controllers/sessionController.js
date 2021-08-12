import sessionService from "../services/sessionService";

class SessionController {
    async createSession(req, res) {
        const sess = await sessionService.createSession(req.body);

        return res.status(201).send(sess);
    }
}

export default new SessionController();