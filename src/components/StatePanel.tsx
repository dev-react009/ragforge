type StatePanelProps = {
  state: 'loading' | 'empty' | 'error'
  title: string
}

export function StatePanel({ state, title }: StatePanelProps) {
  return (
    <div className={`state-panel state-${state}`}>
      <h3>{title}</h3>
      {state === 'loading' ? <p>Preparing component bundles...</p> : null}
      {state === 'empty' ? <p>Try adjusting your search query.</p> : null}
      {state === 'error' ? <p>Please retry in a few moments.</p> : null}
    </div>
  )
}
