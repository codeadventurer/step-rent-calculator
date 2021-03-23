import { useState, useCallback } from 'react'

export default function useForm() {
  const [formValues, setFormValues] = useState({})
  const [initialized, setInitialized] = useState(false)

  const initialize = useCallback((initialValues) => {
    const values = Object.keys(initialValues).reduce(
      (acc, item) => ({
        ...acc,
        [item]: {
          name: item,
          value: initialValues[item],
          pristine: true,
        },
      }),
      {}
    )
    setInitialized(true)
    setFormValues(values)
  }, [])

  const change = useCallback((name, value) => {
    setFormValues((prevState) => ({
      ...prevState,
      [name]: { name, value, pristine: false },
    }))
  }, [])

  return { change, formValues, initialize, initialized }
}
