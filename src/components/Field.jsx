import { FieldContainer, Label, Input, Select } from '../styles/Field'

export default function Field({label, name, type, value, onChange}) {
  return (
    <FieldContainer>
      <Label htmlFor={name}>{label}</Label>
      {type === 'select' ?
      <Select id={name} name={name} onChange={onChange} value={value}> 
        <option value='linear'>linear</option>
        <option value='percentual'>percentual</option>
      </Select> :
      <Input id={name} name={name} type={type} value={value} onChange={onChange} min="0"/>
      }
    </FieldContainer>
  )
}
