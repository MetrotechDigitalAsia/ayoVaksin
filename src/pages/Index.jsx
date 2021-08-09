import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// 
import AppBar from '../components/AppBar';
import Map from '../components/Map';
import Form from '../components/Form';
import Footer from '../components/Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
    },
}));

export default function Album() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar />
            <Grid container>
                <Grid item xs={12}>
                    <Map />
                </Grid>
                <Grid item xs={12}>
                    <Form />
                </Grid>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        </div>
    );
}