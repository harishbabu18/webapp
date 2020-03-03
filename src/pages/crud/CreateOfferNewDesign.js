import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { containedTabsStylesHook } from '@mui-treasury/styles/tabs';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import ModeComment from '@material-ui/icons/ModeComment';
import Favorite from '@material-ui/icons/Favorite';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';
import { useLabelIconStyles } from '@mui-treasury/styles/icon/label';
import { useRowFlexStyles } from '@mui-treasury/styles/flex/row';
import CardHeader from '@material-ui/core/CardHeader';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import { useFirebaseBtnStyles } from '@mui-treasury/styles/button/firebase';
// import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };


function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
  }


const useStyles = makeStyles( ({ spacing, palette })=> ({
    card: {
      display: 'contain',
      padding: spacing(2),
      borderRadius: 16,
    },
    media: {
      minWidth: '25%',
      maxWidth: '25%',
      flexShrink: 0,
      backgroundColor: palette.grey[200],
      borderRadius: 12,
      boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
    },
    rating: {
      verticalAlign: 'text-top',
    },
    content: {
      padding: spacing(0, 2, 0, 0),
    },
    heading: {
      fontSize: 17,
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      marginBottom: 0,
      marginRight: spacing(1.5),
      display: 'inline-block',
    },
    body: {
      fontSize: 14,
      color: palette.grey[500],
    },
    divider: {
      margin: spacing(1, 0),
    },
    textFooter: {
      fontSize: 14,
    },
    icon: {
      fontSize: '1.2rem',
      verticalAlign: 'bottom',
    },
    avatar: {
        backgroundColor: palette.primary.main,
      },
      action: {
        marginLeft: 8,
      },
     
  }));

  const style = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root ': {
          margin: theme.spacing(1),
          marginBottom: 12,
    
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width:'80%',
          },
          [theme.breakpoints.up('lg')]: {
            width: 280,
    
        },
    
        }
      },
    
    
      title: {
        fontSize: 18,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(1,0),
      },
      Button: {
        width: '100%',
      }
  }));



const ContainedTabs = () => {
  const tabsStyles = containedTabsStylesHook.useTabs();
  const tabItemStyles = containedTabsStylesHook.useTabItem();

  const styles = useStyles();
  const classes = style();
  const gutterStyles = usePushingGutterStyles({ space: 1.5 });
  const labelStyles = useLabelIconStyles({ linked: true });
  const flexStyles = useRowFlexStyles();

  const Buttonstyles = useFirebaseBtnStyles();
  // const gutterStyles = usePushingGutterStyles();

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
        <div>

<Card className={styles.card} elevation={0}>

    <form >

    <CardHeader
      classes={{
        action: styles.action,
      }}
    
      title={
        <Tabs
        classes={tabsStyles}
        value={value} onChange={handleChange} 
        aria-label="wrapped label tabs example"
      >
        <Tab classes={tabItemStyles} value="one" label={'Create Offer'}  {...a11yProps('one')} />
        <Tab classes={tabItemStyles} value="two" label={'Service'} {...a11yProps('two')}/>
        <Tab classes={tabItemStyles} value="three" label={'Facility'} {...a11yProps('three')}/>
        <Tab classes={tabItemStyles} value="four" label={'Product'} {...a11yProps('four')}/>
        <Tab classes={tabItemStyles} value="five" label={' Payment '} {...a11yProps('five')}/>

      </Tabs>
      }
    />

<CardContent className={styles.content}>
<div className={classes.root}>

    <TabPanel  value={value} index="one">


 
    <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
    Create Offer
   </Typography>

                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Company"
                            // value={this.state.companyValue}
                            // onChange={this.handleChangeCompanyValue.bind(this)}
                            variant="outlined"
                          >
                            {['Qualifica','Teraret'].map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Ticket"
                            // value={this.state.ticketValue}
                            // onChange={this.handleChangeTicketValue.bind(this)}
                            variant="outlined"
                        >
                            {['ticket1','ticket2'].map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            id="Created Date"
                            label="Created On"
                            type="date"
                            defaultValue=""
                            // onChange={this.handleChangeDateValue}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />

                        <TextField
                            id="Deadline"
                            label="Deadline "
                            type="date"
                            defaultValue=""
                            // onChange={this.handeChangeDeadlineValue}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />

                       
                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Duration"
                            // value={this.state.durationValue}
                            // onChange={this.handleChangeDurationValue.bind(this)}
                            variant="outlined"
                        >
                            {['1 Year','2 Year', '3 Year', '5 Year'].map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        
                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Reference"
                            // value={this.state.referenceValue}
                            // onChange={this.handleChangeReferenceValue.bind(this)}
                            variant="outlined"
                        >
                            {['Yaro','Neenu'].map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            id="outlined-uncontrolled"
                            label="Reference Commission"
                            type="number"
                            margin="normal"
                            // onChange={this.handleChangeCommissionReferenceValue}
                        
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-uncontrolled"
                            label="General Information"
                            margin="normal"
                            // onChange={this.handleChangeGeneralInformationValue}
                            variant="outlined"
                        />

            </TabPanel>
            </div>



            <div className={classes.root}>

    <TabPanel  value={value} index="two">


    <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                    Service
                </Typography>

                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Service"
                            // value={this.state.serviceValue}
                            // onChange={this.handleChangeServiceValue.bind(this)}
                            variant="outlined"
                          >
                              {['DD45','KX67','GXC454'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>

                          <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Place"
                            // value={this.state.placeValue}
                            // onChange={this.handleChangePlaceValue.bind(this)}
                            variant="outlined"
                          >
                              {['Bengaluru', 'Mangaluru', 'Tumkuru', 'Mandya'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>

                          <TextField
                          id="outlined-uncontrolled"
                          label="Number Of Intervention"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeInterventionValue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Cost Of Service"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />
            </TabPanel>
            </div>


            <div className={classes.root}>

    <TabPanel  value={value} index="three">


  
    <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                    Facility
                </Typography>

                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Crew"
                            // value={this.state.serviceValue}
                            // onChange={this.handleChangeServiceValue.bind(this)}
                            variant="outlined"
                          >
                              {['DD45','KX67','GXC454'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>


                          <TextField
                          id="outlined-uncontrolled"
                          label="Typology"
                          margin="normal"
                        //   onChange={this.handleChangeInterventionValue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Quantity"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />
            </TabPanel>
            </div>


            <div className={classes.root}>

    <TabPanel  value={value} index="four">


    <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                    Product
                </Typography>

                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Product"
                            // value={this.state.serviceValue}
                            // onChange={this.handleChangeServiceValue.bind(this)}
                            variant="outlined"
                          >
                              {['DD45','KX67','GXC454'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>

                          

                          <TextField
                          id="outlined-uncontrolled"
                          label="Quantity "
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeInterventionValue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Cost "
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />
            </TabPanel>
            </div>



            <div className={classes.root}>

    <TabPanel  value={value} index="five">


  
  <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                    Payment
                </Typography>


                          <TextField
                          id="outlined-uncontrolled"
                          label="Payment Method"
                          margin="normal"
                        //   onChange={this.handleChangeInterventionValue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Taxable"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Discount"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />
                          <TextField
                          id="outlined-uncontrolled"
                          label="IVA"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />

                          <TextField
                          id="outlined-uncontrolled"
                          label="total"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />
            </TabPanel>
            </div>

  <Divider className={styles.divider} light />
          <div className={gutterStyles.parent}>

      <Button classes={Buttonstyles} variant={'contained'} color={'primary'}>
        Save
      </Button>
      </div>
    


</CardContent>
</form>

</Card>

</div>

  );
};

export default ContainedTabs;