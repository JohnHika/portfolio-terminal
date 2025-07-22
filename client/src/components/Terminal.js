import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import CommandProcessor from './CommandProcessor';
import { GuestbookModal, ContactModal } from './Modal';

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
`;

const TerminalContainer = styled.div`
  background: linear-gradient(135deg, var(--bg-color) 0%, rgba(0, 0, 0, 0.8) 100%);
  color: var(--text-color);
  font-family: 'Fira Code', 'Courier New', monospace;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  
  @media (max-width: 768px) {
    height: 60vh;
  }
  
  @media (max-width: 480px) {
    height: 65vh;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 80% 20%, rgba(0, 255, 0, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(0, 255, 0, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const TerminalHeader = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid var(--accent-color);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 8px 15px;
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    gap: 8px;
  }
`;

const WindowControls = styled.div`
  display: flex;
  gap: 8px;
`;

const WindowControl = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
  opacity: 0.8;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const TerminalTitle = styled.div`
  color: var(--accent-color);
  font-size: 0.9em;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
  
  @media (max-width: 480px) {
    font-size: 0.7em;
  }
`;

const TerminalContent = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
  min-height: 0;
  
  @media (max-width: 768px) {
    padding: 15px;
    font-size: 0.9em;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    font-size: 0.8em;
  }
  
  scrollbar-width: thin;
  scrollbar-color: var(--accent-color) transparent;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border-radius: 3px;
    opacity: 0.5;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    opacity: 0.8;
  }
`;

const OutputLine = styled.div`
  margin-bottom: 8px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  animation: ${fadeIn} 0.3s ease-out;
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  animation: ${fadeIn} 0.2s ease-out;
`;

const Prompt = styled.span`
  color: var(--prompt-color);
  margin-right: 12px;
  font-weight: 600;
  user-select: none;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: var(--text-color);
  font-family: inherit;
  font-size: inherit;
  outline: none;
  flex: 1;
  caret-color: var(--accent-color);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-style: italic;
  }
`;

const Cursor = styled.span`
  background-color: var(--accent-color);
  animation: ${blink} 1.2s infinite;
  width: 8px;
  height: 18px;
  display: inline-block;
  margin-left: 2px;
  border-radius: 1px;
`;

const WelcomeBanner = styled.div`
  color: var(--accent-color);
  margin-bottom: 25px;
  line-height: 1.6;
  text-align: center;
  padding: 20px;
  border: 1px solid var(--accent-color);
  border-radius: 8px;
  background: rgba(0, 255, 0, 0.05);
  animation: ${fadeIn} 1s ease-out;
  
  & pre {
    margin: 0;
    color: var(--accent-color);
  }
`;

const AutocompleteContainer = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
  margin-bottom: 5px;
`;

const AutocompleteItem = styled.div`
  padding: 8px 12px;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover, &.selected {
    background: var(--accent-color);
    color: var(--bg-color);
  }
  
  & .command {
    font-weight: bold;
    color: var(--prompt-color);
  }
  
  & .description {
    font-size: 0.9em;
    opacity: 0.8;
    margin-left: 10px;
  }
`;

const Terminal = ({ theme = 'green' }) => {
  const [history, setHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [selectedAutocomplete, setSelectedAutocomplete] = useState(0);
  
  // Modal states
  const [showGuestbookModal, setShowGuestbookModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const commandProcessor = new CommandProcessor();

  // Welcome message
  useEffect(() => {
    const welcomeMessage = {
      type: 'output',
      content: `╭──────────────────────────────────────────╮
│    🚀 Portfolio Terminal v2.0.0          │
│                                          │
│    Ready to explore? Let's start!        │
╰──────────────────────────────────────────╯

Available themes: green, amber, dark, blue
Type 'help' for available commands
Type 'about' to learn more about me

💡 Tip: Start typing and press Tab for autocomplete!
`
    };
    setHistory([welcomeMessage]);
  }, []);

  // Focus input on click
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Set CSS variables for theme
  useEffect(() => {
    const themes = {
      green: {
        '--bg-color': '#000000',
        '--text-color': '#00ff00',
        '--accent-color': '#00ff00',
        '--prompt-color': '#00ff00'
      },
      amber: {
        '--bg-color': '#1a1a0f',
        '--text-color': '#ffb000',
        '--accent-color': '#ffb000',
        '--prompt-color': '#ffd700'
      },
      dark: {
        '--bg-color': '#1e1e1e',
        '--text-color': '#d4d4d4',
        '--accent-color': '#007acc',
        '--prompt-color': '#569cd6'
      },
      blue: {
        '--bg-color': '#0f1419',
        '--text-color': '#bfbdb6',
        '--accent-color': '#39bae6',
        '--prompt-color': '#39bae6'
      }
    };

    const selectedTheme = themes[theme] || themes.green;
    Object.entries(selectedTheme).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
  }, [theme]);

  const handleKeyDown = async (e) => {
    // Disable input when modal is open
    if (showGuestbookModal || showContactModal) {
      return;
    }
    
    if (e.key === 'Enter' && !isProcessing) {
      e.preventDefault();
      setShowAutocomplete(false);
      await processCommand(currentInput.trim());
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showAutocomplete && autocompleteOptions.length > 0) {
        setSelectedAutocomplete(prev => 
          prev > 0 ? prev - 1 : autocompleteOptions.length - 1
        );
      } else if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
        setShowAutocomplete(false);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showAutocomplete && autocompleteOptions.length > 0) {
        setSelectedAutocomplete(prev => 
          prev < autocompleteOptions.length - 1 ? prev + 1 : 0
        );
      } else if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
        setShowAutocomplete(false);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (showAutocomplete && autocompleteOptions.length > 0) {
        setCurrentInput(autocompleteOptions[selectedAutocomplete].command);
        setShowAutocomplete(false);
      } else {
        const suggestions = commandProcessor.getAutocompleteSuggestions(currentInput);
        if (suggestions.length === 1) {
          setCurrentInput(suggestions[0]);
        } else if (suggestions.length > 1) {
          setAutocompleteOptions(suggestions.map(cmd => ({
            command: cmd,
            description: getCommandDescription(cmd)
          })));
          setShowAutocomplete(true);
          setSelectedAutocomplete(0);
        }
      }
    } else if (e.key === 'Escape') {
      setShowAutocomplete(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCurrentInput(value);
    
    // Show autocomplete for partial commands
    if (value.trim().length > 0) {
      const suggestions = commandProcessor.getAutocompleteSuggestions(value.trim());
      if (suggestions.length > 1) {
        setAutocompleteOptions(suggestions.map(cmd => ({
          command: cmd,
          description: getCommandDescription(cmd)
        })));
        setShowAutocomplete(true);
        setSelectedAutocomplete(0);
      } else {
        setShowAutocomplete(false);
      }
    } else {
      setShowAutocomplete(false);
    }
  };

  const getCommandDescription = (command) => {
    const descriptions = {
      help: 'Show available commands',
      about: 'Learn about me',
      skills: 'View technical skills',
      experience: 'Professional experience',
      education: 'Educational background',
      projects: 'View my projects',
      project: 'View specific project details',
      blog: 'Read blog posts',
      contact: 'Get in touch',
      guestbook: 'View/sign guestbook',
      resume: 'Download resume',
      social: 'Social media links',
      clear: 'Clear terminal',
      theme: 'Change theme',
      whoami: 'Current user info',
      date: 'Show current date',
      pwd: 'Show current directory',
      ls: 'List directory contents',
      cat: 'View file contents',
      matrix: 'Enter the Matrix',
      snake: 'Play Snake game',
      joke: 'Random dev joke'
    };
    return descriptions[command] || 'Command';
  };

  const processCommand = async (command) => {
    if (!command) return;

    setIsProcessing(true);
    
    // Check for modal commands first
    const [cmd, ...args] = command.toLowerCase().split(' ');
    
    // Handle guestbook modal - only show modal when explicitly called with "guestbook modal"
    if (cmd === 'guestbook' && args.length > 0 && args[0] === 'modal') {
      setShowGuestbookModal(true);
      setIsProcessing(false);
      return;
    }
    
    // Handle contact form modal
    if (cmd === 'contact' && args[0] === 'form') {
      setShowContactModal(true);
      setIsProcessing(false);
      return;
    }
    
    // Add command to history
    const commandEntry = {
      type: 'input',
      content: command
    };
    
    setHistory(prev => [...prev, commandEntry]);
    
    // Add to command history for arrow key navigation
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    
    try {
      // Process command
      const result = await commandProcessor.processCommand(command);
      
      // Add result to history
      if (result) {
        setHistory(prev => [...prev, {
          type: 'output',
          content: result
        }]);
      }

      // Handle special commands
      if (command.startsWith('theme ')) {
        const themeName = command.split(' ')[1];
        if (['green', 'amber', 'dark', 'blue'].includes(themeName)) {
          window.dispatchEvent(new CustomEvent('themeChange', { detail: themeName }));
        }
      }

      if (command === 'clear') {
        setHistory([]);
      }
    } catch (error) {
      setHistory(prev => [...prev, {
        type: 'output',
        content: `Error: ${error.message}`
      }]);
    } finally {
      setIsProcessing(false);
      setCurrentInput('');
    }
  };

  // Modal handlers
  const handleGuestbookSubmit = async (formData) => {
    try {
      const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiBase}/guestbook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setHistory(prev => [...prev, {
          type: 'output',
          content: `<div style="color: var(--accent-color);">✅ Thank you, ${formData.name}! Your message has been added to the guestbook.</div>`
        }]);
      } else {
        throw new Error('Failed to submit guestbook entry');
      }
    } catch (error) {
      setHistory(prev => [...prev, {
        type: 'output',
        content: `<div style="color: #ff6b6b;">❌ Failed to submit guestbook entry. Please try again.</div>`
      }]);
    }
  };

  const handleContactSubmit = async (formData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setHistory(prev => [...prev, {
          type: 'output',
          content: `<div style="color: var(--accent-color);">✅ Thank you, ${formData.name}! Your message has been sent successfully.</div>`
        }]);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setHistory(prev => [...prev, {
        type: 'output',
        content: `<div style="color: #ff6b6b;">❌ Failed to send message. Please try again.</div>`
      }]);
    }
  };

  return (
    <TerminalContainer>
      <TerminalHeader>
        <WindowControls>
          <WindowControl color="#ff5f57" />
          <WindowControl color="#ffbd2e" />
          <WindowControl color="#28ca42" />
        </WindowControls>
        <TerminalTitle>portfolio-terminal ~ zsh</TerminalTitle>
      </TerminalHeader>
      
      <TerminalContent ref={terminalRef}>
        {history.map((item, index) => (
          <div key={index}>
            {item.type === 'input' && (
              <InputLine>
                <Prompt>$ </Prompt>
                <span>{item.content}</span>
              </InputLine>
            )}
            {item.type === 'output' && (
              <OutputLine>
                {index === 0 ? (
                  <WelcomeBanner>
                    <pre>{item.content}</pre>
                  </WelcomeBanner>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                )}
              </OutputLine>
            )}
          </div>
        ))}
        
        {!isProcessing && (
          <div style={{ position: 'relative' }}>
            <InputLine>
              <Prompt>$ </Prompt>
              <Input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type a command... (Try 'help' or press Tab)"
                disabled={showGuestbookModal || showContactModal}
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
              <Cursor />
            </InputLine>
            
            {showAutocomplete && autocompleteOptions.length > 0 && (
              <AutocompleteContainer>
                {autocompleteOptions.map((option, index) => (
                  <AutocompleteItem
                    key={option.command}
                    className={index === selectedAutocomplete ? 'selected' : ''}
                    onClick={() => {
                      setCurrentInput(option.command);
                      setShowAutocomplete(false);
                      inputRef.current?.focus();
                    }}
                  >
                    <span className="command">{option.command}</span>
                    <span className="description">- {option.description}</span>
                  </AutocompleteItem>
                ))}
                <div style={{ 
                  padding: '4px 12px', 
                  fontSize: '0.8em', 
                  color: 'var(--accent-color)', 
                  borderTop: '1px solid var(--accent-color)' 
                }}>
                  ↑↓ Navigate • Tab/Enter Select • Esc Close
                </div>
              </AutocompleteContainer>
            )}
          </div>
        )}
        
        {isProcessing && (
          <OutputLine>
            <span style={{ color: 'var(--accent-color)' }}>Processing...</span>
          </OutputLine>
        )}
      </TerminalContent>
      
      {/* Modal Components */}
      <GuestbookModal
        isOpen={showGuestbookModal}
        onClose={() => setShowGuestbookModal(false)}
        onSubmit={handleGuestbookSubmit}
      />
      
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onSubmit={handleContactSubmit}
      />
    </TerminalContainer>
  );
};

export default Terminal;
