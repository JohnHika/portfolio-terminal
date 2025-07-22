import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContainer = styled.div`
  background: var(--bg-color);
  border: 2px solid var(--accent-color);
  border-radius: 8px;
  padding: 25px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideUp} 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 255, 0, 0.3);

  @media (max-width: 768px) {
    width: 95%;
    padding: 20px;
    margin: 20px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--accent-color);
`;

const ModalTitle = styled.h2`
  color: var(--accent-color);
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 1.2em;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.5em;
  cursor: pointer;
  padding: 5px;
  margin-left: auto;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const ModalContent = styled.div`
  color: var(--text-color);
  line-height: 1.6;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  color: var(--prompt-color);
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  color: var(--text-color);
  font-family: 'Fira Code', monospace;
  
  &:focus {
    outline: none;
    border-color: var(--prompt-color);
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  color: var(--text-color);
  font-family: 'Fira Code', monospace;
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: var(--prompt-color);
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  background: ${props => props.primary ? 'var(--accent-color)' : 'transparent'};
  color: ${props => props.primary ? 'var(--bg-color)' : 'var(--accent-color)'};
  font-family: 'Fira Code', monospace;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--accent-color);
    color: var(--bg-color);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  showCloseButton = true 
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    // Prevent keyboard events from propagating to the terminal
    e.stopPropagation();
    
    // Close modal on Escape key
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick} onKeyDown={handleKeyDown}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {showCloseButton && (
            <CloseButton onClick={onClose}>✕</CloseButton>
          )}
        </ModalHeader>
        <ModalContent>
          {children}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Guestbook Modal Component
export const GuestbookModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const firstInputRef = React.useRef(null);

  // Focus on first input when modal opens
  React.useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => {
        firstInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      alert('Name and message are required!');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    } catch (error) {
      alert('Failed to submit guestbook entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📖 Sign the Guestbook">
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name *</Label>
          <Input
            ref={firstInputRef}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">Email (Optional)</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="message">Message *</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Leave a message..."
            required
          />
        </FormGroup>
        
        <ButtonGroup>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" primary disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Sign Guestbook'}
          </Button>
        </ButtonGroup>
      </form>
    </Modal>
  );
};

// Contact Modal Component
export const ContactModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const firstInputRef = React.useRef(null);

  // Focus on first input when modal opens
  React.useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => {
        firstInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Name, email, and message are required!');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
      onClose();
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📧 Contact Me">
      <div style={{ marginBottom: '15px', color: 'var(--text-color)' }}>
        Send me a message and I'll get back to you as soon as possible!
      </div>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="contact-name">Name *</Label>
          <Input
            ref={firstInputRef}
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="contact-email">Email *</Label>
          <Input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="contact-subject">Subject</Label>
          <Input
            type="text"
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What's this about?"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="contact-message">Message *</Label>
          <TextArea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            style={{ minHeight: '120px' }}
            required
          />
        </FormGroup>
        
        <ButtonGroup>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" primary disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </ButtonGroup>
      </form>
    </Modal>
  );
};

export default Modal;
