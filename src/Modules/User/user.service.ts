import { TUser } from './user.interface';

const createUser = async (payload: TUser) => {
  console.log(payload);
};
export const UserServices = {
  createUser,
};
