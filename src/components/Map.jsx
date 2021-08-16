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
    const { key, time, img, name, address, position, dose } = props

    const handleOpenRoute = (e, position) => {
        const url = "http://maps.google.com/?q=" + position;
        e.preventDefault();
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <Marker key={`marker-${key}`} position={position} icon={new Icon({ iconUrl: vaccineIcon, iconSize: [35, 37] })}>
            <Popup>
                <div style={{ margin: -20 }}>
                    <img alt={name} src={img} width="100%" height="100%" style={{ borderRadius: '13px 13px 0px 0px' }} />
                </div>
                <div style={{ textAlign: 'left', paddingTop: 15 }}>
                    <Typography variant="h6" style={{ marginTop: 15 }}><b>{name}</b></Typography>
                    <Typography variant="body2" style={{ marginTop: '10px' }}>Alamat:</Typography>
                    <Typography variant="subtitle2" style={{ marginTop: '-15px' }}><b>{address}</b></Typography>
                    {/* <h5>
                        <Typography variant="body2">Tanggal:</Typography>
                    </h5>
                    <h4 style={{ marginTop: '-15px' }}>
                        {date.map((list, key) =>
                            <div key={key}>
                                <Typography variant="subtitle2"><b>{list}</b></Typography>
                            </div>
                        )}
                    </h4> */}
                    <Typography variant="body2">Waktu:</Typography>
                    <Typography variant="subtitle2" style={{ marginTop: '-15px' }}><b>{time}</b></Typography>
                    <Typography variant="body2">Vaksin:</Typography>
                    <Typography variant="subtitle2" style={{ marginTop: '-15px' }}><b>{dose.join(', ')}</b></Typography>
                    <div style={{ marginTop: 20 }}>
                        <Button className={classes.button} variant="contained" color="primary" onClick={(e) => {
                            handleOpenRoute(e, position);
                        }} fullWidth>Rute</Button>
                    </div>
                    {/* <div style={{ marginTop: 10 }}>
                        <Button className={classes.button} variant="contained" color="secondary" onClick={(e) => {
                            handleOpenRoute(e, position);
                        }} fullWidth>Hubungi Tempat</Button>
                    </div> */}
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