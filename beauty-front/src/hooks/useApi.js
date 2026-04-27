import { useState, useEffect, useCallback } from "react";

/**
 * useApi — lightweight data fetching hook
 *
 * Usage:
 *   const { data, loading, error, refetch } = useApi(
 *     () => appointments.list({ date: today }),
 *     []   // deps — refetch when these change
 *   );
 */
export function useApi(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/use-memo
  }, deps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

/**
 * useMutation — for POST/PUT/DELETE operations
 *
 * Usage:
 *   const { mutate, loading, error } = useMutation(
 *     (data) => appointments.create(data),
 *     { onSuccess: (result) => console.log(result) }
 *   );
 */
export function useMutation(mutator, { onSuccess, onError } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await mutator(...args);
        setData(result);
        onSuccess?.(result);
        return result;
      } catch (err) {
        const msg = err.message || "Operation failed";
        setError(msg);
        onError?.(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [mutator, onSuccess, onError],
  );

  return { mutate, loading, error, data };
}
