
import { makeStyles } from '@material-ui/core/styles';
import React, { useState,useEffect} from "react";
  import axios from "axios";
import Button from "@mui/material/Button";
import UserIcon from "@mui/icons-material/AccountCircle";
import "./profile.css"
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';
 import { useNavigate } from 'react-router-dom';

const AllUsers = ( ) => {

let navigate = useNavigate();
  const [list,setList]=useState([
    {id:"1", firstName:"khaoula", lastName:"EL-BOUCHTI", email:"khaoula@gmail.com", username:"khaoulaEl", verified:"true", birthDate:"12-03-2000", creationDate:"18-1-2023"},
    {id:"2", firstName:"khaoula", lastName:"EL-BOUCHTI", email:"khaoula@gmail.com", username:"khaoulaEl", verified:"true", birthDate:"12-03-2000", creationDate:"18-1-2023"},
    {id:"1", firstName:"khaoula", lastName:"EL-BOUCHTI", email:"khaoula@gmail.com", username:"khaoulaEl", verified:"true", birthDate:"12-03-2000", creationDate:"18-1-2023"},
    {id:"1", firstName:"khaoula", lastName:"EL-BOUCHTI", email:"khaoula@gmail.com", username:"khaoulaEl", verified:"true", birthDate:"12-03-2000", creationDate:"18-1-2023"},
    {id:"1", firstName:"khaoula", lastName:"EL-BOUCHTI", email:"khaoula@gmail.com", username:"khaoulaEl", verified:"true", birthDate:"12-03-2000", creationDate:"18-1-2023"},
    {id:"1", firstName:"khaoula", lastName:"EL-BOUCHTI", email:"khaoula@gmail.com", username:"khaoulaEl", verified:"true", birthDate:"12-03-2000", creationDate:"18-1-2023"},
]);

useEffect(() => {
    
  }, [list])
//=============================le style pour les chapms du tab =========================================
const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: '100%'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    mission: {
      fontWeight: 'bold',
      color: "gray"
  },
  status: {
    fontWeight: 'bold',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: '3px 10px',
    display: 'inline-block'
}
  }));
  //=================================================================
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
//=================================================================
  return (
    <div ><div className="table-header">All Users</div>

 
 
    <TableContainer component={Paper} className={classes.tableContainer}>
    
      <Table className={classes.table} aria-label="simple table"  options={{
      search: true
    }}>
        <TableHead>
          <TableRow > 
          <TableCell  className={classes.tableHeaderCell}>firstName</TableCell>
            <TableCell className={classes.tableHeaderCell}>lastName</TableCell>
            <TableCell className={classes.tableHeaderCell}>email</TableCell>
            <TableCell className={classes.tableHeaderCell}>username</TableCell>
            <TableCell className={classes.tableHeaderCell}>verified</TableCell>
            <TableCell className={classes.tableHeaderCell}>birthDate</TableCell>
            <TableCell className={classes.tableHeaderCell}>creationDate</TableCell>
            <TableCell className={classes.tableHeaderCell}>Visualiser</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
            <TableCell><Typography color="textSecondary" variant="body2">{row.firstName}</Typography></TableCell>
            <TableCell ><Typography color="primary" variant="subtitle2">{row.lastName}</Typography></TableCell>
            <TableCell ><Typography color="primary" variant="subtitle2">{row.email}</Typography></TableCell>
            <TableCell ><Typography color="primary" variant="subtitle2">{row.username}</Typography></TableCell>
            <TableCell ><Typography color="primary" variant="subtitle2">{row.verified}</Typography></TableCell>
            <TableCell ><Typography color="primary" variant="subtitle2">{row.birthDate}</Typography></TableCell>
            <TableCell ><Typography color="primary" variant="subtitle2">{row.creationDate}</Typography></TableCell>
           <TableCell>  
                        <Button onClick={() => navigate('/userP',{state:{id:row.id, }})}> 
                                <UserIcon sx={{ fontSize: "20px", color: "green" }}>  </UserIcon> </Button> </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer></div>
  );
}

export default AllUsers;
