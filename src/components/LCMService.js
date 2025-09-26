import React, { useState, useEffect } from 'react';

// logic with BigInt and proper validation
const lcmLogic = {
  // GCD algorithm using BigInt
  gcd: (a, b) => {
    while (b !== 0n) {
      [a, b] = [b, a % b];
    }
    return a;
  },
  
  // LCM calculation with special case for (0,0)
  lcm: (x, y) => {
    // Special case for lcm(0,0)
    if (x === 0n && y === 0n) return 0n;
    if (x === 0n || y === 0n) return 0n;
    return (x * y) / lcmLogic.gcd(x, y);
  },
  
  // Strict validation for natural numbers - must be pure digits and > 0
  isValidNatural: (str) => {
    if (!str || typeof str !== 'string') return false;
    const trimmed = str.trim();
    // Must contain only digits (rejects "10asdad", "10.5", etc.)
    if (!/^\d+$/.test(trimmed)) return false;
    try {
      const num = BigInt(trimmed);
      return num > 0n; // Must be positive (natural number)
    } catch {
      return false;
    }
  },
  
  // Main calculation function 
  calculate: (x, y) => {
    if (!lcmLogic.isValidNatural(x) || !lcmLogic.isValidNatural(y)) {
      return 'NaN';
    }
    
    try {
      const numX = BigInt(x.trim());
      const numY = BigInt(y.trim());
      return lcmLogic.lcm(numX, numY).toString();
    } catch {
      return 'NaN';
    }
  }
};

// Plain text result component
const PlainTextResult = ({ result }) => (
  <div style={{
    fontFamily: 'monospace',
    fontSize: '16px',
    margin: 0,
    padding: 0,
    whiteSpace: 'pre-wrap'
  }}>
    {result}
  </div>
);

// Main view with simple instructions
const InstructionsView = () => (
  <div style={{
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6'
  }}>
    <h1 style={{ textAlign: 'center', color: '#333' }}>LCM Calculator API</h1>
    
    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>Usage</h3>
      <p>Add parameters: <code>?x={'{number}'}&y={'{number}'}</code></p>
      <p><strong>Example:</strong> <code>{window.location.href}?x=12&y=18</code></p>
    </div>

    <div style={{ background: '#f0f8e8', padding: '20px', borderRadius: '8px' }}>
      <h3>Rules</h3>
      <ul style={{ margin: 0 }}>
        <li>Returns plain text (digits only or "NaN")</li>
        <li>Accepts only natural numbers (positive integers)</li>
        <li>Invalid inputs return "NaN"</li>
      </ul>
    </div>
  </div>
);

// Main component
const LCMService = () => {
  const [result, setResult] = useState('');
  
  const urlParams = new URLSearchParams(window.location.search);
  const x = urlParams.get('x');
  const y = urlParams.get('y');

  useEffect(() => {
    if (x !== null && y !== null) {
      setResult(lcmLogic.calculate(x, y));
    }
  }, [x, y]);

  // Show result if there are parameters, otherwise show instructions
  return (x !== null && y !== null) ? <PlainTextResult result={result} /> : <InstructionsView />;
};

export default LCMService;