import { CurrentUserInterface } from './../../shared/types/currentUser.interface';
import { BackendErrors } from "src/app/shared/types";

export interface AuthStateInterface{
  isSubmitted:boolean;
  isLoggedIn:boolean|null;
  backendErrors:BackendErrors|null;
  currentUser:CurrentUserInterface|null;
  isLoading:boolean
}
