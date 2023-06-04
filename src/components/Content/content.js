import './content.css';
const Content = (props) => {
    const { children, isPlayerActive, isOrderActive } = props;
    const contentClassName = `content ${isPlayerActive ? 'player-is-active' : ''} ${isOrderActive ? 'order-is-active' : ''}`;
  
    return (
      <div className={contentClassName}>{children}</div>
    );
  };
export default Content;