import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px var(--accent-color); }
  50% { box-shadow: 0 0 30px var(--accent-color), 0 0 40px var(--accent-color); }
`;

const ProfileContainer = styled.div`
  background: linear-gradient(135deg, var(--bg-color) 0%, rgba(0, 255, 0, 0.1) 100%);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 30px;
  position: relative;
  border-right: 2px solid var(--accent-color);
  overflow: hidden;

  @media (max-width: 768px) {
    height: 40vh;
    padding: 20px 15px;
    border-right: none;
    border-bottom: 2px solid var(--accent-color);
  }

  @media (max-width: 480px) {
    height: 35vh;
    padding: 15px 10px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 255, 0, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
  animation: ${fadeIn} 1s ease-out;
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const ProfileImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent-color);
  animation: ${glow} 3s ease-in-out infinite;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
  
  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ProfileInfo = styled.div`
  text-align: center;
  animation: ${fadeIn} 1s ease-out 0.3s both;
`;

const Name = styled.h1`
  font-size: 2.2em;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 10px;
  text-shadow: 0 0 10px var(--accent-color);
  
  @media (max-width: 768px) {
    font-size: 1.8em;
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5em;
    margin-bottom: 5px;
  }
`;

const Title = styled.h2`
  font-size: 1.4em;
  color: var(--accent-color);
  margin-bottom: 10px;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1.2em;
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1em;
    margin-bottom: 6px;
  }
`;

const SeniorTitle = styled.h3`
  font-size: 1.2em;
  color: #00ff00;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 15px #00ff00, 0 0 25px #00ff00;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-align: center;
  animation: ${fadeIn} 1s ease-out 0.4s both;
  
  @media (max-width: 768px) {
    font-size: 1.1em;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 1em;
    margin-bottom: 12px;
  }
`;

const MotivationalQuote = styled.p`
  font-size: 0.9em;
  color: var(--accent-color);
  font-style: italic;
  font-family: 'Courier New', monospace;
  opacity: 0.9;
  max-width: 350px;
  margin: 0 auto 20px auto;
  line-height: 1.4;
  text-align: center;
  animation: ${fadeIn} 1s ease-out 0.5s both;
  
  @media (max-width: 768px) {
    font-size: 0.8em;
    max-width: 300px;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75em;
    max-width: 250px;
    margin-bottom: 12px;
    line-height: 1.3;
  }
`;

const Description = styled.p`
  color: var(--text-color);
  font-size: 1em;
  line-height: 1.6;
  max-width: 300px;
  margin-bottom: 30px;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 0.9em;
    max-width: 250px;
    margin-bottom: 20px;
    line-height: 1.4;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8em;
    max-width: 200px;
    margin-bottom: 15px;
    display: none; /* Hide on very small screens to save space */
  }
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 30px;
  animation: ${fadeIn} 1s ease-out 0.6s both;
  
  @media (max-width: 768px) {
    gap: 6px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 4px;
    margin-bottom: 15px;
  }
`;

const SkillTag = styled.span`
  background: rgba(0, 255, 0, 0.1);
  color: var(--accent-color);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8em;
  border: 1px solid var(--accent-color);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 0.7em;
  }
  
  @media (max-width: 480px) {
    padding: 3px 6px;
    font-size: 0.65em;
  }
  
  &:hover {
    background: var(--accent-color);
    color: var(--bg-color);
    transform: translateY(-2px);
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 0.9em;
  color: var(--accent-color);
  animation: ${fadeIn} 1s ease-out 0.9s both;
  
  @media (max-width: 768px) {
    font-size: 0.8em;
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.7em;
    gap: 6px;
  }
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background: var(--accent-color);
  border-radius: 50%;
  animation: ${glow} 2s ease-in-out infinite;
  
  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
  }
`;

const TerminalPrompt = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--prompt-color);
  font-size: 0.9em;
  text-align: center;
  animation: ${fadeIn} 1s ease-out 1.2s both;
  
  @media (max-width: 768px) {
    bottom: 15px;
    font-size: 0.8em;
  }
  
  @media (max-width: 480px) {
    bottom: 10px;
    font-size: 0.7em;
    display: none; /* Hide on very small screens */
  }
`;

const ProfileSection = () => {
  const skills = ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS'];

  return (
    <ProfileContainer>
      <ProfileImageContainer>
        <ProfileImage 
          src="/profile.jpg" 
          alt="John Hika - Full Stack Developer" 
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div style={{
          display: 'none',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          border: '3px solid var(--accent-color)',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '4em',
          background: 'rgba(0, 255, 0, 0.1)'
        }}>
          👨‍💻
        </div>
      </ProfileImageContainer>

      <ProfileInfo>
        <Name>John Hika</Name>
        <SeniorTitle>Senior Software Development Engineer</SeniorTitle>
        <Title>Full Stack Developer</Title>
        <MotivationalQuote>
          "I'm gonna build the most amazing applications! No matter how tough the code gets, I'll never give up on my dream!"
        </MotivationalQuote>
        
        <Description>
          Passionate developer crafting innovative solutions with modern technologies. 
          Building the future, one line of code at a time.
        </Description>
        
        <SkillTags>
          {skills.map((skill, index) => (
            <SkillTag key={index}>{skill}</SkillTag>
          ))}
        </SkillTags>

        <StatusIndicator>
          <StatusDot />
          <span>Available for opportunities</span>
        </StatusIndicator>
      </ProfileInfo>

      <TerminalPrompt>
        <div>← Start exploring with the terminal</div>
        <div style={{ fontSize: '0.8em', opacity: 0.7, marginTop: '5px' }}>
          Type 'help' to begin your journey
        </div>
      </TerminalPrompt>
    </ProfileContainer>
  );
};

export default ProfileSection;
