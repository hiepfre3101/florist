import { useEffect, useState } from 'react'

const useDebounce = <T>(value: T, time: number) => {
   const [finalValue, setFinalValue] = useState<T>()
   useEffect(() => {
      const timeId = setTimeout(() => {
         setFinalValue(value)
      }, time)

      return () => {
         clearTimeout(timeId)
      }
   }, [value])
   return finalValue
}

export default useDebounce
