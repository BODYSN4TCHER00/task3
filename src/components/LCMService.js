import React, { useEffect } from 'react';

/* eslint-disable no-undef */

// LCM Calculator - strictly following task requirements
const lcmLogic = {
  // GCD using Euclidean algorithm with BigInt
  gcd: (a, b) => {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b !== 0n) {
      [a, b] = [b, a % b];
    }
    return a;
  },
  
  // LCM calculation with BigInt to avoid floating point issues
  lcm: (x, y) => {
    // Special case: LCM(0,0) = 0 (as per task requirements)
    if (x === 0n && y === 0n) return 0n;
    // If either is 0, LCM is 0
    if (x === 0n || y === 0n) return 0n;
    
    // Use (x/gcd) * y to avoid large intermediate values and floating point
    const gcdValue = lcmLogic.gcd(x, y);
    return (x / gcdValue) * y;
  },
  
  // Strict validation for natural numbers (includes 0)
  isNaturalNumber: (str) => {
    if (str === null || str === undefined || str === '') return false;
    
    const trimmed = String(str).trim();
    if (trimmed === '') return false;
    
    // Must contain ONLY digits - no letters, decimals, signs, spaces
    if (!/^\d+$/.test(trimmed)) return false;
    
    try {
      const num = BigInt(trimmed);
      return num >= 0n; // Natural numbers: 0, 1, 2, 3, ...
    } catch {
      return false;
    }
  },
  
  // Main calculation with strict validation
  calculate: (x, y) => {
    // Strict validation - reject anything that's not a pure natural number
    if (!lcmLogic.isNaturalNumber(x) || !lcmLogic.isNaturalNumber(y)) {
      return 'NaN';
    }
    
    try {
      const numX = BigInt(String(x).trim());
      const numY = BigInt(String(y).trim());
      const result = lcmLogic.lcm(numX, numY);
      
      // Return as string containing only digits
      return result.toString();
    } catch {
      return 'NaN';
    }
  }
};

// Info page when no parameters
const InfoPage = () => (
  <div style={{
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  }}>
    <h1>LCM Calculator</h1>
    <p>HTTP GET method returning LCM of two natural numbers as plain text.</p>
    
    <h3>Usage:</h3>
    <p>Add parameters: <code>?x=[number]&y=[number]</code></p>
    
    <h3>Test Examples:</h3>
    <p><a href="?x=12&y=18">?x=12&y=18</a> → 36</p>
    <p><a href="?x=0&y=0">?x=0&y=0</a> → 0</p>
    <p><a href="?x=0&y=5">?x=0&y=5</a> → 0</p>
    <p><a href="?x=10asdad&y=5">?x=10asdad&y=5</a> → NaN</p>
    <p><a href="?x=67280421310721&y=2147483647">Large numbers test</a></p>
    
    <h3>Configuration:</h3>
    <p><strong>Email:</strong> dcumplido04@gmail.com</p>
    <p><strong>URL ending:</strong> dcumplido04_gmail_com</p>
    
    <h3>Rules:</h3>
    <ul>
      <li>Returns plain string: digits only or "NaN"</li>
      <li>Natural numbers: 0, 1, 2, 3, ...</li>
      <li>Invalid inputs (like "10asdad") return "NaN"</li>
      <li>Uses BigInt to avoid floating point results</li>
    </ul>
  </div>
);

// Main component - strictly compliant with task
const LCMService = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Only process if BOTH x and y parameters exist
    if (urlParams.has('x') && urlParams.has('y')) {
      const x = urlParams.get('x');
      const y = urlParams.get('y');
      
      const result = lcmLogic.calculate(x, y);
      
      // CRITICAL: Replace entire page with plain text result
      // No HTML, no formatting, just plain string
      document.body.innerHTML = '';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.fontFamily = 'monospace';
      document.body.appendChild(document.createTextNode(result));
      document.title = result;
    }
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const hasParams = urlParams.has('x') && urlParams.has('y');
  
  // If parameters exist, page content is already replaced with plain text
  return hasParams ? null : <InfoPage />;
};

export default LCMService;