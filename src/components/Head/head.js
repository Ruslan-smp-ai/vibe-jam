import './head.css';
import logo from '../../svg/logo.svg'
const Head = (props) => {
    const { children } = props;
    return (
        <div className={'head'}>
            <img src={logo} className="logo"/>
            {children}
        </div>
    )
};
export default Head;