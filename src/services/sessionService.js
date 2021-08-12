
/* eslint-disable indent */
const database = require('../database/models');

const Session = database.session;
//const Comment = db.comments;

export default class sessionService {

    // Create and Save new attendances
    static async createSession(session) {

        try {
            const sessions = await Session.create(session);
            return sessions;
        } catch (error) {
            console.log(error)
        }
    }

}
