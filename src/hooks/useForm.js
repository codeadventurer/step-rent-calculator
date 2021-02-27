import { useState } from 'react'

export default function useForm() {
  const [formValues, setFormValues] = useState({})
  const [initialized, setInitialized] = useState(false)

  const change = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: { name, value, pristine: false },
    })
  }

  const changeBatch = (updatedFields) => {
    const values = Object.keys(updatedFields).reduce(
      (acc, item) => ({
        ...acc,
        [item]: {
          name: item,
          value: updatedFields[item],
          pristine: false,
        },
      }),
      {}
    )
    setFormValues({
      ...formValues,
      ...values,
    })
  }

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

  return { change, changeBatch, formValues, initialize, initialized }
}
