
import React from 'react';
import './messages.css';

export function Messages({ messages }) {
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
                  onChange={(e) => {}}
                  readOnly
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
                  onChange={(e) => {}}
                  readOnly
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
                  onChange={(e) => {}}
                  readOnly
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
                  onChange={(e) => {}}
                  readOnly
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
                  onChange={(e) => {}}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
