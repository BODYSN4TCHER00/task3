import React, { useState, useEffect } from 'react';

/* eslint-disable no-undef */

// LCM Calculator that strictly follows task requirements
const lcmLogic = {
  // GCD using Euclidean algorithm with BigInt
  gcd: (a, b) => {
    while (b !== 0n) {
      [a, b] = [b, a % b];
    }
    return a;
  },
  
  // LCM calculation: LCM(a,b) = (a * b) / GCD(a,b)
  lcm: (x, y) => {
    // Special case for lcm(0,0) = 0
    if (x === 0n && y === 0n) return 0n;
    // If either is 0, lcm = 0
    if (x === 0n || y === 0n) return 0n;
    // Standard LCM formula for positive numbers
    const result = (x * y) / lcmLogic.gcd(x, y);
    // Ensure we return integer (avoid float issues in JavaScript)
    return result;
  },
  
  // Check if input is a natural number (non-negative integer: 0, 1, 2, 3, ...)
  isNaturalNumber: (str) => {
    // For this task: Natural numbers include 0, 1, 2, 3, 4, ...
    if (str === null || str === undefined || str === '') return false;
    
    const trimmed = String(str).trim();
    if (trimmed === '') return false;
    
    // Must contain only digits (rejects decimals, negatives, letters, etc.)
    if (!/^\d+$/.test(trimmed)) return false;
    
    try {
      const num = BigInt(trimmed);
      // Natural numbers are >= 0 (includes zero!)
      return num >= 0n;
    } catch {
      return false;
    }
  },
  
  // Main calculation following task requirements exactly
  calculate: (x, y) => {
    // Task: "If either x or y is not a natural number, return the string 'NaN'"
    if (!lcmLogic.isNaturalNumber(x) || !lcmLogic.isNaturalNumber(y)) {
      return 'NaN';
    }
    
    try {
      const numX = BigInt(String(x).trim());
      const numY = BigInt(String(y).trim());
      const result = lcmLogic.lcm(numX, numY);
      
      // Task: "plain string containing only digits"
      return result.toString();
    } catch {
      return 'NaN';
    }
  }
};

// Component for plain text result (no HTML formatting)
const PlainResult = ({ result }) => (
  <div style={{ margin: 0, padding: 0 }}>
    {result}
  </div>
);

// Simple info page when no parameters
const InfoPage = () => (
  <div style={{
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  }}>
    <h1>LCM Calculator</h1>
    <p>HTTP GET method that returns the Lowest Common Multiple of two natural numbers.</p>
    
    <h3>Usage:</h3>
    <p>Add parameters: <code>?x=[number]&y=[number]</code></p>
    
    <h3>Example:</h3>
    <p>
      <a href="?x=12&y=18" target="_blank" rel="noopener noreferrer">
        {window.location.href}?x=12&y=18
      </a>
    </p>
    
    <h3>Your Configuration:</h3>
    <p><strong>Email:</strong> dcumplido04@gmail.com</p>
    <p><strong>URL ending:</strong> dcumplido04_gmail_com</p>
    
    <h3>Rules:</h3>
    <ul>
      <li>Returns plain text (digits only or "NaN")</li>
      <li>Accepts natural numbers (0, 1, 2, 3, ...)</li>
      <li>Invalid inputs return "NaN"</li>
    </ul>
  </div>
);

// Main component
const LCMService = () => {
  const [result, setResult] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const x = urlParams.get('x');
    const y = urlParams.get('y');
    
    // Only calculate if both parameters are present in URL
    if (urlParams.has('x') && urlParams.has('y')) {
      const calculatedResult = lcmLogic.calculate(x, y);
      setResult(calculatedResult);
    }
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const hasParams = urlParams.has('x') && urlParams.has('y');
  
  // Task requirement: Return plain string (no HTML) when parameters present
  return hasParams ? <PlainResult result={result} /> : <InfoPage />;
};

export default LCMService;