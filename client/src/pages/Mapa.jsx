import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = () => {
    const [posAtual,setPosAtual] = useState(null)
    const [pontos,setPontos] = useState([])
    const [mapLookPosition, setMapLookPosition] = useState([0,0])
    let map;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosAtual([position.coords.latitude, position.coords.longitude])
          },
          (error) => {
            //console.error('Error getting user location', error);
          }
        );
    }

    {/* colocar os pontos + o ponto atual */}
    const pontosToRender = pontos.concat([posAtual])
    
    const MapInteractionHandler = () => {
        map = useMap();

        useMapEvent('contextmenu', (event) => {
            const { lat, lng } = event.latlng;
            console.log(`Clicked position: Latitude: ${lat}, Longitude: ${lng}`);
            setPontos((prevPontos) => [...prevPontos, [lat, lng]]);
            
        });
        
        useMapEvent('moveend', (event) => {
            const { lat, lng } = event.target.getCenter();
            setMapLookPosition([lat,lng])
        });

        return null;
    };

  return (
    <>  
        <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw',
                zIndex: 0,
            }}>            

            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{ width: '100vw', height: "100vh", zIndex: 0, minHeight: "200px" }}
                /*onClick={}*/
                worldCopyJump={true}
                minZoom={3}>

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <MapInteractionHandler />

                {pontosToRender.map((ponto,index) => {
                    if (ponto === null) {return null}
                    return <Marker key={index} position={ponto} >
                        <Popup>
                            {ponto[0]} , {ponto[1]} <br />

                            <button className="btn btn-secondary" onClick={() => {
                                setPontos(pontos.filter((pontoFiltrado) => pontoFiltrado !== ponto))
                            }}>Deletar ponto</button>
                        </Popup>
                    </Marker>
                })}

                
                <Popup position={[20,20]}>
                    gozaram
                </Popup>

            </MapContainer>
            
            <div className='container d-flex flex-row gap-4'  
                style={{height: '50px', transition: 'height 0.5s', overflow: 'hidden'}}
                onMouseEnter={(e) => {e.currentTarget.style.height = '200px'}}
                onMouseLeave={(e) => {e.currentTarget.style.height = '50px'}}
            >
                <div>
                    <h5>Posição da tela</h5>
                    <p>{mapLookPosition[0]} {mapLookPosition[1]} </p>
                </div>
                <div>
                    <h5>Por cordenada</h5>
                    <input type="number" id="num1" className="form-control " />
                    <input type="number" id="num2" className="form-control " />
                    <button className="btn btn-primary" onClick={() => {
                        const num1 = document.getElementById('num1').value
                        const num2 = document.getElementById('num2').value
                        setPontos([...pontos,[num1,num2]])
                        document.getElementById('num1').value = ''
                        document.getElementById('num2').value = ''

                        map.setView([num1,num2], 13)

                    }}>Adicionar ponto</button>
                </div>
                <div>
                    <h5>Por endereço</h5>
                    <input type="text" name="" id="endereco" className='form-control' />
                    <button className="btn btn-primary" onClick={() => {
                        
                        const enderecoInput = document.getElementById('endereco')
                        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${enderecoInput.value}`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.length === 0) {
                                alert('Endereço não encontrado')
                                return
                            }
                            setPontos([...pontos,[data[0].lat,data[0].lon]])
                            enderecoInput.value = ''
                            map.setView([data[0].lat,data[0].lon], 13)
                        })
                    }}>Adicionar ponto</button>
                </div>
            </div>

        </div>
    </>
  );
}

export default MapComponent;
