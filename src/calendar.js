import * as React from 'react';
import moment from 'moment';
import Board from './comp/Board';
import SideMenu from './comp/SideMenu';


const Calendar = () => {
    const [viewMode, setViewMode] = React.useState('week');
    return ( <>
        <SideMenu selectedMode={viewMode} onChangeViewMode={setViewMode} />
        <Board viewMode={viewMode}/>
    </> )
}

export default Calendar;