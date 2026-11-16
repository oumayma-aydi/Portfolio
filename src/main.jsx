import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Phone, Moon, Sun,
  Menu, X, ShieldCheck, BrainCircuit, Cloud, Terminal, ChevronDown, Users, Trophy, Rocket,
  TrendingUp, Activity, Download
} from 'lucide-react';
import './style.css';

const LINKS = {
  email: 'oumayma.aydi@etudiant-enit.utm.tn',
  phone: '+216 58 972 061',
  phoneHref: 'tel:+21658972061',
  linkedin: 'https://www.linkedin.com/in/oumayma-aydi',
  github: 'https://github.com/oumayma-aydi',
  // Contact form. Leave empty to open the visitor's email app instead (works with no setup).
  // Web3Forms: formEndpoint 'https://api.web3forms.com/submit' + formAccessKey 'your-key'
  // Formspree: formEndpoint 'https://formspree.io/f/xxxxxxx' (no key needed)
  formEndpoint: 'https://api.web3forms.com/submit',
  formAccessKey: 'https://form.typeform.com/to/mNHT04fm',
  cvEn: import.meta.env.BASE_URL + 'Oumayma_Aydi_CV_EN.pdf',
  cvFr: import.meta.env.BASE_URL + 'Oumayma_Aydi_CV_FR.pdf'
};

const experience = [
  {
    org: 'STAR Assurances', title: 'SAQR: AI-powered SOC analysis platform', role: 'Engineering Intern', date: 'June – July 2026',
    stack: ['LangGraph', 'FastAPI', 'RAG', 'Kubernetes'],
    badge: 'STAR Assurances is now deploying it',
    problem: 'SOC analysts spend too long triaging SIEM alerts.',
    bullets: [
      'A platform for alert triage, IOC enrichment, investigation and incident response.',
      'LangGraph agents (triage, MITRE ATT&CK mapping, kill chain, remediation) with policy-controlled proposals, human approval and execution verification, to limit excessive agency.',
      'A RAG pipeline (ChromaDB, Sentence-BERT) over 11,688 chunks from MITRE ATT&CK, D3FEND, CAPEC, CISA and OWASP.',
      'Parallel threat-intel enrichment (VirusTotal, AbuseIPDB, OTX): latency cut from about 3.6 s to 1.2 s.',
      'JWT authentication, sessions and RBAC with 3 roles (admin, analyst, auditor), with all access scenarios tested per role.',
      'Defenses against prompt injection: SIEM alerts are attacker-controlled data, so I added input sanitization, GDPR-aligned log sanitization and an adversarial test suite covering injection through alert content.',
      'Backend in FastAPI, PostgreSQL and Redis, deployed on Kubernetes (Secrets, ConfigMaps, StatefulSets). Documented in a full internship report.'
    ]
  },
  {
    org: 'SORECI', title: 'CloudShield: DevSecOps pipeline', role: 'Engineering Project', date: 'Nov. 2025 – Apr. 2026',
    stack: ['GitHub Actions', 'Kubernetes', 'Terraform'],
    bullets: [
      'A GitHub Actions pipeline with 7 security gates: Semgrep (SAST), Snyk (SCA), Checkov (IaC), Trivy (containers), Kubernetes deployment, Terraform and OWASP ZAP (DAST).',
      'OWASP Juice Shop (a deliberately vulnerable lab app) deployed in an isolated Kind cluster. ZAP scanned the entire running application for OWASP Top 10 vulnerabilities and produced a full report, alongside a report per gate.',
      'Kubernetes hardening: 21 Checkov findings reduced to 0 (non-root, dropped capabilities, RuntimeDefault seccomp).',
      'Supply chain security: SHA-pinned Actions, Dependabot, SBOMs (Syft, CycloneDX).',
      'Tool comparison: Semgrep vs. SonarQube vs. Bandit, and Checkov vs. Terrascan vs. tfsec.',
      'A zero-cost local stack (Kind, Terraform, LocalStack), saving about $93/month versus AWS. Full project report written.'
    ]
  },
  {
    org: 'SORECI', title: 'Cloud-native distributed AI platform', role: 'Distributed Systems Project', date: 'July – Aug. 2025',
    stack: ['Kafka', 'Helm', 'Argo CD', 'AWS'],
    bullets: [
      'A microservice architecture (API gateway, auth, AI inference, RAG, async workers) with Kafka and REST/gRPC.',
      'Deployed with Helm and Argo CD (GitOps) on Kubernetes and AWS (EKS, IAM, VPC, ALB).',
      'Observability with OpenTelemetry, Prometheus, Grafana, Loki and Jaeger; SLOs defined; chaos-engineering experiments (pod, network and database failures).'
    ]
  },
  {
    org: 'Capgemini Engineering', title: 'DevOps & CI/CD automation', role: 'DevOps Intern', date: 'June – July 2025',
    stack: ['Jenkins', 'Ansible', 'Docker'],
    bullets: ['Jenkins pipelines, Ansible playbooks and multi-stage Dockerfiles. Documented in an internship report.']
  }
];

const projects = [
  {
    id: '01', name: 'MCP Red Teaming', kind: 'AI SECURITY', year: 'Oct. 2026 – present', tone: 'rose', icon: ShieldCheck, wide: true,
    link: '', // ← colle ici le lien GitHub du repo (ex: https://github.com/oumayma-aydi/mcp-red-teaming)
    status: 'In progress',
    tagline: 'Attack the agent, then measure which defenses hold.',
    description: 'Automated red teaming for MCP-enabled AI agents: a framework that attacks LLM agents connected to tools through MCP.',
    stack: ['Python', 'LangGraph', 'MCP', 'Promptfoo', 'PyRIT'],
    bullets: [
      'Attack scenarios cover direct and indirect prompt injection, MCP tool misuse, unauthorized execution and sensitive data exposure.',
      'Runs scenarios with Promptfoo and PyRIT and scores attack success rate per category.',
      'Compares a baseline and a hardened configuration to validate defenses.',
      'Findings are documented in reproducible reports.'
    ],
    note: 'This project is still in progress. Results will be added once the evaluation runs are complete.'
  },
  {
    id: '02', name: 'RL Incident Response Agent', kind: 'REINFORCEMENT LEARNING', year: '2026 · ENIT RL course', tone: 'slate', icon: BrainCircuit, wide: true,
    link: '', // ← colle ici le lien GitHub du repo (ex: https://github.com/oumayma-aydi/mcp-red-teaming)
    tagline: 'Contain attacks without cutting off legitimate users.',
    description: 'An incident-response agent trained with tabular Q-learning in a custom simulated network. Incident response is formalized as an MDP with hidden ground truth (3,564 states, 4 actions: Investigate, Throttle, Deceive, Terminate).',
    stack: ['Python', 'Tabular RL', 'Q-learning', 'Statistics'],
    stats: [
      ['99.9%', 'of simulated attacks contained (rule-based baseline: 91.0%)'],
      ['97.9%', 'of legitimate traffic preserved (baseline: 90.8%)'],
      ['3,564 → 396', 'states after an ablation of the state space'],
      ['+0.32', 'return for Q-learning vs. Monte Carlo (p = 0.012)']
    ],
    bullets: [
      'Compared 9 algorithms (Monte Carlo, SARSA, Expected SARSA, n-step, Q-learning, Double Q-learning).',
      'Tuned hyperparameters on separate seeds and validated on unseen seeds with 95% confidence intervals and a paired statistical test.',
      'The final agent captured 89% of the gap to an upper bound with privileged information.',
      'Tested robustness to attack rate and sensitivity to reward penalties. Reproducible with one command; full report written.'
    ],
    note: 'Limits, as stated in the report: own simulator, 5 seeds, outside GLIE guarantees. DQN and real datasets (CIC-IDS2017, UNSW-NB15) are future work, not part of this project.'
  },
  {
    id: '03', name: 'Intermittent Retail Demand Forecasting', kind: 'FORECASTING & DIAGNOSTICS', year: 'Ongoing', tone: 'mist', icon: TrendingUp,
    link: '', // ← colle ici le lien GitHub du repo (ex: https://github.com/oumayma-aydi/mcp-red-teaming)
    status: 'In progress',
    tagline: 'Why a forecast that looks good on MAE can still be useless.',
    description: 'An end-to-end intermittent demand forecasting pipeline on the M5 Walmart dataset (store CA_1), with a post-forecast diagnostic engine that explains why a forecast went wrong.',
    stack: ['PySpark', 'Databricks (Delta)', 'statsforecast', 'Croston / SBA / TSB', 'pytest'],
    stats: [
      ['3,049', 'items in store CA_1, 28-day holdout'],
      ['4', 'demand segments: smooth, erratic, intermittent, lumpy'],
      ['−100%', 'bias of a zero forecast, which still looks competitive on MAE'],
      ['3', 'diagnostic rules, validated by fault injection']
    ],
    bullets: [
      'ADI/CV² segmentation into smooth, erratic, intermittent and lumpy series, with each series trimmed to its first priced week so pre-listing zeros are not read as zero demand.',
      'Benchmarks a zero forecast, seasonal naive, moving average, Croston, SBA and TSB with MAE, MASE and bias per segment, showing why MAE alone misleads.',
      'A 3-rule diagnostic engine (dormant item, outlier spike, inflated forecast) with ordered root-cause attribution and thresholds in a YAML file.',
      'Validated by fault injection on disjoint random item subsets (fixed seeds, precision and recall per rule), with pytest unit tests and GitHub Actions CI.'
    ],
    note: 'This project is still in progress. Benchmark results will be added once the pipeline is complete.'
  },
  {
    id: '04', name: 'Seizure Prediction from EEG', kind: 'MODEL VALIDATION', year: '2026', tone: 'rose', icon: Activity,
    link: '', // ← colle ici le lien GitHub du repo (ex: https://github.com/oumayma-aydi/mcp-red-teaming)
    tagline: 'Checking whether a published 90% result survives unseen patients.',
    description: 'A leakage-aware reproduction of a published MFCC + CNN seizure prediction pipeline on CHB-MIT, evaluated leave-one-patient-out.',
    stack: ['Time-series analysis', 'Model validation', 'Root-cause analysis', 'Data visualization'],
    stats: [
      ['0.490', 'mean AUC on unseen patients (paper: 88.8–91.5% under 10-fold CV)'],
      ['0.09 vs 0.69', 'single-feature AUC of a global energy feature, across patients'],
      ['0.69', 'false alarms per hour with the alarm layer'],
      ['44,956', 'windows, 4 patients, 31 seizures']
    ],
    bullets: [
      'Reproduced the published pipeline and designed a leave-one-patient-out evaluation with training-only balancing and normalization to prevent leakage.',
      'On unseen patients the model stayed at chance, far below the figures the paper reports under 10-fold cross-validation.',
      'Root-cause analysis: a global energy feature reverses direction across patients. Identified three inconsistencies in the source paper.',
      'Communicated through per-patient distributions, ROC curves and alarm timelines.',
      'Built a threshold-based alarm layer (smoothing, 60 min refractory period).'
    ]
  },
  {
    id: '05', name: 'Active Directory & Network Security Lab', kind: 'NETWORK SECURITY', year: 'Dec. 2025 – Mar. 2026 · Securinets', tone: 'slate', icon: Terminal, wide: true,
    link: '', // ← colle ici le lien GitHub du repo (ex: https://github.com/oumayma-aydi/mcp-red-teaming)
    tagline: 'Break a domain in the lab, then learn to detect it.',
    description: 'A Windows Server 2022 Active Directory environment hardened and attacked in a controlled lab, with network security controls watching it.',
    stack: ['Windows Server 2022', 'Active Directory', 'GPO', 'AppLocker', 'OPNsense', 'Suricata', 'MITRE ATT&CK'],
    bullets: [
      'Built and administered the domain: users, groups, organizational units, permissions and GPOs.',
      'Applied least-privilege principles, GPO hardening and AppLocker.',
      'Reproduced AS-REP Roasting, Kerberoasting and password spraying in controlled environments and mapped them to MITRE ATT&CK.',
      'Deployed and analyzed network security controls with OPNsense, Suricata IDS/IPS and Zenarmor.',
      'Correlated Active Directory events and network alerts to analyze suspicious activity and potential lateral movement.'
    ]
  }
];

// link: colle l'URL du repo GitHub entre les guillemets. S'il est vide, le bouton n'apparaît pas.
const others = [
  { name: 'Production LLM platform for cybersecurity incident analysis', date: 'Jan. – June 2026', text: 'LoRA/QLoRA fine-tuning, vLLM/FastAPI serving, MLflow/DVC. Benchmarks base, RAG, fine-tuned and combined setups on accuracy, groundedness, hallucination rate, latency and cost.', link: '' },
  { name: 'KubeGuard', date: '2026', text: 'A Go Kubernetes operator (Kubebuilder) that audits workloads against configurable policies: privileged containers, security contexts, resource limits, unapproved registries and NetworkPolicy coverage, with CRDs, severity-based reports and admission control.', link: '' },
  { name: 'Agentic SRE', date: '2025', text: 'A LangGraph/MCP workflow correlating Prometheus metrics, Loki logs and Kubernetes events, with read-only tools, allowlisted approval-gated remediation and audit logs.', link: '' },
  { name: 'Streaming anomaly detection', date: '2026', text: 'Real-time inference on Kafka with MLflow tracking, drift monitoring and SHAP explanations.', link: '' }
];

const roles = [
  {
    org: 'ENIT Junior Entreprise', title: 'Business Development Manager', date: 'July 2025 – July 2026',
    text: 'I led a team of 12 and coached people who had never done sales into a team that closed sponsors and partners. Together we reached 40+ sponsors, 8 partners and more than 100,000 TND in revenue, and won the Best Business Development prize among 30+ Junior Entreprises in Tunisia.'
  },
  {
    org: 'CTJE · Confédération Tunisienne des Junior Entreprises', title: 'Quality Consulting Officer', date: 'Sept. 2026 – present',
    text: 'I advise Junior Entreprises on quality, taking what worked in one JE and helping others raise their standards.'
  },
  {
    org: 'Securinets ENIT', title: 'Senior Member, cybersecurity community', date: 'Sept. 2024 – present',
    text: 'Cybersecurity labs and CTF activities: penetration testing, digital forensics, vulnerability assessment and network security.'
  }
];

const moments = [
  { photo: 'moment-star.jpg', pos: 'center 46%', icon: Rocket, title: 'A project that left the lab', text: 'STAR Assurances liked SAQR enough to deploy it for real use. An internship project that became a tool people will actually rely on.' },
  { photo: 'moment-team.jpg', pos: 'center 30%', icon: Users, title: 'Zero sales experience, 6 sponsors in a month', text: 'My business development team knew nothing about sales when we started. Within a month they had 6 sponsors and 3 partners, a record. Knowing how to coach, train and manage a team paid off, and I was proud of them and of how they grew.' },
  { photo: 'moment-prize.jpg', pos: 'center 45%', icon: Trophy, title: 'Best Business Development', text: 'The prize from the Confédération Tunisienne des Junior Entreprises, among 30+ Junior Entreprises. It belongs to the whole team.' }
];

const skillGroups = [
  { title: 'AI security', icon: ShieldCheck, skills: ['AI red teaming', 'Prompt injection', 'MCP tool security', 'Promptfoo', 'PyRIT', 'OWASP Top 10', 'JWT / RBAC', 'API security'] },
  { title: 'DevSecOps', icon: Cloud, skills: ['GitHub Actions', 'OWASP ZAP', 'Semgrep', 'Snyk', 'Trivy', 'Checkov', 'SBOM'] },
  { title: 'Platform', icon: Terminal, skills: ['Docker', 'Kubernetes', 'Helm', 'Argo CD', 'Terraform', 'Go (operators)'] },
  { title: 'AI / ML', icon: BrainCircuit, skills: ['LangGraph', 'MCP', 'RAG', 'PyTorch', 'MLflow', 'Hugging Face', 'Reinforcement learning (tabular)'] },
  { title: 'Data & forecasting', icon: TrendingUp, skills: ['PySpark', 'Databricks (Delta)', 'statsforecast', 'Croston / SBA / TSB', 'Time-series validation', 'pytest'] },
  { title: 'Web security tools', icon: ShieldCheck, note: 'coursework and labs', skills: ['Burp Suite', 'OWASP ZAP', 'w3af', 'SQL injection testing', 'XSS testing'] }
];

// Drop a file with the right name in public/images/ and it appears automatically.
// If the file is missing, nothing is shown and the placeholder stays.
function Photo({ name, alt, className = 'photo', frame, position = 'center' }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;

  const frames = {
    'frame-team': { aspectRatio: '1333 / 1303', margin: 0 },
    'frame-moment': { height: '230px', width: 'calc(100% + 44px)', margin: '-22px -22px 20px' }
  };

  const imgStyle = frame
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', margin: 0, aspectRatio: 'auto', objectFit: 'cover', objectPosition: position }
    : { objectPosition: position };

  const img = (
    <img className={frame ? undefined : className} src={`${import.meta.env.BASE_URL}images/${name}`} alt={alt} loading="lazy" style={imgStyle} onError={() => setOk(false)} />
  );

  if (!frame) return img;
  return <div style={{ position: 'relative', overflow: 'hidden', width: '100%', ...frames[frame] }}>{img}</div>;
}

function ContactForm() {
  const [status, setStatus] = useState('idle');

  const onSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form));
    if (d.website) return; // honeypot: bots fill this hidden field
    const name = `${d.firstName} ${d.lastName}`.trim();

    if (!LINKS.formEndpoint) {
      const body = `${d.message}\n\n${name}\n${d.email}`;
      window.location.href = `mailto:${LINKS.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(LINKS.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...(LINKS.formAccessKey ? { access_key: LINKS.formAccessKey } : {}),
          from_name: 'Portfolio',
          name, email: d.email, subject: d.subject, message: d.message
        })
      });
      if (!res.ok) throw new Error('failed');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const messages = {
    sent: 'Thank you, your message is on its way. I will reply soon.',
    mailto: 'Your email app should open with the message ready to send.',
    error: `Something went wrong. Please write to me directly at ${LINKS.email}.`
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <input name="firstName" placeholder="First name" aria-label="First name" autoComplete="given-name" required />
      <input name="lastName" placeholder="Last name" aria-label="Last name" autoComplete="family-name" required />
      <input className="full" type="email" name="email" placeholder="Email" aria-label="Email" autoComplete="email" required />
      <input className="full" name="subject" placeholder="Subject" aria-label="Subject" required />
      <textarea className="full" name="message" placeholder="Message" aria-label="Message" rows={4} required />
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="send-btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'} <ArrowUpRight size={16}/>
      </button>
      <p className="form-status" role="status" aria-live="polite">{messages[status] || ''}</p>
    </form>
  );
}

function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const nav = [['About', 'about'], ['Experience', 'work'], ['Projects', 'projects'], ['Leadership', 'leadership'], ['Skills', 'skills'], ['Beyond', 'beyond'], ['Contact', 'contact']];

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Oumayma Aydi, home"><span className="brand-mark">OA</span><span>Oumayma Aydi<span className="brand-dot">.</span></span></a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main">
          {nav.map(([label, id]) => <a key={id} href={'#' + id} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="top-actions">
          <button className="icon-button" onClick={() => setDark(!dark)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>{dark ? <Sun size={17}/> : <Moon size={17}/>}</button>
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={19}/> : <Menu size={19}/>}</button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="status-pulse"/> Open to a six-month internship from Feb. 2027</div>
            <p className="eyebrow">AI Security & DevSecOps Engineering Student</p>
            <h1>I build AI agents.<br/>Then I <span className="serif hero-attack">attack</span> them<span className="accent">.</span></h1>
            <p className="hero-text">Telecommunications Engineering student at ENIT (Data Science track), also pursuing a Master in Information System Techniques (IST). I build and attack AI agents that use tools (LangGraph, MCP) and automate security testing in CI/CD on Kubernetes. I document my work in full technical reports.</p>
            <div className="hero-buttons">
              <a className="button primary" href="#work">See my work <ArrowDownRight size={17}/></a>
              <a className="button secondary" href="#contact">Get in touch <ArrowUpRight size={16}/></a>
            </div>
            <div className="cv-links">
              <span>DOWNLOAD CV</span>
              <a href={LINKS.cvEn} download="Oumayma_Aydi_CV_EN.pdf">English <Download size={13}/></a>
              <a href={LINKS.cvFr} download="Oumayma_Aydi_CV_FR.pdf">Français <Download size={13}/></a>
            </div>
            <div className="hero-foot"><span><span className="tiny-star">✳</span> Tunis, Tunisia</span><span>ENIT · Data Science</span></div>
          </div>
          <div className="hero-art">
            <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
            <div className="portrait-card">
              <div className="portrait-top"><span>OUMAYMA AYDI</span><span className="live-dot"/></div>
              <div className="portrait-placeholder">
                <div className="portrait-sun"/><div className="portrait-shape shape-one"/><div className="portrait-shape shape-two"/>
                <div className="portrait-initials">OA</div>
                <Photo name="portrait.jpg" alt="Oumayma Aydi" className="photo photo-portrait" />
              </div>
              <div className="portrait-caption"><div><strong>Oumayma Aydi</strong><span>AI security · DevSecOps</span></div><span className="caption-stamp">TUN<br/>2026</span></div>
            </div>
            <div className="floating-note note-top"><Rocket size={15}/><span>SAQR is being deployed by STAR Assurances</span></div>
            <div className="floating-note note-bottom"><span className="mini-bars">▂ ▅ ▃ ▇ ▄</span><span>IOC enrichment: 3.6 s → 1.2 s</span></div>
            <span className="hero-cross cross-a">+</span><span className="hero-cross cross-b">✳</span>
          </div>
        </section>

        <section className="ticker" aria-hidden="true"><div className="ticker-track">{Array.from({length: 2}, (_, i) => <React.Fragment key={i}>{['AI RED TEAMING', 'PROMPT INJECTION', 'MCP SECURITY', 'DEVSECOPS', 'KUBERNETES', 'LANGGRAPH', 'REINFORCEMENT LEARNING'].map(t => <React.Fragment key={t}><span>{t}</span><b>✳</b></React.Fragment>)}</React.Fragment>)}</div></section>

        <section className="section-wrap about-section" id="about">
          <div className="section-kicker reveal"><span>01 / ABOUT</span><span>TELECOM ENGINEER, AI SECURITY FOCUS</span></div>
          <div className="about-grid">
            <div className="about-heading reveal"><h2>Technical depth,<br/>and <span className="serif">people.</span></h2></div>
            <div className="about-body reveal">
              <p className="lead">I like making AI systems useful and hard to abuse, and I like leading the people who build them.</p>
              <p>My work sits between AI engineering and security: agents that call tools, pipelines that test themselves, and clusters that are hardened by default. Outside the terminal, I led a business development team of 12 and now advise Junior Entreprises on quality.</p>
              <div className="about-facts">
                <div><span className="fact-number">EDU</span><span>ENIT, Telecommunications Engineering, Data Science specialization (since 2024)</span></div>
                <div><span className="fact-number">MSc</span><span>Master in Information System Techniques (IST), ENIT / TU Braunschweig</span></div>
                <div><span className="fact-number">LANG</span><span>Arabic (native) · French (C1) · English (C1) · German and Spanish (basic)</span></div>
                <div><span className="fact-number">CERT</span><span>Certified Cybersecurity Educator Professional, Red Team Leaders (Oct. 2026) · Cisco CCNA: Introduction to Networks (Jan. 2026)</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-wrap">
            <div className="section-kicker reveal"><span>02 / PROFESSIONAL EXPERIENCE</span><span>INTERNSHIPS AND INDUSTRY PROJECTS</span></div>
            <div className="section-title-row reveal"><h2>Work that <span className="serif">shipped.</span></h2><p>Each entry has a problem, what I built and what changed.</p></div>
            <div className="cases">
              {experience.map((e, i) => (
                <article className="case reveal" key={e.title} style={{transitionDelay: `${i * 60}ms`}}>
                  <div className="case-meta">
                    <span className="micro-label">{e.date}</span>
                    <h3>{e.org}</h3>
                    <p>{e.role}</p>
                    <div className="tags">{e.stack.map(s => <span key={s}>{s}</span>)}</div>
                  </div>
                  <div className="case-body">
                    <h3>{e.title}</h3>
                    {e.badge && <span className="case-badge"><Rocket size={13}/> {e.badge}</span>}
                    {e.problem && <p className="case-problem"><strong>Problem:</strong> {e.problem}</p>}
                    <ul>{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap projects-section" id="projects">
          <div className="section-kicker reveal"><span>03 / PROJECTS</span><span>AI SECURITY, RL, DATA, NETWORKS</span></div>
          <div className="section-title-row reveal"><h2>Things I <span className="serif">build</span> on my own.</h2><p>Repositories and reports are linked from my GitHub.</p></div>
          <div className="projects-grid">
            {projects.map((p, i) => { const Icon = p.icon; return (
              <article className={`project-card ${p.tone} ${p.wide ? 'project-wide' : ''} reveal`} key={p.id} style={{transitionDelay: `${i * 80}ms`}}>
                <div className="project-top"><span>{p.id} / {p.kind}</span><span>{p.year}</span></div>
                <div className="project-illustration"><div className="project-orb"/><div className="project-icon"><Icon size={34} strokeWidth={1.35}/></div>{p.status && <span className="illustration-label">{p.status}</span>}</div>
                <div className="project-content">
                  <h3>{p.name}</h3>
                  <p className="project-tagline">{p.tagline}</p>
                  <p className="project-desc">{p.description}</p>
                  {p.stats && <div className="result-grid">{p.stats.map(([n, l]) => <div key={n}><strong>{n}</strong><span>{l}</span></div>)}</div>}
                  <div className="tags">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
                  {p.link && <a className="repo-link" href={p.link} target="_blank" rel="noreferrer"><Github size={15}/> View repository <ArrowUpRight size={15}/></a>}
                  <button className="text-link" onClick={() => setOpen(open === p.id ? null : p.id)} aria-expanded={open === p.id}>{open === p.id ? 'Hide details' : 'Read details'} <ArrowUpRight size={16}/></button>
                  {open === p.id && <div className="project-detail"><ul>{p.bullets.map(b => <li key={b}>{b}</li>)}</ul>{p.note && <p className="small-note">{p.note}</p>}</div>}
                </div>
              </article>
            ); })}
          </div>
          <h3 className="subhead reveal">Other projects</h3>
          <div className="others reveal">
            {others.map(o => (
              <div className="other" key={o.name}>
                <div><strong>{o.name}</strong><span className="micro-label">{o.date}</span></div>
                <p>{o.text}</p>
                {o.link && <a className="repo-link" href={o.link} target="_blank" rel="noreferrer"><Github size={14}/> Repository <ArrowUpRight size={14}/></a>}
              </div>
            ))}
          </div>
          <div className="project-footnote reveal"><span>CODE, REPORTS AND REPOSITORIES</span><a href={LINKS.github} target="_blank" rel="noreferrer">See all on GitHub <ArrowUpRight size={15}/></a></div>
        </section>

        <section className="journey-section" id="leadership">
          <div className="section-wrap">
            <div className="section-kicker reveal"><span>04 / LEADERSHIP</span><span>JUNIOR ENTREPRISE, CTJE, SECURINETS</span></div>
            <div className="section-title-row reveal"><h2>I build teams, <span className="serif">too.</span></h2><p>Numbers from my mandate as Business Development Manager at ENIT Junior Entreprise.</p></div>
            <div className="team-feature reveal">
              <figure className="team-photo">
                <Photo name="enit-je-team.jpg" alt="ENIT Junior Entreprise business development team" frame="frame-team" position="center 30%" />
                <figcaption>MY BUSINESS DEVELOPMENT TEAM · ENIT JUNIOR ENTREPRISE</figcaption>
              </figure>
              <div className="stat-grid">
                <div className="stat"><strong>12</strong><span>people on my team</span></div>
                <div className="stat"><strong>40<span>+</span></strong><span>sponsors</span></div>
                <div className="stat"><strong>8</strong><span>partners</span></div>
                <div className="stat"><strong>100k<span>+</span></strong><span>TND in revenue</span></div>
              </div>
            </div>
            <div className="timeline roles">
              {roles.map((r, i) => (
                <div className="timeline-item reveal" key={r.title} style={{transitionDelay: `${i*90}ms`}}>
                  <div className="timeline-marker"><span/></div>
                  <div className="timeline-content"><span className="micro-label">{r.date}</span><h3>{r.title}, {r.org}</h3><p>{r.text}</p></div>
                </div>
              ))}
            </div>
            <h3 className="subhead reveal">Moments I’m proudest of</h3>
            <div className="moments">
              {moments.map((m, i) => { const Icon = m.icon; return (
                <div className="moment reveal" key={m.title} style={{transitionDelay: `${i*90}ms`}}>
                  <Photo name={m.photo} alt={m.title} frame="frame-moment" position={m.pos} />
                  <span className="skill-icon"><Icon size={19}/></span>
                  <h4>{m.title}</h4>
                  <p>{m.text}</p>
                </div>
              ); })}
            </div>
          </div>
        </section>

        <section className="section-wrap skills-section" id="skills">
          <div className="section-kicker reveal"><span>05 / SKILLS</span><span>WHAT I USE, GROUPED BY WHAT I DO</span></div>
          <div className="section-title-row reveal"><h2>My <span className="serif">toolbox.</span></h2><p>Tools I have used in the projects above.</p></div>
          <div className="skills-grid">{skillGroups.map((g, i) => { const Icon = g.icon; return (
            <div className="skill-group reveal" key={g.title} style={{transitionDelay: `${i*70}ms`}}>
              <div className="skill-group-head"><span className="skill-icon"><Icon size={19}/></span><h3>{g.title}{g.note && <small> ({g.note})</small>}</h3><span className="skill-index">0{i + 1}</span></div>
              <div className="skill-list">{g.skills.map(s => <span key={s}>{s}</span>)}</div>
            </div>
          ); })}</div>
        </section>

        <section className="section-wrap beyond-section" id="beyond">
          <div className="section-kicker reveal"><span>06 / BEYOND THE CV</span><span>HOW I RECHARGE</span></div>
          <div className="section-title-row reveal"><h2>Away from <span className="serif">the keyboard.</span></h2><p>Pilates and the beach: two things that keep me balanced.</p></div>
          <div className="beyond-grid">
            <div className="gallery-card reveal"><div className="gallery-visual people-visual"><span className="gallery-placeholder-icon">◎</span><Photo name="pilates.jpg" alt="Pilates" /></div><div className="gallery-caption"><div><span className="micro-label">PILATES</span><h3>Control, precision, breathing.</h3><p>Pilates is where I reset. It turns out that steady pace also helps when a pipeline is red at 11 p.m.</p></div></div></div>
            <div className="gallery-card reveal"><div className="gallery-visual personal-visual"><span className="gallery-placeholder-icon">☼</span><Photo name="beach.jpg" alt="At the beach" /></div><div className="gallery-caption"><div><span className="micro-label">BEACH & SUN</span><h3>Sun, sea, slow days.</h3><p>Going to the beach, tanning, getting some sun and swimming. It is where I fully disconnect and come back with a clearer head.</p></div></div></div>
          </div>
        </section>

        <section className="contact-section" id="contact"><div className="section-wrap contact-wrap">
          <div className="section-kicker reveal"><span>07 / CONTACT</span><span>INTERNSHIP FROM FEBRUARY 2027</span></div>
          <div className="contact-main reveal">
            <div className="contact-left">
              <p className="eyebrow">LET’S TALK</p>
              <h2>Let’s build something <span className="serif">safe.</span></h2>
              <ArrowUpRight className="contact-arrow" size={56} strokeWidth={1.5} aria-hidden="true" />
              <p className="contact-copy">I’m looking for a six-month final-year or research internship starting February 2027, around AI security, DevSecOps and cloud-native systems.</p>
              <div className="contact-icons">
                <a href={'mailto:' + LINKS.email}><span className="icon-circle"><Mail size={17}/></span>{LINKS.email}</a>
                <a href={LINKS.phoneHref}><span className="icon-circle"><Phone size={17}/></span>{LINKS.phone}</a>
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><span className="icon-circle"><Linkedin size={17}/></span>LINKEDIN</a>
                <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub"><span className="icon-circle"><Github size={17}/></span>GITHUB</a>
              </div>
            </div>
            <ContactForm />
          </div>
          <div className="contact-bottom"><span>© 2026 OUMAYMA AYDI · TUNIS, TUNISIA</span></div>
        </div></section>
      </main>

      <button className="back-top" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top"><ChevronDown size={17}/></button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);