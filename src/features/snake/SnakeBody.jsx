import './snake.css';

const SnakeBody = ({ snakeDots }) => {
  return (
    <>
      {snakeDots.map((dot, i) => (
        <div className='snake-dot' key={i} style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }} />
      ))}
    </>
  );
};

export default SnakeBody;
