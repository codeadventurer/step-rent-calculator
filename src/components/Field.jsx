import { FieldContainer } from '../styles/Field'

export default function Field({label, name, type, onChange}) {
  return (
    <FieldContainer>
      <label>{label}</label>
      {type === 'select' ?
      <select name={name}>
        <option value='linear'>linear</option>
        <option value='percentual'>percentual</option>
      </select> :
      <input name={name} type={type} onChange={onChange}/>
      }
    </FieldContainer>
  )
}
