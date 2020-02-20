import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateTicket from './CreateTicket';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from '../config';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


const useStyles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class TicketSearch extends React.Component {
    constructor() {
        super();
    
        this.state = {
          ticket: [],
          filterList:[],
          searchTicketValue:'',
          
        }
       // this.handleChange = this.handleChange.bind(this);
        this.searchTicket = this.searchTicket.bind(this);

      }
      componentDidMount() {
        fetch(SERVER_URL+'/ticket')
        .then(r => r.json())
        .then(json => this.setState({ticket: json}))
        .catch(error => console.error('Error retrieving Companies: ' + error));
      }
     searchTicket(e){
        fetch('http://teraretbetaapi-env.3s22ejt32d.ap-south-1.elasticbeanstalk.com/ticketSearch?description=%o%')
        .then(r => r.json())
        .then(json => this.setState({ticket: json})).then(json=> console.log(json))
        .catch(error => console.error('Error retrieving Companies: ' + error));
      }


     

//       handleChange(e) {
//         // Variable to hold the original version of the list
//     let currentList = [];
//         // Variable to hold the filtered list before putting into state
//     let newList = [];

//         // If the search bar isn't empty
//     if (e.target.value !== "") {
//             // Assign the original list to currentList
//       currentList = this.props.ticket;

//             // Use .filter() to determine which items should be displayed
//             // based on the search terms
//       newList = currentList.filter(ticket => {
//                 // change current item to lowercase
//         const lc = ticket.toLowerCase();
//         // const tc  = value;
//                 // change search term to lowercase
//         const filter = e.target.value.toLowerCase();
//         let field= this.state.ticket;
//         let search = field
//                 // check to see if the current list item includes the search term
//                 // If it does, it will be added to newList. Using lowercase eliminates
//                 // issues with capitalization in search terms and search content
//         return search.includes(filter);
//       });
//     } else {
//             // If the search bar is empty, set newList to original task list
//       newList = this.props.ticket;
//     }
//         // Set the filtered state based on what our rules added to newList
//     this.setState({
//       filterList: newList
//     });
//   }

//   handleChangeSearchTicketValue=(event)=>{
//     this.setState({searchTicketValue:event.target.value});
//   }

    


    render() {
        const { classes } = this.props;
        const StyledTableCell = withStyles(theme => ({
            head: {
              backgroundColor: theme.palette.common.black,
              color: theme.palette.common.white,
            },
            body: {
              fontSize: 14,
            },
          }))(TableCell);
          
          const StyledTableRow = withStyles(theme => ({
            root: {
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
              },
            },
          }))(TableRow);
          
          
          

          function renderTicketRow(Ticket) {

            return (<StyledTableRow key={Ticket.id}>
              <StyledTableCell component="th" scope="row">
                {Ticket.ticket}
              </StyledTableCell>
              <StyledTableCell align="right">{Ticket.description}</StyledTableCell>
              <StyledTableCell align="right">{Ticket.contact}</StyledTableCell>
              <StyledTableCell align="right">{Ticket.ticketStatus}</StyledTableCell>
              <StyledTableCell align="right">{Ticket.ticketSource}</StyledTableCell>
              <StyledTableCell align="right">{Ticket.createdBy}</StyledTableCell>
              <StyledTableCell align="right">{Ticket.assignedTo}</StyledTableCell>

            </StyledTableRow>);
          }
      

        return(
            <div>
        <TextField id="outlined-search" label="Search field" type="search" variant="outlined" onChange={this.searchTicket} />
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
        {/* <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." /> */}
       
       
{/*        
        <FormControl variant="outlined" className={classes.textField}>

        <InputLabel
         //ref={inputLabel}
          id="demo-simple-select-outlined-label">
          Company
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.ticketSearchValue}
          onChange={this.handleChangeSearchTicketValue.bind(this)}
         // labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value='contact'>Contact</MenuItem>
          <MenuItem value='ticketstatus'>Status</MenuItem>
          <MenuItem value='ticketSource'>Source</MenuItem>
          <MenuItem value='createdBy'>CreatedBy</MenuItem>
          <MenuItem value='assignedTo'>assignedTo</MenuItem>





        </Select>
      </FormControl>

       */}
          <TableRow>
            <StyledTableCell>Ticket ID</StyledTableCell>
            <StyledTableCell align="right"> Description </StyledTableCell>
            <StyledTableCell align="right"> Contact</StyledTableCell>
            <StyledTableCell align="right"> Status </StyledTableCell>
            <StyledTableCell align="right"> Sources </StyledTableCell>
            <StyledTableCell align="right"> Created By </StyledTableCell>
            <StyledTableCell align="right"> Assigned To </StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.ticket.map(renderTicketRow)}
        </TableBody>
      </Table>
      </div>
    
        );
    }}


export default  withStyles(useStyles)(TicketSearch);