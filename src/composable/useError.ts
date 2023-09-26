import { useNotyf } from "./useNotyf";

export function useError(error: string) {
  const notyf = useNotyf();
  notyf.error(error);
}
