import React, { Fragment, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { useTheme, makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Icon } from 'leaflet';

// 
import labuangBaji from '../assets/hospital/labuangBaji.jpeg'
import satbrimob from '../assets/hospital/satbrimob.jpeg'
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
    const { key, img, name, address, position, dose } = props

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
                    <h3>
                        <b>{name}</b>
                    </h3>
                    <h5>
                        Alamat:
                    </h5>
                    <h4 style={{ marginTop: '-15px' }}>
                        <b>{address}</b>
                    </h4>
                    <h5 style={{ marginBottom: '2px' }}>
                        Vaksin:
                    </h5>
                    {dose.map((list, key) =>
                        <div key={key}>
                            <b>{list}</b>
                        </div>
                    )}
                    <div style={{ marginTop: 20 }}>
                        <Button className={classes.button} variant="contained" color="primary" onClick={(e) => {
                            handleOpenRoute(e, position);
                        }} fullWidth>Rute</Button>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button className={classes.button} variant="contained" color="secondary" onClick={(e) => {
                            handleOpenRoute(e, position);
                        }} fullWidth>Hubungi Tempat</Button>
                    </div>
                </div>
            </Popup>
        </Marker>
    )
}

const MyMarkersList = ({ listMarker }) => {
    const items = listMarker ? listMarker.map(({ key, ...props }) => (
        <MyPopupMarker key={key} {...props} />
    )) : []

    return (
        <Fragment>{items}</Fragment>
    )
}

const SimpleMap = () => {
    const classes = useStyles()
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.up('lg'));

    const [placeCategory] = useState('');

    // const handleChangeCategory = (event) => {
    //     setPlaceCategory(event.target.value);
    // };

    const listMarker = [
        { key: 'marker1', position: [-5.162372675272291, 119.41826702612505], subDistrict: 'Mamajang', img: labuangBaji, name: 'RS Labuang Baji', address: 'Jln. Dr. Ratulangi No 81, Makassar.', dose: ['Dosis Vaksin 1 '] },
        { key: 'marker2', position: [-5.169756477632507, 119.4242401684531], subDistrict: 'Tamalate', img: satbrimob, name: 'Klinik Teratai Satbrimob Polda Sulsel', address: 'Jln. Sultan Alauddin No. 75, Makassar.', dose: ['Dosis Vaksin 1 ', 'Dosis Vaksin 2'] },
    ]

    const findPlace = placeCategory ? listMarker.filter(x => x.category.join("").includes(placeCategory)) : listMarker

    return (
        <div>
            <Map center={[-5.143467, 119.407528]} zoom={13} scrollWheelZoom={false} className={isMobileView ? classes.map : classes.mapMobile}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <MyMarkersList listMarker={findPlace} />
            </Map>
        </div>
    )
}

export default SimpleMap