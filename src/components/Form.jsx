import 'date-fns';
import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

// 
import Title from './Title';
import Map from './Map';

// 
import { PoskoVaksin } from '../data/PoskoVaksin';

// 
import Format from '../utils/DateFormat';

// 
import AlertDialog from '../components/Dialog/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    form: {
        paddingLeft: theme.spacing(3)
    },
    formControl: {
        width: '100%',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    resetButton: {
        justifyContent: 'flex-end',
        fontWeight: 'bold',
        color: '#da2e2e'
    }
}));

export default function Form() {
    const classes = useStyles();
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.up('lg'));

    const [tipePenanggulangan, setTipePenaggulangan] = useState('Posko Vaksin Covid19');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dosisVaksin19, setDosisVaksin19] = useState("");
    const [jenisVaksin19, setJenisVaksin19] = useState("");
    const [poskoVaksin19, setPoskoVaksin19] = useState(PoskoVaksin);

    // 
    const [openAlertDialog, setOpenAlertDialog] = useState(false);

    // 
    const findPoskoCovid = () => {
        const filterDate = PoskoVaksin.filter(x => x.date.join("").includes(Format.FullDate(selectedDate)));
        const filterDose = filterDate.filter(x => x.dose.join("").includes(dosisVaksin19));
        const filterType = filterDose.filter(x => x.vaccine.join("").includes(jenisVaksin19));
        setOpenAlertDialog(filterType.length === 0 ? true : false)
        return filterType;
    }

    const handleChangeTipePenanggulangan = (event) => {
        setTipePenaggulangan(event.target.value);
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleChangeDosisVaksin = (event) => {
        setDosisVaksin19(event.target.value);
    }
    const handleChangeJenisVaksin = (event) => {
        setJenisVaksin19(event.target.value);
    }

    const handleFilterData = (e) => {
        e.preventDefault();
        setPoskoVaksin19(findPoskoCovid);
        // Set to top
        window.scrollTo(0, 0);
    }

    const handleResetFilter = (e) => {
        e.preventDefault();
        setPoskoVaksin19(PoskoVaksin);
        setDosisVaksin19('');
        setJenisVaksin19('');
        setSelectedDate(new Date());
        setOpenAlertDialog(false);
    }

    const handleCloseAlertDialog = () => {
        setPoskoVaksin19(PoskoVaksin);
        setDosisVaksin19('');
        setJenisVaksin19('');
        setSelectedDate(new Date());
        setOpenAlertDialog(false);
    }

    return (
        <div>
            <Map dosisVaksin={poskoVaksin19} />
            <AlertDialog isOpen={openAlertDialog} isClose={handleCloseAlertDialog} />
            <Container maxWidth="lg" className={classes.root}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                        <Title isHeader={true} mainTitle={"Form Filter Vaksin"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Title isHeader={false} mainTitle={"Filter 1"} subTitle={"Pilih Tipe Penanggulangan."} />
                            </Grid>
                            <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                                <FormControl component="fieldset">
                                    <RadioGroup value={tipePenanggulangan} onChange={handleChangeTipePenanggulangan}>
                                        <FormControlLabel value="Posko Vaksin Covid19" control={<Radio />} label={<Typography variant="subtitle2">Posko Vaksin Covid19</Typography>} />
                                        <FormControlLabel disabled value="Posko Penanggulangan Covid19" control={<Radio />} label={<Typography variant="subtitle2">Posko Penanggulangan Covid19</Typography>} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={isMobileView ? 2 : 2}>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={6} md={10}>
                                        <Title isHeader={false} mainTitle={"Filter 2"} subTitle={"Pilih Tanggal & Dosis Vaksin."} />
                                    </Grid>
                                    <Grid item xs={6} md={2}>
                                        <Button onClick={handleResetFilter} color="secondary" className={classes.resetButton} fullWidth>Reset Filter</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        style={{ width: '100%' }}
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        label="Tanggal Vaksinasi"
                                        minDate={new Date()}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ textAlign: 'left' }}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Dosis Vaksin</InputLabel>
                                    <Select
                                        value={dosisVaksin19}
                                        onChange={handleChangeDosisVaksin}
                                    >
                                        <MenuItem value={"Dosis Vaksin 1"}>Vaksin 1</MenuItem>
                                        <MenuItem value={"Dosis Vaksin 2"}>Vaksin 2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ textAlign: 'left' }}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Jenis Vaksin</InputLabel>
                                    <Select
                                        value={jenisVaksin19}
                                        onChange={handleChangeJenisVaksin}
                                    >
                                        <MenuItem value={"Sinovac"}>Sinovac</MenuItem>
                                        <MenuItem value={"Astrazeneca"}>Astrazeneca</MenuItem>
                                        <MenuItem value={"Moderna"}>Moderna</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12} style={{ marginTop: 20 }}>
                                <Button disabled={!dosisVaksin19} onClick={handleFilterData} variant="contained" color="secondary" fullWidth>Generate</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
