import userService from '../services/userService'
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
}


export default {
    allTraineesExists
}