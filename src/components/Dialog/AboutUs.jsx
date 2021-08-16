import React, { forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// 
import logo from '../../assets/logo.svg';

// 
import Divider from '@material-ui/core/Divider';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ ...props }) {
    const { isOpen, isClose } = props

    return (
        <div>
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={isClose}
            >
                <DialogContent>
                    <DialogContentText>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <div style={{ textAlign: 'center' }}>
                                    <img alt="Ayo Vaksin | Metrotech Digital Asia" src={logo} height={'50%'} width={'50%'} />
                                </div>
                                <Typography variant="body2" align="center">by Metrotech Digital Asia</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" align="left" style={{ marginBottom: 10, fontWeight: 'bold' }}>Tentang AyoVaksin:</Typography>
                                <Typography align="left" style={{ marginBottom: 15, fontSize: 14, lineHeight: 1.7 }}>Merupakan sebuah media dalam bentuk peta digital yang bertujuan untuk menyediakan layanan informasi mengenai tempat vaksinasi Covid19 di area Makassar, Indonesia.</Typography>
                                <Typography align="left" style={{ fontSize: 14, lineHeight: 1.7 }}>Dengan adanya AyoVaksin, kami harap dapat memberikan kemudahan dalam mengakses tempat vaksinasi Covid19 terutama untuk warga Makassar, Indonesia.</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="left" style={{ marginBottom: 10, fontSize: 13 }}>*<b>Disclaimer</b>: </Typography>
                                <Typography align="left" style={{ fontSize: 13, lineHeight: 1.7 }}>Data yang tersedia merupakan data yang kami rangkum dari berbagai sumber yang tersebar di sosial media. Sehingga, memungkinkan untuk data tidak akurat.</Typography>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={isClose} color="primary">
                        Tutup
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}