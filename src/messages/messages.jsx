import React from 'react';
import "./messages.css";


export function Messages() {
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
                        <th>asdf asdfasdf asfd asdfk</th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th>Red</th>
                        <th>asdf asdfasdf asfd asdfk</th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th>Blue</th>
                        <th>asdf asdfasdf asfd asdfk</th>
                    </tr>
                    <tr>
                        <th>4</th>
                        <th>Purple</th>
                        <th>asdf asdfasdf asfd asdfk</th>
                    </tr>
                    <tr>
                        <th>5</th>
                        <th>Orange</th>
                        <th>asdf asdfasdf asfd asdfk</th>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <h1 className="most-messages">Most used messages</h1>
        </div>
        <div className="image">
            <img src="public/otterpop.jpg" alt="otter pops" />
        </div>
    </main>
  );
}