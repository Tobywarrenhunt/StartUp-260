import React from 'react';
import "./play.css";


export function Play() {
  return (
    <main>
        <div className="place-2">
            <div className="c_green">
                <input className="m_green" type="Message_green" placeholder="" />
            </div>
            <div className="trans-1"></div>
            <div className="c_red">
                <input className="m_red" type="Message_red" placeholder="" />
            </div>
            <div className="trans-2"></div>
            <div className="c_blue">
                <input className="m_blue" type="Message_blue" placeholder="" />
            </div>
            <div className="trans-3"></div>
            <div className="c_purple">
                <input className="m_purple" type="Message_purple" placeholder="" />
            </div>
            <div className="trans-4"></div>
            <div className="c_orange">
                <input className="m_orange" type="Message_orange" placeholder="" />
            </div>
            <div className="trans-5"></div>
            <div className="cutter">
                <h1 className="cut-here">Cut Here</h1>
                <div className="cut-message">                
                    <input  type="cut-message" placeholder="Display message" />
                </div>
            </div>
        </div>
        <div className="grid-3">
            <h1 className="quote">Random quote generator</h1>
            <div className="generate-center">    
                <button className="generate">Generate</button>
            </div>
            <p className="display">display generated quote</p>
        </div>
    </main>

  );
}