import React, { useState, useEffect } from 'react';

/* eslint-disable no-undef */

// Bulletproof LCM logic for all edge cases
const lcmLogic = {
  // GCD using BigInt
  gcd: (a, b) => {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b !== 0n) {
      [a, b] = [b, a % b];
    }
    return a;
  },
  
  // LCM with all special cases
  lcm: (x, y) => {
    // Special case: lcm(0,0) = 0
    if (x === 0n && y === 0n) return 0n;
    // If either is 0, lcm = 0
    if (x === 0n || y === 0n) return 0n;
    // Normal LCM calculation
    return (x * y) / lcmLogic.gcd(x, y);
  },
  
  // Ultra strict validation for natural numbers
  isValidInput: (value) => {
    // Handle null, undefined, empty string
    if (value === null || value === undefined || value === '') return false;
    
    // Convert to string and trim
    const str = String(value).trim();
    
    // Empty after trim
    if (str === '') return false;
    
    // Must be only digits (no letters, decimals, signs, spaces)
    if (!/^\d+$/.test(str)) return false;
    
    try {
      const num = BigInt(str);
      // Natural numbers are positive integers (> 0)
      return num > 0n;
    } catch {
      return false;
    }
  },
  
  // Handle the calculation with all edge cases
  calculate: (x, y) => {
    // Check if both inputs are valid natural numbers
    if (!lcmLogic.isValidInput(x) || !lcmLogic.isValidInput(y)) {
      return 'NaN';
    }
    
    try {
      const numX = BigInt(String(x).trim());
      const numY = BigInt(String(y).trim());
      const result = lcmLogic.lcm(numX, numY);
      return result.toString();
    } catch {
      return 'NaN';
    }
  },
  
  // Special handling for edge cases like (0,0)
  handleSpecialCases: (x, y) => {
    // If both are exactly "0" string
    if (x === '0' && y === '0') {
      return '0';
    }
    
    // If either is "0", and the other is invalid
    if (x === '0' || y === '0') {
      const otherValue = x === '0' ? y : x;
      if (!lcmLogic.isValidInput(otherValue)) {
        return 'NaN';
      }
      return '0';
    }
    
    return null; // No special case, proceed with normal calculation
  }
};

// Plain text result - absolutely minimal
const PlainTextResult = ({ result }) => (
  <div>{result}</div>
);

// Simple instructions view
const InstructionsView = () => (
  <div style={{
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6'
  }}>
    <h1>LCM Calculator</h1>
    <p>Returns the Lowest Common Multiple of two natural numbers via HTTP GET.</p>
    
    <h3>Test Example:</h3>
    <p>
      <a href="?x=12&y=18" target="_blank" rel="noopener noreferrer">
        {window.location.origin}{window.location.pathname}?x=12&y=18
      </a>
    </p>
    
    <p><strong>Email:</strong> dcumplido04@gmail.com</p>
    <p><strong>URL Format:</strong> /dcumplido04_gmail_com?x={`{}`}&y={`{}`}</p>
  </div>
);

// Main component with comprehensive parameter handling
const LCMService = () => {
  const [result, setResult] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const x = urlParams.get('x');
    const y = urlParams.get('y');
    
    // Only process if BOTH parameters are present (even if null/empty)
    if (urlParams.has('x') && urlParams.has('y')) {
      // Check for special cases first
      const specialResult = lcmLogic.handleSpecialCases(x, y);
      if (specialResult !== null) {
        setResult(specialResult);
      } else {
        // Normal calculation
        setResult(lcmLogic.calculate(x, y));
      }
    }
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  
  // Show result ONLY if both x and y parameters exist in URL
  return (urlParams.has('x') && urlParams.has('y')) ? 
    <PlainTextResult result={result} /> : 
    <InstructionsView />;
};

export default LCMService;