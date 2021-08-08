import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
        <Typography variant="body2" align="center">
            {'© '}{' '}
            {new Date().getFullYear()}
            {''} <b>Vaksin</b> {'by'} {''}
            <Link href="https://metrotechdigital.asia/" style={{ color: '#fff', fontWeight: 'bold' }}>
                Metrotech Digital Asia.
            </Link>
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#2F67C8',
        padding: theme.spacing(2),
        color: '#fff'
    },
}));

export default function FooterComponent() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Copyright />
        </footer>
    );
}