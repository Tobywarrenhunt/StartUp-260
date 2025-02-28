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











// import React, { useState, useRef } from 'react';
// import './play.css';

// export function Play() {
//   const initialPositions = {
//     green: { x: 10, y: 100 },
//     red: { x: 10, y: 220 },
//     blue: { x: 10, y: 340 },
//     purple: { x: 10, y: 460 },
//     orange: { x: 10, y: 580 },
//   };

//   const [dragPositions, setDragPositions] = useState({ ...initialPositions });
//   const [isDragging, setIsDragging] = useState(false);
//   const [draggedElement, setDraggedElement] = useState(null);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [inputValues, setInputValues] = useState({
//     green: '',
//     red: '',
//     blue: '',
//     purple: '',
//     orange: '',
//   });

//   const [cutMessage, setCutMessage] = useState('');
//   const [randomQuote, setRandomQuote] = useState('');

//   const elementRefs = {
//     green: useRef(null),
//     red: useRef(null),
//     blue: useRef(null),
//     purple: useRef(null),
//     orange: useRef(null),
//   };

//   const cutRef = useRef(null);

//   // Handle mouse down to start dragging
//   const handleMouseDown = (e, color) => {
//     setIsDragging(true);
//     setDraggedElement(color);

//     const element = elementRefs[color].current;
//     setOffset({
//       x: e.clientX - element.getBoundingClientRect().left,
//       y: e.clientY - element.getBoundingClientRect().top,
//     });
//   };

//   // Handle mouse move to drag the element
//   const handleMouseMove = (e) => {
//     if (isDragging && draggedElement) {
//       setDragPositions((prevPositions) => ({
//         ...prevPositions,
//         [draggedElement]: {
//           x: e.clientX - offset.x,
//           y: e.clientY - offset.y,
//         },
//       }));

//       if (cutRef.current) {
//         const cutRect = cutRef.current.getBoundingClientRect();
//         const isOverCutArea =
//           e.clientX >= cutRect.left &&
//           e.clientX <= cutRect.right &&
//           e.clientY >= cutRect.top &&
//           e.clientY <= cutRect.bottom;

//         if (isOverCutArea) {
//           setCutMessage(inputValues[draggedElement]);
//         } else {
//           setCutMessage('');
//         }
//       }
//     }
//   };

//   // Handle mouse up to stop dragging and reset position
//   const handleMouseUp = () => {
//     if (isDragging && draggedElement) {
//       setDragPositions((prevPositions) => ({
//         ...prevPositions,
//         [draggedElement]: initialPositions[draggedElement],
//       }));

//       setIsDragging(false);
//       setDraggedElement(null);
//     }
//   };

//   // Add global event listeners for mousemove and mouseup
//   React.useEffect(() => {
//     if (isDragging) {
//       window.addEventListener('mousemove', handleMouseMove);
//       window.addEventListener('mouseup', handleMouseUp);
//       return () => {
//         window.removeEventListener('mousemove', handleMouseMove);
//         window.removeEventListener('mouseup', handleMouseUp);
//       };
//     }
//   }, [isDragging]);

//   // Handle input change for each draggable element
//   const handleInputChange = (e, color) => {
//     setInputValues((prev) => ({
//       ...prev,
//       [color]: e.target.value,
//     }));
//   };

//   // Array of 15 random quotes
//   const quotesArray = [
//     "The only way to do great work is to love what you do.",
//     "Success is not the key to happiness. Happiness is the key to success.",
//     "Life is what happens when you're busy making other plans.",
//     "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
//     "In the end, it's not the years in your life that count, it's the life in your years.",
//     "Don't cry because it's over, smile because it happened.",
//     "You must be the change you wish to see in the world.",
//     "Success is not final, failure is not fatal: It is the courage to continue that counts.",
//     "Believe you can and you're halfway there.",
//     "It is never too late to be what you might have been.",
//     "You only live once, but if you do it right, once is enough.",
//     "A journey of a thousand miles begins with a single step.",
//     "To live is the rarest thing in the world. Most people exist, that is all.",
//     "Good friends, good books, and a sleepy conscience: this is the ideal life.",
//     "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well."
//   ];

//   // Function to pick a random quote from the quotesArray
//   const generateRandomQuote = () => {
//     const randomIndex = Math.floor(Math.random() * quotesArray.length);
//     setRandomQuote(quotesArray[randomIndex]);
//   };

//   return (
//     <main>
//       <div className="place-2">
//         {/* Draggable green element */}
//         <div
//           ref={elementRefs.green}
//           className="c_green"
//           onMouseDown={(e) => handleMouseDown(e, 'green')}
//           style={{
//             top: `${dragPositions.green.y}px`,
//             left: `${dragPositions.green.x}px`,
//             position: 'absolute',
//           }}
//         >
//           <input
//             className="m_green"
//             type="text"
//             value={inputValues.green}
//             onChange={(e) => handleInputChange(e, 'green')}
//             placeholder="Green Message"
//           />
//         </div>

//         {/* Draggable red element */}
//         <div
//           ref={elementRefs.red}
//           className="c_red"
//           onMouseDown={(e) => handleMouseDown(e, 'red')}
//           style={{
//             top: `${dragPositions.red.y}px`,
//             left: `${dragPositions.red.x}px`,
//             position: 'absolute',
//           }}
//         >
//           <input
//             className="m_red"
//             type="text"
//             value={inputValues.red}
//             onChange={(e) => handleInputChange(e, 'red')}
//             placeholder="Red Message"
//           />
//         </div>

//         {/* Draggable blue element */}
//         <div
//           ref={elementRefs.blue}
//           className="c_blue"
//           onMouseDown={(e) => handleMouseDown(e, 'blue')}
//           style={{
//             top: `${dragPositions.blue.y}px`,
//             left: `${dragPositions.blue.x}px`,
//             position: 'absolute',
//           }}
//         >
//           <input
//             className="m_blue"
//             type="text"
//             value={inputValues.blue}
//             onChange={(e) => handleInputChange(e, 'blue')}
//             placeholder="Blue Message"
//           />
//         </div>

//         {/* Draggable purple element */}
//         <div
//           ref={elementRefs.purple}
//           className="c_purple"
//           onMouseDown={(e) => handleMouseDown(e, 'purple')}
//           style={{
//             top: `${dragPositions.purple.y}px`,
//             left: `${dragPositions.purple.x}px`,
//             position: 'absolute',
//           }}
//         >
//           <input
//             className="m_purple"
//             type="text"
//             value={inputValues.purple}
//             onChange={(e) => handleInputChange(e, 'purple')}
//             placeholder="Purple Message"
//           />
//         </div>

//         {/* Draggable orange element */}
//         <div
//           ref={elementRefs.orange}
//           className="c_orange"
//           onMouseDown={(e) => handleMouseDown(e, 'orange')}
//           style={{
//             top: `${dragPositions.orange.y}px`,
//             left: `${dragPositions.orange.x}px`,
//             position: 'absolute',
//           }}
//         >
//           <input
//             className="m_orange"
//             type="text"
//             value={inputValues.orange}
//             onChange={(e) => handleInputChange(e, 'orange')}
//             placeholder="Orange Message"
//           />
//         </div>

//         {/* Static "Cut Here" Section */}
//         <div className="cutter" ref={cutRef}>
//           <h1 className="cut-here">Cut Here</h1>
//           <div className="cut-message">
//             <input type="text" value={cutMessage} placeholder="Display message" readOnly />
//           </div>
//         </div>
//       </div>

//       {/* Grid Section for random quote generator */}
//       <div className="grid-3">
//         <h1 className="quote">Random quote generator</h1>
//         <div className="generate-center">
//           <button className="generate" onClick={generateRandomQuote}>
//             Generate
//           </button>
//         </div>
//         <p className="display">
//           <input type="text" value={randomQuote} readOnly />
//         </p>
//       </div>
//     </main>
//   );
// }













































// import React, { useState, useRef } from 'react';
// import './play.css'; // Make sure your CSS is correctly linked

// export function Play() {
//   const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
//   const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);

//   const elementRef = useRef(null);
//   const inputRef = useRef(null); // Reference for the input element

//   // Handle when drag starts
//   const handleMouseDown = (e) => {
//     // Check if the mouse is over an input field, if so, don't start dragging
//     if (e.target.tagName === 'INPUT') return;

//     setIsDragging(true);
//     // Store the initial position when drag starts
//     setInitialPosition({
//       x: e.clientX - dragPosition.x,
//       y: e.clientY - dragPosition.y,
//     });
//   };

//   // Handle when mouse is moved
//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       setDragPosition({
//         x: e.clientX - initialPosition.x,
//         y: e.clientY - initialPosition.y,
//       });
//     }
//   };

//   // Handle when mouse is released
//   const handleMouseUp = () => {
//     setIsDragging(false);
//     // Reset to the initial position when dragging stops
//     setDragPosition(initialPosition);
//   };

//   return (
//     <main>
//       <div className="place-2">
//         {/* Draggable green element */}
//         <div
//           ref={elementRef}
//           className="c_green"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp} // Stop dragging when mouse leaves
//           style={{
//             top: `${dragPosition.y}px`,
//             left: `${dragPosition.x}px`,
//             position: 'absolute',
//           }}
//         >
//           <input className="m_green" ref={inputRef} type="text" placeholder="Green Message" />
//         </div>

//         {/* Draggable red element */}
//         <div
//           ref={elementRef}
//           className="c_red"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//           style={{
//             top: `${dragPosition.y}px`,
//             left: `${dragPosition.x}px`,
//             position: 'absolute',
//           }}
//         >
//           <input className="m_red" ref={inputRef} type="text" placeholder="Red Message" />
//         </div>

//         {/* Draggable blue element */}
//         <div
//           ref={elementRef}
//           className="c_blue"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//           style={{
//             top: `${dragPosition.y}px`,
//             left: `${dragPosition.x}px`,
//             position: 'absolute',
//           }}
//         >
//           <input className="m_blue" ref={inputRef} type="text" placeholder="Blue Message" />
//         </div>

//         {/* Draggable purple element */}
//         <div
//           ref={elementRef}
//           className="c_purple"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//           style={{
//             top: `${dragPosition.y}px`,
//             left: `${dragPosition.x}px`,
//             position: 'absolute',
//           }}
//         >
//           <input className="m_purple" ref={inputRef} type="text" placeholder="Purple Message" />
//         </div>

//         {/* Draggable orange element */}
//         <div
//           ref={elementRef}
//           className="c_orange"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//           style={{
//             top: `${dragPosition.y}px`,
//             left: `${dragPosition.x}px`,
//             position: 'absolute',
//           }}
//         >
//           <input className="m_orange" ref={inputRef} type="text" placeholder="Orange Message" />
//         </div>

//         {/* Static "Cut Here" Section */}
//         <div className="cutter">
//           <h1 className="cut-here">Cut Here</h1>
//           <div className="cut-message">
//             <input type="text" placeholder="Display message" />
//           </div>
//         </div>
//       </div>

//       {/* Grid Section for random quote generator */}
//       <div className="grid-3">
//         <h1 className="quote">Random quote generator</h1>
//         <div className="generate-center">
//           <button className="generate">Generate</button>
//         </div>
//         <p className="display">Display generated quote</p>
//       </div>
//     </main>
//   );
// }























































// import React, { useRef } from 'react';
// import './play.css';  // Make sure your CSS is linked properly

// export function Play() {
//   const draggableRefs = useRef({
//     green: null,
//     red: null,
//     blue: null,
//     purple: null,
//     orange: null
//   });

//   const originalPosition = useRef({
//     green: { x: 0, y: 0 },
//     red: { x: 0, y: 0 },
//     blue: { x: 0, y: 0 },
//     purple: { x: 0, y: 0 },
//     orange: { x: 0, y: 0 }
//   });

//   const isDragging = useRef({
//     green: false,
//     red: false,
//     blue: false,
//     purple: false,
//     orange: false
//   });

//   const startDrag = (e, color) => {
//     // Prevent default behavior
//     e.preventDefault();

//     const element = draggableRefs.current[color];
//     const rect = element.getBoundingClientRect();
//     originalPosition.current[color].x = e.clientX - rect.left;
//     originalPosition.current[color].y = e.clientY - rect.top;
//     isDragging.current[color] = true;
//     element.style.cursor = 'grabbing';
//   };

//   const onDrag = (e, color) => {
//     if (!isDragging.current[color]) return;

//     const element = draggableRefs.current[color];
//     element.style.position = 'absolute';
//     element.style.left = `${e.clientX - originalPosition.current[color].x}px`;
//     element.style.top = `${e.clientY - originalPosition.current[color].y}px`;
//   };

//   const stopDrag = (color) => {
//     isDragging.current[color] = false;
//     const element = draggableRefs.current[color];
//     element.style.cursor = 'grab';
//   };

//   return (
//     <main>
//       <div className="place-2">
//         <div
//           ref={(el) => (draggableRefs.current.green = el)}
//           onMouseDown={(e) => startDrag(e, 'green')}
//           onMouseMove={(e) => onDrag(e, 'green')}
//           onMouseUp={() => stopDrag('green')}
//           onMouseLeave={() => stopDrag('green')}
//           className="c_green"
//         >
//           <input className="m_green" type="Message_green" placeholder="" />
//         </div>

//         <div
//           ref={(el) => (draggableRefs.current.red = el)}
//           onMouseDown={(e) => startDrag(e, 'red')}
//           onMouseMove={(e) => onDrag(e, 'red')}
//           onMouseUp={() => stopDrag('red')}
//           onMouseLeave={() => stopDrag('red')}
//           className="c_red"
//         >
//           <input className="m_red" type="Message_red" placeholder="" />
//         </div>

//         <div
//           ref={(el) => (draggableRefs.current.blue = el)}
//           onMouseDown={(e) => startDrag(e, 'blue')}
//           onMouseMove={(e) => onDrag(e, 'blue')}
//           onMouseUp={() => stopDrag('blue')}
//           onMouseLeave={() => stopDrag('blue')}
//           className="c_blue"
//         >
//           <input className="m_blue" type="Message_blue" placeholder="" />
//         </div>

//         <div
//           ref={(el) => (draggableRefs.current.purple = el)}
//           onMouseDown={(e) => startDrag(e, 'purple')}
//           onMouseMove={(e) => onDrag(e, 'purple')}
//           onMouseUp={() => stopDrag('purple')}
//           onMouseLeave={() => stopDrag('purple')}
//           className="c_purple"
//         >
//           <input className="m_purple" type="Message_purple" placeholder="" />
//         </div>

//         <div
//           ref={(el) => (draggableRefs.current.orange = el)}
//           onMouseDown={(e) => startDrag(e, 'orange')}
//           onMouseMove={(e) => onDrag(e, 'orange')}
//           onMouseUp={() => stopDrag('orange')}
//           onMouseLeave={() => stopDrag('orange')}
//           className="c_orange"
//         >
//           <input className="m_orange" type="Message_orange" placeholder="" />
//         </div>

//         {/* Other content */}
//         <div className="cutter">
//           <h1 className="cut-here">Cut Here</h1>
//           <div className="cut-message">
//             <input type="cut-message" placeholder="Display message" />
//           </div>
//         </div>
//       </div>

//       {/* Quote Generator Section */}
//       <div className="grid-3">
//         <h1 className="quote">Random quote generator</h1>
//         <div className="generate-center">
//           <button className="generate">Generate</button>
//         </div>
//         <p className="display">display generated quote</p>
//       </div>
//     </main>
//   );
// }













































// import React from 'react';
// import { useDrag, useDrop } from 'react-dnd'; // Import hooks from react-dnd
// import { DndProvider } from 'react-dnd'; // Import DndProvider to wrap your component
// import { HTML5Backend } from 'react-dnd-html5-backend'; // Import HTML5Backend
// import './play.css';

// const ItemTypes = {
//   BOX: 'box',
// };

// const DraggableBox = ({ id, color }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: ItemTypes.BOX,
//     item: { id },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   }));

//   return (
//     <div
//       ref={drag}
//       className={`trans-${id}`}
//       style={{
//         backgroundColor: color,
//         opacity: isDragging ? 0.5 : 1,
//       }}
//     ></div>
//   );
// };

// const DropZone = ({ id, children, onDrop }) => {
//   const [, drop] = useDrop(() => ({
//     accept: ItemTypes.BOX,
//     drop: (item) => onDrop(item, id),
//   }));

//   return (
//     <div ref={drop} className={`drop-zone drop-zone-${id}`}>
//       {children}
//     </div>
//   );
// };

// export function Play() {
//   const handleDrop = (item, zoneId) => {
//     console.log(`Dropped box with id: ${item.id} into zone: ${zoneId}`);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <main>
//         <div className="place-2">
//           <div className="c_green">
//             <input className="m_green" type="Message_green" placeholder="" />
//           </div>

//           {/* Draggable Boxes */}
//           <DraggableBox id="1" color="green" />
//           <DraggableBox id="2" color="red" />
//           <DraggableBox id="3" color="blue" />
//           <DraggableBox id="4" color="purple" />
//           <DraggableBox id="5" color="orange" />

//           {/* Drop Zones */}
//           <DropZone id="1" onDrop={handleDrop}>
//             <div className="c_red">
//               <input className="m_red" type="Message_red" placeholder="" />
//             </div>
//           </DropZone>

//           <DropZone id="2" onDrop={handleDrop}>
//             <div className="c_blue">
//               <input className="m_blue" type="Message_blue" placeholder="" />
//             </div>
//           </DropZone>

//           <DropZone id="3" onDrop={handleDrop}>
//             <div className="c_purple">
//               <input className="m_purple" type="Message_purple" placeholder="" />
//             </div>
//           </DropZone>

//           <DropZone id="4" onDrop={handleDrop}>
//             <div className="c_orange">
//               <input className="m_orange" type="Message_orange" placeholder="" />
//             </div>
//           </DropZone>

//           <div className="cutter">
//             <h1 className="cut-here">Cut Here</h1>
//             <div className="cut-message">
//               <input type="cut-message" placeholder="Display message" />
//             </div>
//           </div>
//         </div>

//         <div className="grid-3">
//           <h1 className="quote">Random quote generator</h1>
//           <div className="generate-center">
//             <button className="generate">Generate</button>
//           </div>
//           <p className="display">display generated quote</p>
//         </div>
//       </main>
//     </DndProvider>
//   );
// }

























// import React from 'react';
// import "./play.css";


// export function Play() {
//   return (
//     <main>
//         <div className="place-2">
//             <div className="c_green">
//                 <input className="m_green" type="Message_green" placeholder="" />
//             </div>
//             <div className="trans-1"></div>
//             <div className="c_red">
//                 <input className="m_red" type="Message_red" placeholder="" />
//             </div>
//             <div className="trans-2"></div>
//             <div className="c_blue">
//                 <input className="m_blue" type="Message_blue" placeholder="" />
//             </div>
//             <div className="trans-3"></div>
//             <div className="c_purple">
//                 <input className="m_purple" type="Message_purple" placeholder="" />
//             </div>
//             <div className="trans-4"></div>
//             <div className="c_orange">
//                 <input className="m_orange" type="Message_orange" placeholder="" />
//             </div>
//             <div className="trans-5"></div>
//             <div className="cutter">
//                 <h1 className="cut-here">Cut Here</h1>
//                 <div className="cut-message">                
//                     <input  type="cut-message" placeholder="Display message" />
//                 </div>
//             </div>
//         </div>
//         <div className="grid-3">
//             <h1 className="quote">Random quote generator</h1>
//             <div className="generate-center">    
//                 <button className="generate">Generate</button>
//             </div>
//             <p className="display">display generated quote</p>
//         </div>
//     </main>

//   );
// }