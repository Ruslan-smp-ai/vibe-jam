import './container.css';
const Container = (props) => {
    const { children, onContextMenu } = props;
    return (
        <div className={'container'} onContextMenu={onContextMenu}>{children}</div>
    )
};
export default Container;