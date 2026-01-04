import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../../styles/Experience.css';

const experienceData = [
  {
    id: 1,
    date: "2024 - Present",
    company: "TechSolutions Inc.",
    role: "Senior Frontend Engineer",
    status: "RUNNING",
    logs: [
      "Architected core design system using React & Tailwind",
      "Improved performance by 40% via code splitting",
      "Led a team of 4 junior developers"
    ],
    tech: ["React", "TypeScript", "Next.js"]
  },
  {
    id: 2,
    date: "2022 - 2024",
    company: "Creative Digital",
    role: "Full Stack Developer",
    status: "COMPLETED",
    logs: [
      "Built e-commerce platform serving 10k+ daily users",
      "Integrated Stripe payments and real-time inventory",
      "Migrated legacy PHP backend to Node.js"
    ],
    tech: ["Node.js", "Express", "MongoDB", "React"]
  },
  {
    id: 3,
    date: "2021 - 2022",
    company: "StartUp Hub",
    role: "Junior Web Developer",
    status: "COMPLETED",
    logs: [
      "Developed landing pages and marketing assets",
      "Collaborated with UI/UX team on prototypes",
      "Fixed 100+ critical bugs in production"
    ],
    tech: ["HTML/CSS", "JavaScript", "WordPress"]
  }
];

const COMMANDS = ['help', 'experience', 'skills', 'contact', 'clear'];

const ExperienceApp = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Initializing AniketOS Kernel v1.0.0...' },
    { type: 'system', content: 'Loading user experience modules...' },
    { type: 'success', content: 'Modules loaded successfully.' },
    { type: 'info', content: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', content: `guest@portfolio:~$ ${cmd}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push({ 
          type: 'response', 
          content: [
            'Available commands:',
            '  experience  - View professional timeline',
            '  skills      - List technical capabilities',
            '  clear       - Clear terminal output',
            '  contact     - Display contact info'
          ]
        });
        break;
      case 'experience':
      case 'exp':
        newHistory.push({ type: 'component', component: <ExperienceTimeline /> });
        break;
      case 'skills':
        newHistory.push({ 
          type: 'response', 
          content: 'Fetching skills... [React, Node.js, Python, MongoDB, AWS]' 
        });
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'contact':
        newHistory.push({ 
          type: 'response', 
          content: 'Email: contact@aniket.dev | LinkedIn: /in/aniket-ikhar' 
        });
        break;
      case '':
        break;
      default:
        newHistory.push({ type: 'error', content: `Command not found: ${trimmed}` });
    }

    setHistory(newHistory);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    
    if (val.trim()) {
      const matches = COMMANDS.filter(c => c.startsWith(val.toLowerCase()));
      setSuggestions(matches);
      setSuggestionIndex(0);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[suggestionIndex]);
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSuggestionIndex(prev => Math.max(0, prev - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSuggestionIndex(prev => Math.min(suggestions.length - 1, prev + 1));
    } else if (e.key === 'Enter') {
      if (suggestions.length > 0 && e.ctrlKey) {
        // Ctrl+Enter to autocomplete selected
        setInput(suggestions[suggestionIndex]);
        setSuggestions([]);
        return;
      }
      handleCommand(input);
      setInput('');
      setSuggestions([]);
    }
  };

  return (
    <div className="terminal-app" onClick={() => document.getElementById('term-input')?.focus()}>
      <div className="terminal-content">
        {history.map((line, i) => (
          <div key={i} className={`term-line ${line.type}`}>
            {line.type === 'component' ? line.component : (
              Array.isArray(line.content) ? (
                line.content.map((l, idx) => <div key={idx}>{l}</div>)
              ) : line.content
            )}
          </div>
        ))}
        {/* Interactive Experience Timeline Component */}
        <div className="current-line" style={{ position: 'relative' }}>
          <span className="prompt">guest@portfolio:~$</span>
          <input 
            id="term-input"
            type="text" 
            value={input} 
            onChange={handleInputChange} 
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoFocus
          />
          {suggestions.length > 0 && (
            <div className="input-suggestions">
              {suggestions.map((cmd, idx) => (
                <div 
                  key={cmd} 
                  className={`suggestion-item ${idx === suggestionIndex ? 'active' : ''}`}
                  onClick={() => {
                    setInput(cmd);
                    setSuggestions([]);
                    document.getElementById('term-input').focus();
                  }}
                >
                  {cmd}
                </div>
              ))}
            </div>
          )}
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

const ExperienceTimeline = () => {
  return (
    <div className="exp-timeline">
      <div className="timeline-header">
        <span>PID</span>
        <span>USER</span>
        <span>TIMEFRAME</span>
        <span>COMMAND/ROLE</span>
        <span>STATUS</span>
      </div>
      {experienceData.map((job) => (
        <motion.div 
          key={job.id} 
          className="exp-row"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="exp-meta">
            <span className="pid">{1000 + job.id}</span>
            <span className="user">root</span>
            <span className="time">{job.date}</span>
            <span className="role">{job.role} @ {job.company}</span>
            <span className={`status ${job.status.toLowerCase()}`}>{job.status}</span>
          </div>
          <div className="exp-logs">
            {job.logs.map((log, i) => (
              <div key={i} className="log-line">
                <span className="arrow">➜</span> {log}
              </div>
            ))}
            <div className="exp-tech">
              <span className="bracket">[</span>
              {job.tech.join(', ')}
              <span className="bracket">]</span>
            </div>
          </div>
        </motion.div>
      ))}
      <div className="process-end">
        <span className="cursor-block">█</span>
      </div>
    </div>
  );
};

export default ExperienceApp;
