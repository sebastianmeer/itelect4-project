import { useCallback, useState } from "react";

export function useToggle(
  initialValue: boolean = false,
): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback((): void => {
    setValue((current: boolean): boolean => !current);
  }, []);

  return [value, toggle];
}
