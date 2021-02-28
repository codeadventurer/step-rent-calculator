import { FieldContainer } from '../styles/Field'

export default function Field({label, name, type, value, onChange}) {
  return (
    <FieldContainer>
      <label>{label}</label>
      {type === 'select' ?
      <select name={name} onChange={onChange} value={value}> 
        <option value='linear'>linear</option>
        <option value='percentual'>percentual</option>
      </select> :
      <input name={name} type={type} value={value} onChange={onChange}/>
      }
    </FieldContainer>
  )
}
