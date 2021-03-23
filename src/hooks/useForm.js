import { useState } from 'react'

export default function useForm() {
  const [formValues, setFormValues] = useState({})
  const [initialized, setInitialized] = useState(false)

  const initialize = (initialValues) => {
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
  }

  const change = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: { name, value, pristine: false },
    })
  }

  return { change, formValues, initialize, initialized }
}
