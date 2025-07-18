import React, { useState } from 'react';

const SimpleMathFun = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [inputAnswer, setInputAnswer] = useState('');
  const [problem, setProblem] = useState(generateProblem());
  const [feedback, setFeedback] = useState('');
  const [hint, setHint] = useState('');
  const [showNext, setShowNext] = useState(false);

  const totalLevels = 5;
  const progressPercent = (level / totalLevels) * 100;

  function generateProblem() {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const operator = Math.random() < 0.5 ? '+' : '-';

    let question, answer, left, right;

    if (operator === '+') {
      left = a;
      right = b;
      question = `${left} + ${right}`;
      answer = left + right;
    } else {
      left = Math.max(a, b);
      right = Math.min(a, b);
      question = `${left} - ${right}`;
      answer = left - right;
    }

    return { question, answer, a: left, b: right, operator };
  }

  const handleCheckAnswer = () => {
    if (parseInt(inputAnswer) === problem.answer) {
      setFeedback('✅ Correct!');
      setScore(score + 1);
      setShowNext(true);
    } else {
      setFeedback('❌ Try again!');
      setShowNext(false);
    }
  };

  const handleNextQuestion = () => {
    if (level < totalLevels) {
      setLevel(level + 1);
      setProblem(generateProblem());
      setInputAnswer('');
      setFeedback('');
      setHint('');
      setShowNext(false);
    } else {
      alert('🎉 You completed all levels!');
      setLevel(1);
      setScore(0);
      setProblem(generateProblem());
      setInputAnswer('');
      setFeedback('');
      setHint('');
      setShowNext(false);
    }
  };

  const handleHint = () => {
    const hintText =
      problem.operator === '+'
        ? `Hint: Try counting all ${problem.a} red and ${problem.b} green apples together. 🍎🍏`
        : `Hint: Start with ${problem.a} apples and take away ${problem.b}. 🍎➖🍏`;
    setHint(hintText);
  };

  const renderApples = (count, color) =>
    Array.from({ length: count }).map((_, idx) => (
      <span key={idx} style={{ fontSize: '40px' }}>
        {color === 'red' ? '🍎' : '🍏'}
      </span>
    ));

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #89f7fe, #66a6ff)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '100px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '650px',
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        padding: '30px',
        textAlign: 'center'
      }}>
        {/* Progress Bar */}
        <div style={{
          height: '10px',
          width: '100%',
          backgroundColor: '#e0e0e0',
          borderRadius: '5px',
          marginBottom: '20px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: '#4CAF50',
            transition: 'width 0.5s ease-in-out'
          }} />
        </div>

        {/* Title */}
        <h2 style={{ color: '#4CAF50', fontSize: '32px', marginBottom: '10px' }}>
          Simple Math Fun
        </h2>

        {/* Emoji */}
        <div style={{ fontSize: '40px', marginBottom: '20px' }}>😊</div>

        {/* Problem */}
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>
          Solve the problem:
        </div>

        <div style={{ fontSize: '30px', marginBottom: '20px' }}>
          {renderApples(problem.a, 'red')}
          <span style={{ margin: '0 10px' }}>{problem.operator}</span>
          {renderApples(problem.b, 'green')}
        </div>

        {/* Input */}
        <input
          type="text"
          value={inputAnswer}
          onChange={(e) => setInputAnswer(e.target.value)}
          placeholder="Your answer"
          style={{
            padding: '10px',
            fontSize: '18px',
            width: '150px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '10px'
          }}
        />
        <br />

        {/* Buttons */}
        {!showNext && (
          <button
            onClick={handleCheckAnswer}
            style={{
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              fontSize: '18px',
              borderRadius: '8px',
              cursor: 'pointer',
              margin: '10px 10px 10px 0'
            }}
          >
            Check
          </button>
        )}

        <button
          onClick={handleHint}
          style={{
            backgroundColor: '#FFC107',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            fontSize: '18px',
            borderRadius: '8px',
            cursor: 'pointer',
            margin: '10px 0'
          }}
        >
          Hint 💡
        </button>

        {/* Feedback and Hint */}
        {feedback && (
          <div style={{ fontSize: '20px', marginTop: '10px' }}>{feedback}</div>
        )}
        {hint && (
          <div style={{ fontSize: '18px', color: '#555', marginTop: '10px' }}>{hint}</div>
        )}

        {/* Next Question */}
        {showNext && (
          <button
            onClick={handleNextQuestion}
            style={{
              backgroundColor: '#2196F3',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              fontSize: '18px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Next Question ➡️
          </button>
        )}

        {/* Level and Score */}
        <div style={{ marginTop: '30px', fontSize: '20px' }}>
          <div><strong>Level:</strong> {level}</div>
          <div><strong>Score:</strong> {score} ⭐</div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMathFun;
