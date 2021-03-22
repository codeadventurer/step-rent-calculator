import { FieldContainer } from '../styles/Field'

export default function Field({label, name, type, value, onChange}) {
  return (
    <FieldContainer>
      <label htmlFor={name}>{label}</label>
      {type === 'select' ?
      <select id={name} name={name} onChange={onChange} value={value}> 
        <option value='linear'>linear</option>
        <option value='percentual'>percentual</option>
      </select> :
      <input id={name} name={name} type={type} value={value} onChange={onChange}/>
      }
    </FieldContainer>
  )
}
