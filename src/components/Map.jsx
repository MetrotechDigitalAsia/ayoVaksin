import React, { Fragment, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { makeStyles } from '@material-ui/styles'

// 
import labuangBaji from '../assets/hospital/labuangBaji.jpeg'

const useStyles = makeStyles({
    mapDiv: {
        height: '100vh',
        width: '100%',
        // position: 'absolute',
        // overflow: 'hidden',
    },
})

const MyPopupMarker = ({ ...props }) => {
    const { img, name, address, position, dose } = props
    return (
        <Marker position={position}>
            <Popup>
                <div style={{ margin: -20 }}>
                    <img alt={name} src={img} width="100%" height="100%" style={{ borderRadius: '13px 13px 0px 0px' }} />
                </div>
                <div style={{ textAlign: 'left', paddingTop: 10 }}>
                    <h3>
                        <b>{name}</b>
                    </h3>
                    <h5>
                        Alamat:
                    </h5>
                    <h4 style={{ marginTop: '-15px' }}>
                        <b>{address}</b>
                    </h4>
                    <h5>
                        Vaksin:
                    </h5>
                    {dose.map((list, key) =>
                        <div key={key} style={{ marginTop: '-15px' }}>
                            <b>{list}</b>
                        </div>
                    )}
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
    const [placeCategory] = useState('');

    // const handleChangeCategory = (event) => {
    //     setPlaceCategory(event.target.value);
    // };

    const listMarker = [
        { key: 'marker1', position: [-5.1605152819184745, 119.41813562390229], subDistrict: 'Mamajang', img: labuangBaji, name: 'RS Labuang Baji', address: 'Jln. Dr. Ratulangi No 81, Makassar.', dose: ['Dosis Vaksin 1 '] },
    ]

    const findPlace = placeCategory ? listMarker.filter(x => x.category.join("").includes(placeCategory)) : listMarker

    return (
        <div>
            <Map center={[-5.143467, 119.407528]} zoom={12.2} scrollWheelZoom={false} className={classes.mapDiv}>
                <TileLayer
                    // Black Map
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                />
                <MyMarkersList listMarker={findPlace} />
            </Map>
        </div>
    )
}

export default SimpleMap