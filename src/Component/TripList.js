import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import React, {useState,useEffect} from 'react';

const TripList = props => {
  // const  [dataAddressUser,setDataAddressUser] = useState({});
    console.log(props.dataAddressUser)
    return(
        <div>
            <Grid container justifyContent="center">
                <Typography variant="h1" component="div" style={{paddingTop:'24px',color:'#3381f0'}}>
                    Destination List
                </Typography>
            </Grid>
            {props.dataAddressUser.length === 0 ? 
            <Grid container justifyContent="center">
                <Typography variant="h5" component="div" style={{paddingTop:'24px',color:'gray'}}>
                    No Destination
                </Typography>
            </Grid> : 

            <Grid 
            style={{height:'50vh',paddingLeft:'24px'}} 
            container 
            spacing={2}
            justifyContent="flex-start" 
            alignItems="center">
            
            {props.dataAddressUser.map(key => {
                return(
                    <Grid item md={2}>
                    <Card sx={{ minWidth: 275, maxWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                        {key}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                        </Typography>
                        <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                </Grid>
                )
            })}
           
            
        </Grid>
        }
            
            
        </div>
       
    )
        
}

const mapStateToProps = state => {
    return{
        dataAddressUser: state.dataAddress
    }
}

export default connect(mapStateToProps)(TripList);