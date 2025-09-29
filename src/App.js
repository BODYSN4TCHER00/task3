// src/App.js
import { useEffect } from 'react';

/* eslint-disable no-undef */

const App = () => {
  useEffect(() => {
    // Only run LCM logic on the correct path
    const path = window.location.pathname;
    if (path !== '/dcumplido04_gmail_com') {
      document.body.innerHTML = '404 - Not Found';
      return;
    }

    // LCM Calculator - Pure JavaScript, No React rendering
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
        // Special case: LCM(0,0) = 0
        if (x === 0n && y === 0n) return 0n;
        // If either is 0, LCM is 0
        if (x === 0n || y === 0n) return 0n;
        
        // Use (x/gcd) * y to avoid large intermediate values and floating point
        const gcdValue = lcmLogic.gcd(x, y);
        return (x / gcdValue) * y;
      },
      
      // Strict validation for natural numbers (includes 0)
      isNaturalNumber: (str) => {
        // Handle null, undefined, empty string, or just braces
        if (str === null || str === undefined || str === '' || str === '{}') return false;
        
        const trimmed = String(str).trim();
        // Empty after trimming or just braces
        if (trimmed === '' || trimmed === '{}') return false;
        
        // Must contain ONLY digits - no letters, decimals, signs, spaces, braces
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

    const urlParams = new URLSearchParams(window.location.search);
    
    let result;
    
    // Check if both x and y parameters exist
    if (urlParams.has('x') && urlParams.has('y')) {
      const x = urlParams.get('x');
      const y = urlParams.get('y');
      result = lcmLogic.calculate(x, y);
    } else {
      // No parameters or missing parameters - return NaN
      result = 'NaN';
    }
    
    // Replace entire page with ONLY plain text
    document.open();
    document.write(result);
    document.close();
  }, []);

  // Never render anything - useEffect handles everything
  return null;
};

export default App;