import { useState, useEffect, useCallback } from 'react';
import SnakeBody from './SnakeBody';
import Food from './Food';
import './snake.css';

const Snake = () => {
  const [lastScore, setLastScore] = useState(null);

  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState([]);
  const [speed, setSpeed] = useState(200);

  const moveSnake = useCallback(() => {
    const dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      default:
        break;
    }

    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  }, [snakeDots, direction]);

  const getRandomPositionForFood = useCallback(() => {
    let min = 0;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
  }, []);

  const enlargeSnake = useCallback(() => {
    const newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  }, [snakeDots]);

  const increaseSpeed = useCallback(() => {
    if (speed > 10) {
      setSpeed(speed - 10);
    }
  }, [speed]);

  const checkFoodCollision = useCallback(() => {
    const head = snakeDots[snakeDots.length - 1];

    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomPositionForFood());
      enlargeSnake();
      increaseSpeed();
    }
  }, [snakeDots, food, getRandomPositionForFood, enlargeSnake, increaseSpeed]);

  const gameOver = useCallback(() => {
    setLastScore(snakeDots.length);
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
    setDirection('RIGHT');
    setFood(getRandomPositionForFood());
    setSpeed(200);
  }, [getRandomPositionForFood, snakeDots.length]);

  const checkCollision = useCallback(() => {
    const head = snakeDots[snakeDots.length - 1];
    const body = snakeDots.slice(0, -1);

    if (body.some((dot) => dot[0] === head[0] && dot[1] === head[1])) {
      gameOver();
    }
  }, [snakeDots, gameOver]);

  const checkBorderCollision = useCallback(() => {
    const head = snakeDots[snakeDots.length - 1];

    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      gameOver();
    }
  }, [snakeDots, gameOver]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
      checkBorderCollision();
      checkCollision();
      checkFoodCollision();
    }, speed);
    return () => clearInterval(interval);
  }, [moveSnake, checkBorderCollision, checkCollision, checkFoodCollision, speed]);

  const onKeyDown = useCallback((e) => {
    e = e || window.event;

    switch (e.keyCode) {
      case 38:
        setDirection('UP');
        break;
      case 40:
        setDirection('DOWN');
        break;
      case 37:
        setDirection('LEFT');
        break;
      case 39:
        setDirection('RIGHT');
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-between text-lg font-bold text-center text-gray-500'>
          <span>{`Score: ${snakeDots.length - 2}`}</span>
          {lastScore && <span>{`Last Score: ${lastScore - 2}`}</span>}
        </div>

        <div className='game-area'>
          <SnakeBody snakeDots={snakeDots} />
          <Food dot={food} />
        </div>
      </div>
    </>
  );
};

export default Snake;
