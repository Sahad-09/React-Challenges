import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [clickSequence, setClickSequence] = useState([]);
  const [greenClicks, setGreenClicks] = useState(0);
  const [boxColors, setBoxColors] = useState(Array(9).fill('white'));

  const handleBoxClick = (index) => {
    const newBoxColors = [...boxColors];
    setClickSequence([...clickSequence, index]);

    if (newBoxColors[index] === 'white') {
      newBoxColors[index] = 'green';
      setGreenClicks(greenClicks + 1);
    }

    setBoxColors(newBoxColors);
  };

  useEffect(() => {
    if (greenClicks === 9) {
      const Sequence = [...clickSequence];
      let currentIndex = 0;

      const intervalId = setInterval(() => {
        const newBoxColors = [...boxColors];
        newBoxColors[Sequence[currentIndex]] = 'orange';
        setBoxColors(newBoxColors);

        currentIndex++;

        if (currentIndex === 9) {
          clearInterval(intervalId);
        }
      }, 1000);

      setGreenClicks(0);
      setClickSequence([]);
    }
  }, [greenClicks, clickSequence, boxColors]);

  return (
    <div>
      <div className="matrix">
        {boxColors.map((color, index) => (
          <div
            key={index}
            className="box"
            style={{ backgroundColor: color }}
            onClick={() => handleBoxClick(index)}
          >
            {index}
          </div>
        ))}
      </div>
      <p>Click Sequence: {clickSequence.join(', ')}</p>
    </div>
  );
}

export default App;
