import { environment } from '../../environments/environment';
import { Environment } from '../../environments/environment.model';

export const useEnv: <T extends keyof Environment>(key: T) => Environment[T] = <T extends keyof Environment>(
  key?: T,
) => {
  return environment[key];
};
