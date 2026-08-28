type FieldProps = {
  id: string
  label: string
  placeholder: string
  value: string
  helper?: string
  type?: string
  onChange: (value: string) => void
}

export function Field({
  id,
  label,
  placeholder,
  value,
  helper,
  type = 'text',
  onChange,
}: FieldProps) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {helper ? <small>{helper}</small> : null}
    </label>
  )
}
