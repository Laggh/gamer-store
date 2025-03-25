import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const [posAtual,setPosAtual] = useState([0,0])
    const [pontos,setPontos] = useState([])
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosAtual([position.coords.latitude, position.coords.longitude])
          },
          (error) => {
            console.error('Error getting user location', error);
          }
        );
    }

    {/* colocar os pontos + o ponto atual */}
    const pontosToRender = pontos.concat([posAtual])
    
    const MapClickHandler = () => {
        useMapEvent('click', (event) => {
            const { lat, lng } = event.latlng;
            console.log(`Clicked position: Latitude: ${lat}, Longitude: ${lng}`);
            setPontos((prevPontos) => [...prevPontos, [lat, lng]]);
        });
        return null;
    };

  return (
    <>  
        <h1>Mapa legal.com</h1>
        <h5>por cordenada</h5>
        <input type="number" name="" id="num1" /><input type="number" name="" id="num2" />
        
        <button onClick={() => {
            const num1 = document.getElementById('num1').value
            const num2 = document.getElementById('num2').value
            setPontos([...pontos,[num1,num2]])
        }}>Adicionar ponto</button>
        
        <h5>Por endereço</h5>
        <input type="text" name="" id="endereco" />

        <button onClick={() => {
            
            const endereco = document.getElementById('endereco').value
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length === 0) {
                    alert('Endereço não encontrado')
                    return
                }
                console.log(data)
                setPontos([...pontos,[data[0].lat,data[0].lon]])
            })
        }}>Adicionar ponto</button>





        <MapContainer 
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: '700px', width: '100%' }}
            onClick={MapClickHandler}
            worldCopyJump={true}
            minZoom={3}>

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MapClickHandler />

            {pontosToRender.map((ponto,index) => {
                return <Marker key={index} position={ponto} >
                    <Popup>
                        ponto mto legal 👍 <br />
                        {ponto[0]} , {ponto[1]} <br />
                        {/* deletar ponto*/}
                        <button onClick={() => {
                            setPontos(pontos.filter((pontoFiltrado) => pontoFiltrado !== ponto))
                        }}>Deletar ponto</button>
                    </Popup>
                </Marker>
            })}

        </MapContainer>
    </>
  );
}

export default MapComponent;
