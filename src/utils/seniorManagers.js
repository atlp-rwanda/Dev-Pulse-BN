import dotenv from 'dotenv';

dotenv.config();
const seniorManagers = process.env.SENIOR_MANAGERS.split(',') || [];

export default seniorManagers;
