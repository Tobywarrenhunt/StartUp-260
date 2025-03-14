


import React, { useState, useRef, useEffect } from 'react';
import './play.css';

export function Play({ updateMessage }) {
  const initialPositions = {
    green: { x: 10, y: 100 },
    red: { x: 10, y: 220 },
    blue: { x: 10, y: 340 },
    purple: { x: 10, y: 460 },
    orange: { x: 10, y: 580 },
  };

  const [dragPositions, setDragPositions] = useState({ ...initialPositions });
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [inputValues, setInputValues] = useState({
    green: '',
    red: '',
    blue: '',
    purple: '',
    orange: '',
  });

  const [cutMessage, setCutMessage] = useState('');
  const [ronQuote, setRonQuote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const elementRefs = {
    green: useRef(null),
    red: useRef(null),
    blue: useRef(null),
    purple: useRef(null),
    orange: useRef(null),
  };

  const cutRef = useRef(null);

  // Fetch Ron Swanson quote from the API
  const fetchRonQuote = async () => {
    try {
      const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes'); // Ron Swanson Quotes API URL

      if (!response.ok) {
        throw new Error(`Error fetching quote: ${response.statusText}`);
      }

      const data = await response.json();
      setRonQuote(data[0] || 'No quote available.');
    } catch (error) {
      console.error('Error fetching quote:', error);
      setErrorMessage(`Failed to load quote: ${error.message}`);
      setRonQuote('');
    }
  };

  useEffect(() => {
    fetchRonQuote();  // Call the API on mount to get an initial quote
  }, []);

  // Drag and Drop Handlers
  const handleMouseDown = (e, color) => {
    setIsDragging(true);
    setDraggedElement(color);

    const element = elementRefs[color].current;
    setOffset({
      x: e.clientX - element.getBoundingClientRect().left,
      y: e.clientY - element.getBoundingClientRect().top,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging && draggedElement) {
      setDragPositions((prevPositions) => ({
        ...prevPositions,
        [draggedElement]: {
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        },
      }));

      if (cutRef.current) {
        const cutRect = cutRef.current.getBoundingClientRect();
        const isOverCutArea =
          e.clientX >= cutRect.left &&
          e.clientX <= cutRect.right &&
          e.clientY >= cutRect.top &&
          e.clientY <= cutRect.bottom;

        if (isOverCutArea) {
          setCutMessage(inputValues[draggedElement]);
        } else {
          setCutMessage('');
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging && draggedElement) {
      setDragPositions((prevPositions) => ({
        ...prevPositions,
        [draggedElement]: initialPositions[draggedElement],
      }));

      setIsDragging(false);
      setDraggedElement(null);

      if (cutMessage) {
        updateMessage(draggedElement, cutMessage);  // Send message to parent component
      }
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, cutMessage]);

  const handleInputChange = (e, color) => {
    setInputValues((prev) => ({
      ...prev,
      [color]: e.target.value,
    }));
  };

  // Button to fetch a new quote
  const handleNewQuote = () => {
    fetchRonQuote();
  };

  return (
    <main>
      <div className="place-2">
        {/* Draggable green element */}
        <div
          ref={elementRefs.green}
          className="c_green"
          onMouseDown={(e) => handleMouseDown(e, 'green')}
          style={{
            top: `${dragPositions.green.y}px`,
            left: `${dragPositions.green.x}px`,
            position: 'absolute',
          }}
        >
          <input
            className="m_green"
            type="text"
            value={inputValues.green}
            onChange={(e) => handleInputChange(e, 'green')}
            placeholder="Green Message"
          />
        </div>

        {/* Draggable red element */}
        <div
          ref={elementRefs.red}
          className="c_red"
          onMouseDown={(e) => handleMouseDown(e, 'red')}
          style={{
            top: `${dragPositions.red.y}px`,
            left: `${dragPositions.red.x}px`,
            position: 'absolute',
          }}
        >
          <input
            className="m_red"
            type="text"
            value={inputValues.red}
            onChange={(e) => handleInputChange(e, 'red')}
            placeholder="Red Message"
          />
        </div>

        {/* Draggable blue element */}
        <div
          ref={elementRefs.blue}
          className="c_blue"
          onMouseDown={(e) => handleMouseDown(e, 'blue')}
          style={{
            top: `${dragPositions.blue.y}px`,
            left: `${dragPositions.blue.x}px`,
            position: 'absolute',
          }}
        >
          <input
            className="m_blue"
            type="text"
            value={inputValues.blue}
            onChange={(e) => handleInputChange(e, 'blue')}
            placeholder="Blue Message"
          />
        </div>

        {/* Draggable purple element */}
        <div
          ref={elementRefs.purple}
          className="c_purple"
          onMouseDown={(e) => handleMouseDown(e, 'purple')}
          style={{
            top: `${dragPositions.purple.y}px`,
            left: `${dragPositions.purple.x}px`,
            position: 'absolute',
          }}
        >
          <input
            className="m_purple"
            type="text"
            value={inputValues.purple}
            onChange={(e) => handleInputChange(e, 'purple')}
            placeholder="Purple Message"
          />
        </div>

        {/* Draggable orange element */}
        <div
          ref={elementRefs.orange}
          className="c_orange"
          onMouseDown={(e) => handleMouseDown(e, 'orange')}
          style={{
            top: `${dragPositions.orange.y}px`,
            left: `${dragPositions.orange.x}px`,
            position: 'absolute',
          }}
        >
          <input
            className="m_orange"
            type="text"
            value={inputValues.orange}
            onChange={(e) => handleInputChange(e, 'orange')}
            placeholder="Orange Message"
          />
        </div>

        {/* Static "Cut Here" Section */}
        <div className="cutter" ref={cutRef}>
          <h1 className="cut-here">Cut Here</h1>
          <div className="cut-message">
            <input type="text" value={cutMessage} placeholder="Display message" readOnly />
          </div>
        </div>
      </div>

      {/* Display Ron Swanson Quote */}
      <div className="grid-3">
        <h1 className="quote">Ron Swanson Quote</h1>
        <div className="quote-display">
          {errorMessage ? (
            <p style={{ color: 'red' }}>{errorMessage}</p>
          ) : (
            <input
              type="text"
              value={ronQuote || 'Loading quote...'}
              readOnly
              className="quote-input"
            />
          )}
        </div>
        <button onClick={handleNewQuote} className="generate-quote-btn">
          Get New Quote
        </button>
      </div>
    </main>
  );
}
