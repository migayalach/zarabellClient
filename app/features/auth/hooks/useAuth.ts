import { useAppSelector } from "@/app/store/hooks";
import {
  selectAuthUser,
  selectAuthLoading,
  selectAuthError,
  selectInitialized,
} from "../store/auth.selector";

export const useAuth = () => {
  const user = useAppSelector(selectAuthUser);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const initialized = useAppSelector(selectInitialized);

  return { user, loading, error, initialized };
};
