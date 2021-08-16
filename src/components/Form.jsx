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
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';

// 
import Title from './Title';
import Map from './Map';

// 
import { PoskoVaksin } from '../data/PoskoVaksin';

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
}));

export default function Form() {
    const classes = useStyles();
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.up('lg'));

    const [value, setValue] = useState('female');
    const [dosisVaksin19, setDosisVaksin19] = useState("");
    const [poskoVaksin19, setPoskoVaksin19] = useState(PoskoVaksin);


    // 
    const findPoksoCovid = PoskoVaksin.filter(x => x.dose.join("").includes(dosisVaksin19));

    const handleChangeRadio = (event) => {
        setValue(event.target.value);
    };
    const handleChangeDosisVaksin = (event) => {
        setDosisVaksin19(event.target.value);
    }

    const handleFilterData = (e) => {
        e.preventDefault();
        setPoskoVaksin19(findPoksoCovid);
    }

    return (
        <div>
            <Map dosisVaksin={poskoVaksin19} />
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
                                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChangeRadio}>
                                        <FormControlLabel value="female" control={<Radio />} label={<Typography variant="subtitle2">Posko Vaksin Covid19</Typography>} />
                                        <FormControlLabel disabled value="male" control={<Radio />} label={<Typography variant="subtitle2">Posko Penanggulangan Covid19</Typography>} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={isMobileView ? 4 : 2}>
                            <Grid item xs={12}>
                                <Title isHeader={false} mainTitle={"Filter 2"} subTitle={"Pilih Tanggal & Dosis Vaksin."} />
                            </Grid>
                            <Grid item xs={12} md={5} style={{ textAlign: 'left' }}>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        label="Tanggal Vaksin"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        className={classes.formControl}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                            </Grid>
                            <Grid item xs={12} md={4} style={{ textAlign: 'left' }}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Dosis Vaksin</InputLabel>
                                    <Select
                                        value={dosisVaksin19}
                                        onChange={handleChangeDosisVaksin}
                                    >
                                        <MenuItem value={"Dosis Vaksin 1"}>Vaksin 1</MenuItem>
                                        <MenuItem value={"Dosis Vaksin 2"}>Vaksin 2</MenuItem>
                                        <MenuItem value={"Dosis Vaksin 1 & 2"}>Vaksin 1 & 2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3} style={{ alignSelf: 'center' }}>
                                <Button onClick={handleFilterData} variant="contained" color="secondary" fullWidth>Generate</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
