import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {SERVER_URL} from '../../config';

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
      quantity: '',
      quantityType:[],
      quantityTypeValue: '',
      price: '',
      createdBy:1,
      address:[],
      addressValue:'',
      
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


    fetch(SERVER_URL+'/address')
    .then(r => r.json())
    .then(json => this.setState({address: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

  
  }

  handleChangename=(event)=>{
    this.setState({nameValue:event.target.value});
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


  handleSubmit=(event)=>{
    event.preventDefault()
  
    let product={
     name:this.state.nameValue,
     barcode:this.state.barcode,
     quantity:this.state.quantity,
     quantityType:this.state.quantitytypeValue,
     price:this.state.price,
     createBy:1,
     address:this.state.addressValue
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
    const { classes } = this.props;

   
    function renderNameRow(name) {
      return (<MenuItem value={name.id}>{name.name}</MenuItem>);
    }
    
    function renderQuantityTypeRow(quantitytype) {
      return (<MenuItem value={quantitytype.id}>{quantitytype.name}</MenuItem>);
    }
    function renderAddressRow(address) {
        return (<MenuItem value={address.id}>{address.addresslineone}</MenuItem>);
      }
 
  return (
    <div>
        <div  className={classes.container}>
          <form onSubmit={this.handleSubmit} >
        <Typography component="h1" variant="h5" inline>
                Create Product Profile
              </Typography>

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

   
      <FormControl variant="outlined" className={classes.textField}>
        <InputLabel 
        id="demo-simple-select-outlined-label">
          Address
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state. addressValue}
          onChange={this.handleChangeaddress.bind(this)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.address.map(renderAddressRow)}
        </Select>
      </FormControl>



     


        <Button className={classes.textField} type="Submit">Save</Button>
        </form>
        {this.state.updatedValue}
        </div>   
    </div>
  );
}}

export default  withStyles(useStyles)(CreateProduct);