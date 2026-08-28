import { useMemo, useState } from 'react'
import './App.css'

type EvalStatus = 'pass' | 'review' | 'fail'

type EvalCase = { id: string; query: string; score: number; status: EvalStatus; answer: string }

const cases: EvalCase[] = [
  { id: 'EC-208', query: 'Can I change a shipping address after ordering?', score: 0.94, status: 'pass', answer: 'Address changes are available before fulfillment begins.' },
  { id: 'EC-207', query: 'How long does an international refund take?', score: 0.72, status: 'review', answer: 'Refund timelines depend on payment rail and region.' },
  { id: 'EC-206', query: 'Can I combine two discount codes?', score: 0.41, status: 'fail', answer: 'No grounded response returned.' },
  { id: 'EC-205', query: 'Where can I download my invoice?', score: 0.89, status: 'pass', answer: 'Invoices are available under Billing history.' },
]

function App() {
  const [selectedId, setSelectedId] = useState(cases[0].id)
  const [runState, setRunState] = useState<'ready' | 'running' | 'complete'>('ready')
  const [threshold, setThreshold] = useState(0.8)
  const selected = cases.find((item) => item.id === selectedId) ?? cases[0]
  const passing = useMemo(() => cases.filter((item) => item.score >= threshold).length, [threshold])

  const runEvaluation = () => {
    setRunState('running')
    window.setTimeout(() => setRunState('complete'), 850)
  }

  return (
    <main className="forge-app">
      <header className="forge-header">
        <a href="#studio" className="forge-brand"><span>RF</span> RagForge</a>
        <nav aria-label="Primary"><a className="current" href="#studio">Evaluation studio</a><a href="#registry">Datasets</a><a href="#registry">Prompt registry</a></nav>
        <div className="header-user"><span className="presence" /> Maya Chen</div>
      </header>

      <section className="forge-body" id="studio">
        <header className="project-bar">
          <div><p>PROJECT / CUSTOMER SUPPORT</p><h1>Answer quality benchmark</h1></div>
          <button type="button" onClick={runEvaluation} disabled={runState === 'running'}>
            {runState === 'running' ? 'Running suite...' : runState === 'complete' ? 'Run again' : 'Run evaluation'}
          </button>
        </header>

        <section className="scoreboard" aria-label="Evaluation score summary">
          <article><span>Overall score</span><strong>0.84</strong><small>Target: 0.80</small></article>
          <article><span>Groundedness</span><strong>0.91</strong><small>+0.06 vs baseline</small></article>
          <article><span>Failure modes</span><strong>03</strong><small>Needs review</small></article>
          <article className="suite-state"><span>Suite status</span><strong>{runState === 'running' ? 'Running' : 'Ready'}</strong><small>42 cases · v14</small></article>
        </section>

        <section className="forge-grid">
          <aside className="settings-panel" aria-label="Evaluation controls">
            <div className="panel-title"><h2>Run configuration</h2><span>v14</span></div>
            <label htmlFor="dataset">Dataset<select id="dataset" defaultValue="Support edge cases"><option>Support edge cases</option><option>Billing regression</option><option>Product search</option></select></label>
            <label htmlFor="model">Candidate model<select id="model" defaultValue="gpt-4.1-mini"><option>gpt-4.1-mini</option><option>gpt-4.1</option><option>Claude Sonnet</option></select></label>
            <label htmlFor="threshold">Pass threshold <strong>{threshold.toFixed(2)}</strong><input id="threshold" type="range" min="0.5" max="0.95" step="0.01" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} /></label>
            <div className="threshold-note"><strong>{passing}/{cases.length}</strong><span>cases meet threshold</span></div>
          </aside>

          <section className="case-panel" aria-label="Evaluation cases">
            <div className="panel-title"><h2>Test cases</h2><span>{cases.length} examples</span></div>
            <div className="case-list">
              {cases.map((test) => (
                <button type="button" className={`case-row ${selected.id === test.id ? 'selected' : ''}`} key={test.id} onClick={() => setSelectedId(test.id)}>
                  <span className={`case-status ${test.status}`} />
                  <span className="case-copy"><small>{test.id}</small><strong>{test.query}</strong></span>
                  <strong className="case-score">{test.score.toFixed(2)}</strong>
                </button>
              ))}
            </div>
          </section>

          <article className="inspect-panel" aria-live="polite">
            <div className="panel-title"><div><p>CASE INSPECTOR</p><h2>{selected.id}</h2></div><span className={`result ${selected.status}`}>{selected.status}</span></div>
            <section><span className="inspect-label">USER QUERY</span><p>{selected.query}</p></section>
            <section><span className="inspect-label">RETRIEVAL</span><div className="retrieval"><span>Policy: fulfillment-address-update</span><strong>0.93</strong></div><div className="retrieval"><span>FAQ: address changes</span><strong>0.88</strong></div></section>
            <section><span className="inspect-label">MODEL ANSWER</span><p>{selected.answer}</p></section>
            <footer><span>Groundedness {selected.score.toFixed(2)}</span><button type="button">Add feedback</button></footer>
          </article>
        </section>
      </section>
    </main>
  )
}

export default App
