import * as React from 'react';
import moment from 'moment';

const DateNav = ({title, onPrev, onNext}) => {
   return (<h1>
        <button onClick={onPrev}>&lt;</button>
        {title}
        <button onClick={onNext}>&gt;</button>
    </h1>);
}

const DayOfWeek = () => {
    const daysOfWeek = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
    return (<thead>
    <tr>
        {daysOfWeek.map((day)=> <th key={day}>{day}</th>
        )}
    </tr></thead>)
}

const getWeek = (firstDayOfWeek) => {
    const week = [];
    let i = 0;
    while (i < 7) {
        week.push(firstDayOfWeek.clone().add(i, 'd'));
        i++;
    }
    
    return week;
}
const WeekRow = ({firstDayOfWeek}) => {
    const dayFormat = 'YYYY MM DD'
    const todayString = moment().format(dayFormat);
    const thisweek = getWeek(firstDayOfWeek);
    return (
        <tr>{thisweek.map((date)=>{
        return  <td key={date.toString()}>
                    {(date.format(dayFormat) === todayString) ? 
                        <b>{date.date()} &bull;</b> :
                        date.date() }
                </td>}
        )}</tr>
    );
}

const WeekView = ({whichMoment, setMoment}) => {
    const firstDayOfWeek = whichMoment.clone().day(1);
    
    const decreaseOne = () => {
        setMoment(moment(whichMoment.subtract(1, 'w')))
    }
    const increaseOne = () => {
        setMoment(moment(whichMoment.add(1, 'w')))
    }
    
    return (<>
        <DateNav title={firstDayOfWeek.format('MMMM YYYY')} onPrev={decreaseOne} onNext={increaseOne} />
        <table style={{width:'100%'}}>
            <DayOfWeek />
            
            <tbody>
                <WeekRow firstDayOfWeek={firstDayOfWeek} />
            </tbody>
        </table>
    </>);
}

const MonthView = ({whichMoment, setMoment}) => {
    const firstDay = whichMoment.clone().date(1);
    const firstDayOfWeek = firstDay.clone().day(1);
    
    const decreaseOne = () => {
        setMoment(moment(whichMoment.subtract(1, 'months')))
    }
    const increaseOne = () => {
        setMoment(moment(whichMoment.add(1, 'months')))
    }
    
    return (<>
        <DateNav title={firstDay.format('MMMM YYYY')} onPrev={decreaseOne} onNext={increaseOne} />
        <table style={{width:'100%'}}>
            <DayOfWeek />
            
            <tbody>
                <WeekRow firstDayOfWeek={firstDayOfWeek} />
                <WeekRow firstDayOfWeek={firstDayOfWeek.clone().add(1,'w')} />
                <WeekRow firstDayOfWeek={firstDayOfWeek.clone().add(2,'w')} />
                <WeekRow firstDayOfWeek={firstDayOfWeek.clone().add(3,'w')} />
                <WeekRow firstDayOfWeek={firstDayOfWeek.clone().add(4,'w')} />
            </tbody>
        </table>
    </>);
}

const Board = ({viewMode}) => {
    const [currentMoment, setCurrentMoment] = React.useState(moment());
    if (viewMode==='week')
        return <WeekView whichMoment={currentMoment} setMoment={setCurrentMoment} />;
    return <MonthView whichMoment={currentMoment} setMoment={setCurrentMoment} />
}

export default Board;