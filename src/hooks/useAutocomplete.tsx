import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export function useAutocomplete(
  fn: (value: string) => Promise<any[]>,
): [any[], (value: string) => void, () => void] {
  const [options, setOptions] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebounce(search, 750);

  const onChange = useCallback(() => {
    fn(search).then(setOptions);
  }, [debouncedSearch]);

  useEffect(() => {
    onChange();
  }, [onChange]);

  return [options, setSearch, onChange];
}
