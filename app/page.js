'use client'

import { useMemo, useState } from 'react'
import { Activity, Atom, BrainCircuit, Gauge, Layers3, LockKeyhole, Rocket, ShieldCheck, Sparkles, Zap } from 'lucide-react'

const gates = [
  { id: 1, title: 'Stabilize plasma', subtitle: 'External field + rotating plasma', status: 'VALIDATING', detail: 'The external magnetic-field concept is the central technical thesis. The decision is whether stability and confinement continue to improve as the device scales.' },
  { id: 2, title: 'Scale fusion output', subtitle: '5 × 10¹⁰ n/s claimed', status: 'PROGRESSING', detail: 'The deck reports neutron yield rising from roughly 10⁷ to 5 × 10¹⁰ n/s over three years. The next question is the engineering threshold required for the next device.' },
  { id: 3, title: 'Demonstrate positive energy', subtitle: 'Decisive value inflection', status: 'NEXT GATE', detail: 'A credible positive-energy demonstration is the clearest transition from promising fusion physics to a believable commercial power platform.' },
  { id: 4, title: 'Engineer a power system', subtitle: 'Compact, modular reactor', status: 'FUTURE', detail: 'After positive energy, the problem changes from physics proof to repeatability, thermal management, maintainability and economics.' }
]

const roadmap = [
  { years: '2026–2030', label: 'Prove the core', copy: 'Positive-energy validation, higher neutron-source strength and multi-beam research systems.' },
  { years: '2031–2035', label: 'Engineer the system', copy: 'Small-reactor demonstration, fusion-fission hybrid engineering and D-He3 ambitions.' },
  { years: '2035+', label: 'Commercialize', copy: 'Demonstrate reactor economics and expand into high-demand energy applications.' }
]

const answers = {
  risks: 'Three critical risks dominate the program: plasma stability must keep scaling, positive energy has not yet been demonstrated, and successful physics must still translate into an economically manufacturable reactor.',
  dd: 'D-D reduces dependence on scarce tritium and creates a possible path toward D-He3. The tradeoff is harder ignition, so the architecture must compensate with stronger plasma conditions.',
  value: 'The sharpest valuation inflection is a convincing positive-energy result. Neutron-yield growth strengthens the story, but net energy is the milestone that changes how strategic partners and investors underwrite the company.',
  moat: 'The most defensible moat would be repeatable experimental performance built on the external-field stabilization method, pulsed-power engineering, simulation tooling, accumulated experimental know-how and patent coverage.'
}

export default function Page() {
  const [tab, setTab] = useState('program')
  const [selectedGate, setSelectedGate] = useState(gates[2])
  const [selectedRoadmap, setSelectedRoadmap] = useState(roadmap[0])
  const [conf, setConf] = useState(20)
  const [dens, setDens] = useState(15)
  const [temp, setTemp] = useState(10)
  const [scenario, setScenario] = useState({ score: 19, uplift: 22, driver: 'Confinement', decision: 'Continue validation' })
  const [answer, setAnswer] = useState('Choose an executive question. This prototype answers from the supplied company deck, not from live internal systems.')

  const metrics = useMemo(() => [
    ['Neutron yield', '5.0 × 10¹⁰', 'n/s · claimed current result', Activity],
    ['3-year improvement', '5,000×', '10⁷ → 5×10¹⁰ n/s', Zap],
    ['Next decisive gate', 'Positive energy', '2026–2030 roadmap', Gauge],
    ['Core IP', '15', 'claimed invention patents', ShieldCheck],
  ], [])

  function runScenario(e) {
    e.preventDefault()
    const score = Math.min(100, Math.round(conf * .45 + dens * .35 + temp * .2))
    const uplift = Math.round(conf * .55 + dens * .4 + temp * .25)
    const drivers = [
      ['Confinement', conf], ['Density', dens], ['Temperature', temp]
    ].sort((a,b) => b[1] - a[1])
    setScenario({
      score,
      uplift,
      driver: drivers[0][0],
      decision: score >= 65 ? 'Escalate experiment' : 'Continue validation'
    })
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brandWrap"><img src="/hope-logo.svg" alt="HOPE" className="brand" /></div>
        <div className="eyebrow">LIGHTNING FUSION</div>
        <h1>Mission Control</h1>
        <p className="subtle">Experiment → ignition → commercial energy</p>
        <nav>
          {[
            ['program','Program',Layers3],
            ['experiment','Experiment Lab',Atom],
            ['roadmap','Roadmap',Rocket],
            ['intel','HOPE Intelligence',BrainCircuit],
          ].map(([id,label,Icon]) => (
            <button key={id} onClick={() => setTab(id)} className={tab===id?'navBtn active':'navBtn'}>
              <Icon size={17}/><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="demoNote"><LockKeyhole size={15}/><span>Prototype · deck-grounded demo data</span></div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <div className="eyebrow">EXECUTIVE OPERATING VIEW</div>
            <h2>{tab === 'program' ? 'Path to commercial fusion' : tab === 'experiment' ? 'Experiment scenario model' : tab === 'roadmap' ? 'Program roadmap' : 'HOPE Intelligence'}</h2>
          </div>
          <div className="livePill"><span></span> DEMO MODE</div>
        </header>

        <div className="metricGrid">
          {metrics.map(([label,value,foot,Icon]) => <div className="metric" key={label}><div className="metricTop"><span>{label}</span><Icon size={17}/></div><strong>{value}</strong><small>{foot}</small></div>)}
        </div>

        {tab === 'program' && <div className="split">
          <div className="panel">
            <div className="panelTitle"><div><div className="eyebrow">PROGRAM GATES</div><h3>What must become true next</h3></div><Sparkles size={19}/></div>
            <div className="gateList">
              {gates.map(g => <button key={g.id} className={selectedGate.id===g.id?'gate selected':'gate'} onClick={() => setSelectedGate(g)}><div className="gateNum">0{g.id}</div><div className="gateCopy"><strong>{g.title}</strong><span>{g.subtitle}</span></div><div className="status">{g.status}</div></button>)}
            </div>
          </div>
          <div className="panel insight">
            <div className="eyebrow">SELECTED GATE</div>
            <h3>{selectedGate.title}</h3>
            <p>{selectedGate.detail}</p>
            <div className="separator"/>
            <div className="eyebrow">CEO SIGNAL</div>
            <div className="signal">Can the physics scale economically?</div>
            <p>Every milestone should reduce uncertainty around that question.</p>
          </div>
        </div>}

        {tab === 'experiment' && <div className="split">
          <form className="panel" onSubmit={runScenario}>
            <div className="eyebrow">ILLUSTRATIVE MODEL</div><h3>Stress-test the next run</h3><p className="subtle">This is a performative scenario model, not a plasma-physics calculation.</p>
            {[
              ['Confinement improvement',conf,setConf],
              ['Plasma density improvement',dens,setDens],
              ['Temperature improvement',temp,setTemp]
            ].map(([label,val,setter]) => <label className="sliderRow" key={label}><div><span>{label}</span><strong>{val}%</strong></div><input type="range" min="0" max="100" value={val} onChange={e=>setter(Number(e.target.value))}/></label>)}
            <button className="primary" type="submit">Run scenario</button>
          </form>
          <div className="panel">
            <div className="panelTitle"><div><div className="eyebrow">MISSION IMPACT</div><h3>Scenario output</h3></div><div className="status">{scenario.score >= 80 ? 'BREAKTHROUGH' : scenario.score >= 50 ? 'STRONG' : 'MODEST'}</div></div>
            <div className="progressHeader"><span>Illustrative progress index</span><strong>{scenario.score}/100</strong></div>
            <div className="bar"><div style={{width:`${scenario.score}%`}}/></div>
            <div className="miniGrid"><div><span>Projected uplift</span><strong>+{scenario.uplift}%</strong></div><div><span>Dominant driver</span><strong>{scenario.driver}</strong></div><div><span>Decision</span><strong>{scenario.decision}</strong></div></div>
            <div className="callout">{scenario.score >= 65 ? 'This combination would justify prioritizing a higher-scale validation run. The next task is proving that the improvements hold simultaneously in a real experiment.' : 'The scenario improves the program, but does not yet represent a decisive engineering inflection.'}</div>
          </div>
        </div>}

        {tab === 'roadmap' && <div className="roadWrap">
          <div className="roadGrid">{roadmap.map((r,i)=><button key={r.years} onClick={()=>setSelectedRoadmap(r)} className={selectedRoadmap.years===r.years?'roadCard selected':'roadCard'}><div className="roadIndex">0{i+1}</div><span>{r.years}</span><strong>{r.label}</strong></button>)}</div>
          <div className="panel roadmapDetail"><div className="eyebrow">SELECTED PHASE</div><h3>{selectedRoadmap.years} · {selectedRoadmap.label}</h3><p>{selectedRoadmap.copy}</p><div className="trajectory"><div className="dot on"/><div className="line"/><div className="dot"/><div className="line"/><div className="dot"/></div></div>
        </div>}

        {tab === 'intel' && <div className="split intelSplit">
          <div className="panel"><div className="eyebrow">EXECUTIVE PROMPTS</div><h3>Ask the program</h3><div className="promptList">
            <button onClick={()=>setAnswer(answers.risks)}>What are the three biggest risks?</button>
            <button onClick={()=>setAnswer(answers.dd)}>Why does D-D matter strategically?</button>
            <button onClick={()=>setAnswer(answers.value)}>What milestone changes the valuation story?</button>
            <button onClick={()=>setAnswer(answers.moat)}>What is the defensible moat?</button>
          </div></div>
          <div className="panel aiPanel"><div className="aiHead"><BrainCircuit size={20}/><div><div className="eyebrow">HOPE INTELLIGENCE</div><h3>Deck-grounded analysis</h3></div></div><div className="answer">{answer}</div><div className="aiFoot">Prototype reasoning layer · not connected to live experiment systems</div></div>
        </div>}
      </section>
    </main>
  )
}
