import './music-time.css';
const MusicTime = (props) => {
    const { time, isOrder } = props;
    const timeClassName = isOrder ? 'music-time order' : 'music-time';
    return (
        <p className={timeClassName}>{time}</p>
    )
};
export default MusicTime;