import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

// import { appointments } from '../../demo-data/month-appointments';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = theme => ({
  root: {
    '& .MuiTextField-root ': {
      margin: theme.spacing(1),
      marginBottom: 12,

    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {
        width:'100%',
        justify:"center",
      },
      [theme.breakpoints.up('lg')]: {
        width: 305,
        display:'Center',

    },

    },
  },
  title: {
    fontSize: 18,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1,0),
  },



});




class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    //   data: appointments,
      currentViewName: 'work-week',
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
  }

  render() {
    const {classes}=this.props;
    const { data, currentViewName } = this.state;

    return (
      <Paper>
           <Card className={classes.root} variant="outlined">
            <CardContent >
              <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
              <Scheduler 
                data={data}
                height={660}
              >
          <ViewState
            defaultCurrentDate={Date.now()}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
          />

          <WeekView
            startDayHour={10}
            endDayHour={19}
          />
          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
          />
          <MonthView />
          <DayView />
          <Toolbar />
          <ViewSwitcher />
          <Appointments />
        </Scheduler>

</Typography>
     
</CardContent>
</Card>
      </Paper>
    );
  }
}

export default  withStyles(useStyles)(Calendar);