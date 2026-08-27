import { useAppDispatch } from "@/app/store/hooks";
import { signOutSession } from "../store/auth.slice";

export const useSignOut = () => {
  const dispatch = useAppDispatch();

  const signOutUser = async () => {
    return await dispatch(signOutSession()).unwrap();
  };

  return {
    signOutUser,
  };
};
