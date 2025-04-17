import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

const UIShowcase = () => {
  const [isFlip, setIsFlip] = useState(false);

  const HandleFlip = () => {
    setIsFlip(!isFlip);
  }

  return (
    <div className="ui-showcase">
      <h2>UI Components Reference</h2>

      <section>
        <h3>Buttons</h3>
        <div className="btn-row">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Outlined Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </section>

      <section>
        <h3>Input</h3>
        <Input label="Question" type="text"/>
      </section>

      <section>
        <h3>Flashcard</h3>
        <div class="grid-container">
          <div class="grid-col-3">            
            <div className={`flashcard ${isFlip ? 'flip' : ''}`}> 
              <div className="front">
                What is React?
                <Button variant="primary" onClick={HandleFlip}>Flip</Button>
              </div>
              <div className="back">
                A JavaScript library for building UIs.
                <Button variant="primary" onClick={HandleFlip}>Flip</Button>
              </div>
            </div>
          </div>
          <div class="grid-col-3">            
            <div className='flashcard'> 
              <div className="front">
                What is React?
              </div>
              <div className="back">
                A JavaScript library for building UIs.
              </div>
            </div>
          </div>
          <div class="grid-col-3">            
            <div className='flashcard'> 
              <div className="front">
                What is React?
              </div>
              <div className="back">
                A JavaScript library for building UIs.
              </div>
            </div>
          </div>
          <div class="grid-col-3">            
            <div className='flashcard'> 
              <div className="front">
                What is React?
              </div>
              <div className="back">
                A JavaScript library for building UIs.
              </div>
            </div>
          </div>
      </div>
      </section>

      <section>
        <h3>Deck Card</h3>
        <div className="deck-card">
          <h3>Frontend Basics</h3>
          <p>HTML, CSS, and JavaScript fundamentals.</p>
        </div>
      </section>
    </div>
  );
};

export default UIShowcase;
