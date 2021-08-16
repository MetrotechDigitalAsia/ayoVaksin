import React, { forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Animation from '../Animation';

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
                <DialogTitle>{"Ooopss!"}</DialogTitle>
                <DialogContent>
                    <Animation json={require("../../assets/lottie/notFound.json")} autoplay="true" height={"unset"} width={"unset"} />
                    <DialogContentText id="alert-dialog-slide-description">
                        Data vaksin yang anda cari <b>tidak ditemukan</b>.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={isClose} color="primary">
                        Tutup
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}