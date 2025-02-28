import React, { useState, useEffect } from 'react';
import "./messages.css";

export function Messages({ cutMessage }) {
  // Local state to manage the input fields
  const [messages, setMessages] = useState({
    green: '',
    red: '',
    blue: '',
    purple: '',
    orange: '',
  });

  useEffect(() => {
    // Update all messages with the cutMessage when it changes
    setMessages({
      green: cutMessage,
      red: cutMessage,
      blue: cutMessage,
      purple: cutMessage,
      orange: cutMessage,
    });
  }, [cutMessage]);

  return (
    <main>
      <div>
        <h1 className="old-messages">Old Messages</h1>
      </div>
      <div>
        <table className="colorful-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Color</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>Green</th>
              <td>
                <input
                  type="text"
                  value={messages.green}
                  onChange={(e) => setMessages({ ...messages, green: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <th>2</th>
              <th>Red</th>
              <td>
                <input
                  type="text"
                  value={messages.red}
                  onChange={(e) => setMessages({ ...messages, red: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <th>3</th>
              <th>Blue</th>
              <td>
                <input
                  type="text"
                  value={messages.blue}
                  onChange={(e) => setMessages({ ...messages, blue: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <th>4</th>
              <th>Purple</th>
              <td>
                <input
                  type="text"
                  value={messages.purple}
                  onChange={(e) => setMessages({ ...messages, purple: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <th>5</th>
              <th>Orange</th>
              <td>
                <input
                  type="text"
                  value={messages.orange}
                  onChange={(e) => setMessages({ ...messages, orange: e.target.value })}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="most-messages">Most Used Messages</h1>
      </div>
      <div className="image">
        <img src="/otterpop.jpg" alt="otter pops" />
      </div>
    </main>
  );
}


































// import React from 'react';
// import "./messages.css";


// export function Messages() {
//   return (
//     <main>
//         <div>
//             <h1 className="old-messages">Old Messages</h1>
//         </div>
//         <div>
//             <table className="colorful-table">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Color</th>
//                         <th>Message</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <th>1</th>
//                         <th>Green</th>
//                         <input type="text" />
//                     </tr>
//                     <tr>
//                         <th>2</th>
//                         <th>Red</th>
//                         <input type="text" />
//                     </tr>
//                     <tr>
//                         <th>3</th>
//                         <th>Blue</th>
//                         <input type="text" />
//                     </tr>
//                     <tr>
//                         <th>4</th>
//                         <th>Purple</th>
//                         <input type="text" />
//                     </tr>
//                     <tr>
//                         <th>5</th>
//                         <th>Orange</th>
//                         <input type="text" />
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//         <div>
//             <h1 className="most-messages">Most used messages</h1>
//         </div>
//         <div className="image">
//             <img src="public/otterpop.jpg" alt="otter pops" />
//         </div>
//     </main>
//   );
// }