import { useEffect, useState } from "react";

export function useInitialLoading(
  loadData: () => void | Promise<unknown>,
  resetData?: () => void,
  enabled = true,
) {
  const [initialLoading, setInitialLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) return;

    const load = async () => {
      try {
        await loadData();
      } finally {
        setInitialLoading(false);
      }
    };

    load();

    return () => {
      resetData?.();
    };
  }, [enabled]);

  return initialLoading;
}
