import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// 
import AboutUsDialog from '../components/Dialog/AboutUs';

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
    },
    resetButton: {
        justifyContent: 'flex-end',
        fontWeight: 'bold',
    }
}));

export default function AppBarComponent() {
    const classes = useStyles();
    const [openAboutUsDialog, setOpenAboutUsDialog] = useState(false)

    const handleOpenAboutUsDialog = () => {
        setOpenAboutUsDialog(true)
    }
    const handleCloseAboutUsDialog = () => {
        setOpenAboutUsDialog(false)
    }

    return (
        <AppBar position="relative" className={classes.root}>
            <AboutUsDialog isOpen={openAboutUsDialog} isClose={handleCloseAboutUsDialog} />
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={6} md={10} className={classes.alignLeft}>
                        <Link href="/">
                            <img alt="Ayo Vaksin | Metrotech Digital Asia" src={logo} height={47} width={108} />
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={2} className={classes.alignRight}>
                        <Grid container>
                            <Grid item xs={12} md={12} className={classes.center}>
                                <Button onClick={handleOpenAboutUsDialog} color="secondary" className={classes.resetButton} fullWidth>Tentang Kami</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    );
}