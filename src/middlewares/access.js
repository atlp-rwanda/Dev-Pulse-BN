import Response from '../helpers/response';

export const isManager = (req,res,next)=>{
    if(req.user.role != 'Manager'){

        return Response.authorizationError(res, 'Forbiden');
    }

    next();
}