import React from 'react';
import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// 
import logo from '../assets/logo.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        color: "#2F67C8",
        flexGrow: 1,
        boxShadow: 'none',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    alignLeft: {
        textAlign: 'left'
    },
    alignRight: {
        textAlign: 'right',
        alignSelf: 'center'
    },
    center: {
        alignSelf: 'center'
    }
}));

export default function AppBarComponent() {
    const classes = useStyles();

    return (
        <AppBar position="relative" className={classes.root}>
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={6} className={classes.alignLeft}>
                        <img alt="Ayo Vaksin | Metrotech Digital Asia" src={logo} height={47} width={108} />
                    </Grid>
                    <Grid item xs={6} className={classes.alignRight}>
                        <Grid container>
                            <Grid item xs={12} md={12} className={classes.center}>
                                <Typography variant="body2" color="secondary">
                                    <b>Beranda</b>
                                </Typography>
                            </Grid>
                            {/* <Grid item xs={6} md={3} className={classes.center} style={{ color: '#CA1818' }}>
                                <Typography variant="body1">
                                    Lapor Covid19
                                </Typography>
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    );
}