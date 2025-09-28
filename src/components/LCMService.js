import React, { useState, useEffect } from 'react';

/* eslint-disable no-undef */

// LCM Calculator with proper handling for 0 and very large numbers
const lcmLogic = {
  // GCD using Euclidean algorithm with BigInt - handles large numbers
  gcd: (a, b) => {
    // Make sure we work with positive values for GCD calculation
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    
    while (b !== 0n) {
      [a, b] = [b, a % b];
    }
    return a;
  },
  
  // LCM calculation with proper 0 handling and BigInt for large numbers
  lcm: (x, y) => {
    // Handle zero cases properly (0 is natural number in this task)
    if (x === 0n && y === 0n) return 0n;
    if (x === 0n || y === 0n) return 0n;
    
    // For positive numbers, use standard LCM formula with BigInt
    const gcdValue = lcmLogic.gcd(x, y);
    return (x * y) / gcdValue;
  },
  
  // Check if input is a natural number (0, 1, 2, 3, ... - includes 0!)
  isNaturalNumber: (str) => {
    if (str === null || str === undefined) return false;
    
    const trimmed = String(str).trim();
    if (trimmed === '') return false;
    
    // Must contain only digits (no decimals, letters, negatives, etc.)
    if (!/^\d+$/.test(trimmed)) return false;
    
    try {
      const num = BigInt(trimmed);
      // Natural numbers include 0 and all positive integers
      return num >= 0n;
    } catch {
      return false;
    }
  },
  
  // Main calculation with error handling
  calculate: (x, y) => {
    // Validate both inputs are natural numbers
    if (!lcmLogic.isNaturalNumber(x) || !lcmLogic.isNaturalNumber(y)) {
      return 'NaN';
    }
    
    try {
      const numX = BigInt(String(x).trim());
      const numY = BigInt(String(y).trim());
      const result = lcmLogic.lcm(numX, numY);
      
      // Return as string (plain text with only digits)
      return result.toString();
    } catch (error) {
      return 'NaN';
    }
  }
};

// Component for plain text result (no HTML formatting)
const PlainResult = ({ result }) => result;


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
    <p>
      <a href="?x=0&y=5" target="_blank" rel="noopener noreferrer">
        Test with zero: ?x=0&y=5
      </a>
    </p>
    <p>
      <a href="?x=67280421310721&y=2147483647" target="_blank" rel="noopener noreferrer">
        Large numbers test: ?x=67280421310721&y=2147483647
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