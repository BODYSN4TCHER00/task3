import React, { useEffect, useState } from 'react';

const App = () => {
  const [result, setResult] = useState('');

  const gcd = (a, b) => b === 0n ? a : gcd(b, a % b);
  
  const lcm = (a, b) => {
    if (a === 0n && b === 0n) return 0n;
    if (a === 0n || b === 0n) return 0n;
    return (a * b) / gcd(a, b);
  };

  const isValid = (str) => str && /^\d+$/.test(str.trim()) && BigInt(str.trim()) > 0n;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const x = params.get('x');
    const y = params.get('y');
    
    if (x !== null && y !== null) {
      if (isValid(x) && isValid(y)) {
        setResult(lcm(BigInt(x.trim()), BigInt(y.trim())).toString());
      } else {
        setResult('NaN');
      }
    }
  }, []);

  const params = new URLSearchParams(window.location.search);
  if (params.get('x') !== null && params.get('y') !== null) {
    return <div>{result}</div>;
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>LCM Calculator</h1>
      <p>Returns the Lowest Common Multiple of two natural numbers via HTTP GET.</p>
      
      <h3>Test Example:</h3>
      <p>
        <a href="?x=12&y=18" target="_blank" rel="noopener noreferrer">
          {window.location.origin}{window.location.pathname}?x=12&y=18
        </a>
      </p>      
      <p><strong>URL Format:</strong> /dcumplido04_gmail_com?x={`{}`}&y={`{}`}</p>
    </div>
  );
};

export default App;