import './icons.css';
import download from '../../svg/download.svg'
import login from '../../svg/login.svg'
const Icons = (props) => {
    const { children } = props;
    return (
        <div className={'icons'}>
            <img src={download}/>
            <img src={login}/>
        </div>
    )
};
export default Icons;