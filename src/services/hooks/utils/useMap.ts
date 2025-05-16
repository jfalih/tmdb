import {useCallback, useState} from 'react';

export type MapOrEntries<K, V> = Map<K, V> | [K, V][];

// Public interface
export interface Actions<K, V> {
  /*
  set: (key: K, value: V) => void;
  */
  set: (key: K, valueOrUpdater: V | ((prevValue: V) => V)) => void;
  setAll: (entries: MapOrEntries<K, V>) => void;
  remove: (key: K) => void;
  reset: Map<K, V>['clear'];
}

// We hide some setters from the returned map to disable autocompletion
type Return<K, V> = [
  Omit<Map<K, V>, 'set' | 'clear' | 'delete'>,
  Actions<K, V>,
  number, // add a changes counter
];

export function useMap<K, V>(
  initialState: MapOrEntries<K, V> = new Map<K, V>(),
): Return<K, V> {
  const [map, setMap] = useState<Map<K, V>>(new Map<K, V>(initialState));
  const [changes, setChanges] = useState(0); // track changes, this variable added for combine usage with debounce

  const actions: Actions<K, V> = {
    /*
    set: useCallback((key, value) => {
      setMap((prev) => {
        const copy = new Map(prev);
        copy.set(key, value);
        return copy;
      });
      setChanges((prev) => prev + 1);
    }, []),
    */
    set: useCallback((key, valueOrUpdater: V | ((prev: V) => V)) => {
      setMap((prev) => {
        const copy = new Map(prev);
        const existing = copy.get(key);

        if (existing !== undefined && typeof valueOrUpdater === 'function') {
          copy.set(key, (valueOrUpdater as (prev: V) => V)(existing));
        } else {
          copy.set(key, valueOrUpdater as V);
        }

        return copy;
      });
      setChanges((prev) => prev + 1);
    }, []),

    setAll: useCallback((entries) => {
      setMap(() => new Map(entries));
      setChanges((prev) => prev + 1);
    }, []),

    remove: useCallback((key) => {
      setMap((prev) => {
        const copy = new Map(prev);
        copy.delete(key);
        return copy;
      });
      setChanges((prev) => prev + 1);
    }, []),

    reset: useCallback(() => {
      setMap(() => new Map());
      setChanges((prev) => prev + 1);
    }, []),
  };

  return [map, actions, changes];
}
