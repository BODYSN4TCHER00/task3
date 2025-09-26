import React, { useState, useEffect } from 'react';

// logic
const lcmLogic = {
  // algorithm 
  gcd: (a, b) => {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  },
  
  // lcm calculation formula
  lcm: (x, y) => x === 0 || y === 0 ? 0 : Math.abs(x * y) / lcmLogic.gcd(x, y),
  
  // natural number check
  isNatural: (num) => Number.isInteger(num) && num > 0,
  
  // main calculation function 
  calculate: (x, y) => {
    const [numX, numY] = [Number(x), Number(y)];
    return isNaN(numX) || isNaN(numY) || !lcmLogic.isNatural(numX) || !lcmLogic.isNatural(numY)
      ? 'NaN'
      : lcmLogic.lcm(numX, numY).toString();
  }
};

// plain text result
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

// main view
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

// url parameters
const LCMService = () => {
  const [result, setResult] = useState('');
  
  const urlParams = new URLSearchParams(window.location.search);
  const [x, y] = [urlParams.get('x'), urlParams.get('y')];

  useEffect(() => {
    if (x && y) setResult(lcmLogic.calculate(x, y));
  }, [x, y]);

  // show result if there are parameters only
  return x && y ? <PlainTextResult result={result} /> : <InstructionsView />;
};

export default LCMService;