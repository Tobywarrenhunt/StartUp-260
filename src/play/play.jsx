import React, { useState, useRef, useEffect } from 'react';
import './play.css';

export function Play() {
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
  const [randomQuote, setRandomQuote] = useState('');

  const elementRefs = {
    green: useRef(null),
    red: useRef(null),
    blue: useRef(null),
    purple: useRef(null),
    orange: useRef(null),
  };

  const cutRef = useRef(null);

  // Function to update messages
  const updateMessages = (color, message) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [color]: message
    }));
  };

  const quotesArray = [
    "The only way to do great work is to love what you do.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Life is what happens when you're busy making other plans.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "In the end, it's not the years in your life that count, it's the life in your years.",
    "Don't cry because it's over, smile because it happened.",
    "You must be the change you wish to see in the world.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "It is never too late to be what you might have been.",
    "You only live once, but if you do it right, once is enough.",
    "A journey of a thousand miles begins with a single step.",
    "To live is the rarest thing in the world. Most people exist, that is all.",
    "Good friends, good books, and a sleepy conscience: this is the ideal life.",
    "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well."
  ];

  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    setRandomQuote(quotesArray[randomIndex]);
  };

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
        updateMessages(draggedElement, cutMessage);
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

      {/* Random Quote Generator */}
      <div className="grid-3">
        <h1 className="quote">Random quote generator</h1>
        <div className="generate-center">
          <button className="generate" onClick={generateRandomQuote}>
            Generate
          </button>
        </div>
        <p className="display">
          <input type="text" value={randomQuote} readOnly />
        </p>
      </div>
    </main>
  );
}









