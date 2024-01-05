import './style.css';

interface IButtonProps {
  title: string;
  onClick: () => void;
}
function Button({ title, onClick }: IButtonProps) {
  return (
    <button className="btn" onClick={() => onClick()}>
      {title}
    </button>
  );
}

export default Button;
