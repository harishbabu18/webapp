import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button ,ButtonGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {SERVER_URL} from '../../config';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Barcode from 'react-barcode';

const useStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding:theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: 240,
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
    this.setState({quantitytypeValue:event.target.value});


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
    function renderNameRow(name) {
      return (<MenuItem value={name.id}>{name.name}</MenuItem>);
    }
    
    function renderQuantityTypeRow(quantitytype) {
      return (<MenuItem value={quantitytype.id}>{quantitytype.name}</MenuItem>);
    }
    function renderAddressRow(address) {
        return (<MenuItem value={address.id}>{address.addresslineone}</MenuItem>);
      }


      function renderLotRow(lot) {
        return (<MenuItem value={lot.id} name={lot.lotname}>{lot.lotname}</MenuItem>);
      }
 
  return (
    <Grid container component="main" className={classes.root}>
         <Grid item  sm={12}component={Paper} elevation={6} square>
      <Paper square>
          <ButtonGroup fullWidth aria-label="full width outlined button group">
          <Button href="/admin/product/list">List Product</Button>
          <Button href="/admin/product/lot">Create Product</Button>
        </ButtonGroup>
          </Paper>
          </Grid>
    <Grid item  sm={12} md={6} component={Paper} elevation={6} square>
    <div>
        <div  className={classes.container}>
          <form onSubmit={this.handleSubmit} >
        <Typography component="h1" variant="h5" inline>
                Create Product Profile
              </Typography>

              <Grid container component="main" className={classes.root}>
             <Grid item  sm={12} md={4} elevation={6} square>
             <FormControl variant="outlined" className={classes.textField}>
        <InputLabel
         //ref={inputLabel}
          id="demo-simple-select-outlined-label">
          Product Name
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.nameValue}
          onChange={this.handleChangename.bind(this)}
         // labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.name.map(renderNameRow)}
        </Select>
      </FormControl>
             </Grid>
             <Grid item  sm={12} md={4} elevation={6} square>
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
             </Grid>
             <Grid item  sm={12} md={4} elevation={6} square>
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
             </Grid>

             <Grid item  sm={12} md={6} elevation={6} square>
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
             </Grid>
             <Grid item  sm={12} md={6} elevation={6} square>
             <Barcode value={this.state.barcode} />

             </Grid>

             <Grid item  sm={12} md={4} elevation={6} square>
             <FormControl variant="outlined" className={classes.textField}>
        <InputLabel
         //ref={inputLabel}
          id="demo-simple-select-outlined-label">
         Lot
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.lotValue}
          onChange={this.handleChangelot.bind(this)}
         // labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.lot.map(renderLotRow)}
        </Select>
      </FormControl>
      </Grid>

             <Grid item  sm={12} md={4} elevation={6} square>
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
             </Grid>
             <Grid item  sm={12} md={4} elevation={6} square>
             <FormControl variant="outlined" className={classes.textField}>
        <InputLabel 
        id="demo-simple-select-outlined-label">
          Quantity Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state. quantitytypeValue}
          onChange={this.handleChangequantityValue.bind(this)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.quantityType.map(renderQuantityTypeRow)}
        </Select>
      </FormControl>
             </Grid>
             <Grid item  sm={12} md={6} elevation={6} square><h1>Total:</h1></Grid>
        <Grid item  sm={12} md={6} elevation={6} square><h1>{Total}</h1></Grid>
            </Grid>
        <Button variant="contained" color="primary" type="Submit">Save</Button>
        </form>
        {this.state.updatedValue}
        </div>   
    </div>
    </Grid>
    <Grid item  sm={12} md={6} square>
    <Grid item  sm={12} component={Paper} square>

 
 
     </Grid>
     <Grid item  sm={12} component={Paper} square>
      
     </Grid>
    </Grid>
    </Grid>
  );
}}

export default  withStyles(useStyles)(CreateProduct);