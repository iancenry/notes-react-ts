import { useEffect, useState } from 'react'

/**
 * Stores values in localStorage
 * @type {T} Function receives a type
 * @param {string} key - Label for local storage
 * @param {T | Function} initialValue - default initial value
 * @returns {Array, Function}
 */

export const useLocalStorage = <T>(key: string, intialValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    // if data is in local storage
    const jsonValue = localStorage.getItem(key)

    if (jsonValue == null) {
      //if value doesnt exist in local storage

      if (typeof intialValue === 'function') {
        return (intialValue as () => T)()
      } else {
        return intialValue
      }
    } else {
      return JSON.parse(jsonValue)
    }
  })

  // update
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [T, typeof setValue]
}
