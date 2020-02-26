import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button ,ButtonGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import {SERVER_URL} from '../../config';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Barcode from 'react-barcode';

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


class CreateProduct extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      // description:[],
      name :[],
      nameValue:'',
      barcode:'',
      quantity: 0,
      quantityType:[],
      quantityTypeValue: '',
      price: 0,
      createdBy:1,
      address:[],
      addressValue:'',
      numberValue:0,
      lot:[],
      lotValue:'',
      
    }
  }
  componentDidMount() {
    fetch(SERVER_URL+'/quantityType')
    .then(r => r.json())
    .then(json => this.setState({quantityType: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));
    

    fetch(SERVER_URL+'/productName')
    .then(r => r.json())
    .then(json => this.setState({name: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));


    fetch(SERVER_URL+'/lot')
    .then(r => r.json())
    .then(json => this.setState({lot: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));


    fetch(SERVER_URL+'/address')
    .then(r => r.json())
    .then(json => this.setState({address: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

  
  }

  handleChangename=(event)=>{
    this.setState({nameValue:event.target.value});
  }

  handleChangeNumberValue=(event)=>{
    this.setState({numberValue:event.target.value});
  }
  
  handleChangebarcode=(event)=>{
    this.setState({barcode:event.target.value});

  }

  handleChangequantity=(event)=>{
    this.setState({quantity:event.target.value});


  }
  handleChangequantityValue=(event)=>{
    this.setState({quantityTypeValue:event.target.value});


  }
  handleChangeprice=(event)=>{
    this.setState({price:event.target.value});

  }
  handleChangeaddress=(event)=>{
    this.setState({addressValue:event.target.value});

  }

  handleChangelot=(event)=>{
    this.setState({lotValue:event.target.value});

  }


  handleSubmit=(event)=>{
    event.preventDefault() 
    let product={
     name:this.state.nameValue,
     barcode:this.state.barcode,
     quantity:this.state.quantity,
     quantityType:this.state.quantitytypeValue,
     price:this.state.price,
     createBy:1,
     number:this.state.numberValue,
     lot:this.state.lotValue

    }
    fetch(SERVER_URL+'/inventory', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }).then(r=> r.json()).then(json=>{let updatedValue = this.state.updatedValue;
      updatedValue = "Product "+json.id+" is Added Successfully";
      this.setState({updatedValue})
    })
    };

  render() {
    const { classes} = this.props;
   
    let Total=0;
    Total=parseFloat(this.state.price)*parseFloat(this.state.numberValue)
    
 
  return (

    <div  component="main" className={classes.root}  >
    <div  className={classes.root}  >
     <ButtonGroup fullWidth aria-label="full width outlined button group">
     <Button className={classes.content} href="/admin/product/list">List Product</Button>
     <Button className={classes.content} href="/admin/product/create">Create Product</Button>
   </ButtonGroup>
     </div>
<Grid item  sm={12} md={6} className={classes.content} >


<div>

   <Card className={classes.root} variant="outlined">
       <CardContent >
           <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
               Create Product Profile
           </Typography>

           <form  onSubmit={this.handleSubmit} >
               <Grid item >
   
               <TextField
                        id="demo-simple-select-outlined-label"
                        select 
                        label="Product Name"
                        value={this.state.nameValue}
                        onChange={this.handleChangename}
                        variant="outlined"
                        >
                            {this.state.name.map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
             <TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Price"
          style={{ margin: 8 }}
          placeholder="Price"
          fullWidth
          margin="normal"
          onChange={this.handleChangeprice}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
             
             <TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Number of Items"
          style={{ margin: 8 }}
          placeholder="Number of Items"
          fullWidth
          margin="normal"
          onChange={this.handleChangeNumberValue}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
            
             <TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Barcode"
          style={{ margin: 8 }}
          placeholder="Barcode"
          fullWidth
          margin="normal"
          onChange={this.handleChangebarcode}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
          <Barcode value={this.state.barcode} />,

             
     
             <TextField
                        id="demo-simple-select-outlined-label"
                        select 
                        label="Lot"
                        value={this.state.lotValue}
                        onChange={this.handleChangelot}
                        variant="outlined"
                        >
                            {this.state.lot.map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option.lotname}
                                </MenuItem>
                            ))}
                        </TextField>
    

            
             <TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Quantity"
          style={{ margin: 8 }}
          placeholder="Quantity"
          fullWidth
          margin="normal"
          onChange={this.handleChangequantity}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
             
  
             <TextField
                        id="demo-simple-select-outlined-label"
                        select 
                        label="Quantity Type"
                        value={this.state.quantityTypeValue}
                        onChange={this.handleChangequantityValue}
                        variant="outlined"
                        >
                            {this.state.quantityType.map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
      <CardActions>

<Button type="Submit" variant="contained" size="small" color="primary">
    Save
</Button>

<div className={classes.root}>
    {this.state.updatedValue}
    {/* <Alert severity="success" color="info">
    {this.state.updatedValue}
    </Alert> */}
</div>

</CardActions>
</Grid>

</form>

</CardContent>
</Card>

</div>

</Grid>
<Grid item  sm={12} md={6} square>
<Grid item  sm={12} component={Paper} square>



</Grid>
<Grid item  sm={12} component={Paper} square>

</Grid>
</Grid>
</div>
);
}}        

export default  withStyles(useStyles)(CreateProduct);