import React, { Fragment } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { useTheme, makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Icon } from 'leaflet';
import Typography from '@material-ui/core/Typography';

// 
import vaccineIcon from '../assets/vaccine.png';

const useStyles = makeStyles({
    map: {
        height: '80vh',
        width: '100%',
    },
    mapMobile: {
        height: '65vh',
        width: '100%',
    },
    button: {
        color: '#fff',
        fontSize: 11,
        boxShadow: 'none',
        fontWeight: 'bold'
    }
})

const MyPopupMarker = ({ ...props }) => {
    const classes = useStyles()
    const { key, time, img, name, organizer, date, address, position, dose, website, phoneNumber } = props

    const handleOpenRoute = (e, position) => {
        const url = "http://maps.google.com/?q=" + position;
        e.preventDefault();
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    const handleOpenCallOrganizer = (e, phoneNumber) => {
        const url = "tel:" + phoneNumber;
        e.preventDefault();
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    const handleOpenRegistrationLink = (e, website) => {
        e.preventDefault();
        window.open(website, '_blank', 'noopener,noreferrer')
    }

    return (
        <Marker key={`marker-${key}`} position={position} icon={new Icon({ iconUrl: vaccineIcon, iconSize: [35, 37] })}>
            <Popup>
                <div style={{ margin: -20 }}>
                    <img alt={name} src={img} width="100%" height={200} style={{ borderRadius: '13px 13px 0px 0px' }} />
                </div>
                <div style={{ textAlign: 'left', paddingTop: 15 }}>
                    <Typography variant="h6" style={{ marginTop: 15, fontWeight: 'bold' }}>{name}</Typography>
                    <h5 variant="subtitle1" style={{ marginTop: '10px', marginBottom: '-5px' }}>Penyelenggara:</h5>
                    <h4 style={{ marginTop: '10px' }}>
                        {organizer.map((list, key) =>
                            <div key={key}>
                                <b>{list}</b>
                            </div>
                        )}
                    </h4>
                    <h5 variant="subtitle1" style={{ marginBottom: '-12px' }}>Alamat:</h5>
                    <h4 style={{ marginBottom: '10px' }}><b>{address}</b></h4>
                    <h5 variant="subtitle1" style={{ marginBottom: '-12px' }}>Tanggal:</h5>
                    <h4 variant="subtitle2"><b>{date.join(', ')}</b></h4>
                    {/* <h4 style={{ marginBottom: '10px' }}>
                        {date.map((list, key) =>
                            <div key={key}>
                                <b>{list}</b>
                            </div>
                        )}
                    </h4> */}
                    <h5 variant="subtitle1" style={{ marginBottom: '-12px' }}>Waktu:</h5>
                    <h4 variant="subtitle2" style={{ marginBottom: '10px' }}><b>{time}</b></h4>
                    <h5 variant="subtitle1" style={{ marginBottom: '-12px' }}>Vaksin:</h5>
                    <h4 variant="subtitle2"><b>{dose.join(', ')}</b></h4>
                    <div style={{ marginTop: 20 }}>
                        <Button className={classes.button} variant="contained" color="primary" onClick={(e) => {
                            handleOpenRoute(e, position);
                        }} fullWidth>Rute</Button>
                    </div>
                    {
                        phoneNumber === '' ?
                            null :
                            <div style={{ marginTop: 10 }}>
                                <Button className={classes.button} variant="contained" color="secondary" onClick={(e) => {
                                    handleOpenCallOrganizer(e, phoneNumber);
                                }} fullWidth>Hubungi Penyelenggara</Button>
                            </div>
                    }
                    {
                        website === '' ?
                            null :
                            <div style={{ marginTop: 10 }}>
                                <Button className={classes.button} variant="contained" color="secondary" onClick={(e) => {
                                    handleOpenRegistrationLink(e, website);
                                }} fullWidth>Link Pendaftaran</Button>
                            </div>
                    }
                </div>
            </Popup>
        </Marker>
    )
}

const MyMarkersList = ({ data }) => {
    const items = data ? data.map(({ key, ...props }) => (
        <MyPopupMarker key={key} {...props} />
    )) : []

    return (
        <Fragment>{items}</Fragment>
    )
}

const SimpleMap = ({ ...props }) => {
    const classes = useStyles()
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.up('lg'));

    const { dosisVaksin } = props

    return (
        <div>
            <Map center={[-5.143467, 119.407528]} zoom={13} scrollWheelZoom={false} className={isMobileView ? classes.map : classes.mapMobile}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <MyMarkersList data={dosisVaksin} />
            </Map>
        </div>
    )
}

export default SimpleMap