import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ButtonAppBar from '../components/ButtonAppBar';

const useStyles = theme => ({
});

class Admin extends React.Component {
    constructor() {
        super();
      }

      render() {   
        return(<div>
         <ButtonAppBar />
        </div>);
    }
}

export default  withStyles(useStyles)(Admin);

