import React from 'react';
import StatusBox from '../components/StatusBox';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from '../config';



const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboards: {
        compainesRegistered :'',
        userRegisterd:'',
        companyusersOnline:'',
        usersOnline:'',
        compainesVerified:'',
        compainesUnVerified:'',
        usersVerfified:'',
        usersUnVerfified:''
      }
    }
  }
  componentDidMount() {
    fetch(SERVER_URL+'/admindashboard')
    .then(r => r.json())
    .then(json => this.setState({dashboards:{
    compainesRegistered :json.compainesRegistered,
        userRegisterd:json.userRegisterd,
        companyusersOnline:json.companyusersOnline,
        usersOnline:json.usersOnline,
        compainesVerified:json.compainesVerified,
        compainesUnVerified:json.compainesUnVerified,
        usersVerfified:json.usersVerfified,
        usersUnVerfified:json.usersUnVerfified} }))
    .catch(error => console.error('Error retrieving Companies: ' + error));
  }

  render(){
    const { classes } = this.props;

    return (<div className={classes.root}>
      <Grid container spacing={3}>
<StatusBox name="Companies Registered" count={this.state.dashboards.compainesRegistered}/>
<StatusBox  name="Users Regsitered" count={this.state.dashboards.userRegisterd}/>
<StatusBox  name="Companies Online" count={this.state.dashboards.companyusersOnline}/>
<StatusBox  name="Users Online" count={this.state.dashboards.usersOnline}/>
<StatusBox  name="Companies Verified" count={this.state.dashboards.compainesVerified}/>
<StatusBox  name="Companies UnVerified" count={this.state.dashboards.compainesUnVerified}/>
<StatusBox  name="Users Verified" count={this.state.dashboards.usersVerfified}/>
<StatusBox  name="Users UnVerified" count={this.state.dashboards.usersUnVerfified}/>
</Grid>
</div>)}}

export default  withStyles(useStyles)(Dashboard);
