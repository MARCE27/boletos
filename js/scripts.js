// Mapa Leaflet
var mapa = L.map('mapid').setView([9.9134, -83.9982], 13);


// Definición de capas base

var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);

var capa_Esri = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' , 
    {
      maxZoom: 19,
      atribución : 'Tiles & copy; Esri & mdash; Fuente: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP y la comunidad de usuarios de GIS '
    }
).addTo(mapa);

 
// Conjunto de capas base
var capas_base = {
  "OSM": capa_osm,
  "Esri": capa_Esri
};	    


// Ícono personalizado para Haciendas Cafetaleras
const iconoSitio = L.divIcon({
  html: '<i class="fas fa-coins"></i>', 
  className: 'estiloIconos'
});


// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	


// Control de escala
L.control.scale().addTo(mapa);
   

// Capa vectorial de cantones en formato GeoJSON
$.getJSON("https://johancordoba78.github.io/datos/cantones_b.geojson", function(geodata) {
  var cantones = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#0c0b0b", 'weight': 2, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Nombre</strong>: " + feature.properties.nombre+ "<br>" +  "<strong>Código</strong>: " + feature.properties.id_cantones;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(cantones, 'Cantones_boletos');
});  


// Capa vectorial de distritos en formato GeoJSON
$.getJSON("https://johancordoba78.github.io/datos/distritos_b.geojson", function(geodata) {
  var distritos = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#0c0b0b", 'weight': 2, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Nombre</strong>: " + feature.properties.nombre+ "<br>" + "<strong>Código</strong>: " + feature.properties.id_distritos;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(distritos, 'distritos_boletos');
});  

// Marcadores
	San_Diego = L.marker([9.900598, -83.99366]);
	San_Diego.bindTooltip("H.San Diego").openTooltip();
	San_Diego.bindPopup('<h2>H.San Diego</h2> <p><img src="img/SanDiego.jpg" alt="San_Diego" height="100" width="100"></p>').openPopup();
	San_Diego.addTo(mapa);

EB = L.marker([9.900917, -84.00131]);
	EB.bindTooltip("H.Eugenio Bermudes").openTooltip();
	EB.bindPopup('<h2>H.Eugenio Bermúdez</h2> <p><img src="img/EB.jpg" alt="Eugenio Bermúdez" height="100" width="100"></p>').openPopup();
	EB.addTo(mapa);


itaba = L.marker([9.901594, -84.02096]);
	itaba.bindTooltip("H.Itaba").openTooltip();
	itaba.bindPopup('<h2>H.Itaba</h2> <p><img src="img/LaItaba.jpg" alt="Itaba" height="100" width="100"></p>').openPopup();
	itaba.addTo(mapa);


Piza = L.marker([9.904333, -83.98697]);
	Piza.bindTooltip("H.Piza").openTooltip();
	Piza.bindPopup('<h2>H.Piza</h2> <p><img src="img/Piza.jpg" alt="Piza" height="100" width="100"></p>').openPopup();
	Piza.addTo(mapa);
	
Herran = L.marker([9.910064, -84.00120]);
	Herran.bindTooltip("H.Herran").openTooltip();
	Herran.bindPopup('<h2>H.Herran</h2> <p><img src="img/Herran.jpg" alt="Herran" height="100" width="100"></p>').openPopup();
	Herran.addTo(mapa);

La_Mancha = L.marker([9.910296, -84.00367]);
	La_Mancha.bindTooltip("H.La Mancha").openTooltip();
	La_Mancha.bindPopup('<h2>H.La Mancha</h2> <p><img src="img/LaMancha.jpg" alt="La Mancha" height="100" width="100"></p>').openPopup();
	La_Mancha.addTo(mapa);
	

La_Laguna = L.marker([9.910550, -84.02384]);
	La_Laguna.bindTooltip("H.La Laguna").openTooltip();
	La_Laguna.bindPopup('<h2>H.La Laguna</h2> <p><img src="img/Laguna.jpg" alt="La Laguna" height="100" width="100"></p>').openPopup();
	La_Laguna.addTo(mapa);	
	
La_Union = L.marker([9.911862, -84.01255]);
	La_Union.bindTooltip("H.La Unión").openTooltip();
	La_Union.bindPopup('<h2>H.La Unión</h2> <p><img src="img/LaUnion.jpg" alt="La Unión" height="100" width="100"></p>').openPopup();
	La_Union.addTo(mapa);	
	
Andre = L.marker([9.914372, -83.98719]);
	Andre.bindTooltip("H.André").openTooltip();
	Andre.bindPopup('<h2>H.André</h2> <p><img src="img/Herran.jpg" alt="André" height="100" width="100"></p>').openPopup();
	Andre.addTo(mapa);	
	
JG = L.marker([9.916549, -83.96949]);
	JG.bindTooltip("H.Jaime Guell").openTooltip();
	JG.bindPopup('<h2>H.Jaime Guell</h2> <p><img src="img/JG.jpg" alt="Jaime Guell" height="100" width="100"></p>').openPopup();
	JG.addTo(mapa);

IREX = L.marker([9.921580, -83.99063]);
	IREX.bindTooltip("H.Irex").openTooltip();
	IREX.bindPopup('<h2>H.Irex</h2> <p><img src="img/Irex.jpg" alt="Irex" height="100" width="100"></p>').openPopup();
	IREX.addTo (mapa);
	
Silvia = L.marker([9.927863, -84.00454]);
	Silvia.bindTooltip("H.La Silvia").openTooltip();
	Silvia.bindPopup('<h2>H.La Silvia</h2> <p><img src="img/LaSilvia.jpg" alt="Irex" height="100" width="100"></p>').openPopup();
	Silvia.addTo(mapa);
	
CD = L.marker([9.905398, -83.98073]);
	CD.bindTooltip("H.Carlos Durán").openTooltip();
	CD.bindPopup('<h2>H.Carlos Durán</h2>').openPopup();
	CD.addTo(mapa);
	
conejo = L.marker([9.906763, -83.99668]);
	conejo.bindTooltip("H.Cleto Conejo").openTooltip();
	conejo.bindPopup('<h2>H.Cleto Conejo</h2>').openPopup();
	conejo.addTo(mapa);
	
tiribi = L.marker([9.908395, -83.98284]);
	tiribi.bindTooltip("H.Tiribi").openTooltip();
	tiribi.bindPopup('<h2>H.Tiribi</h2>').openPopup();
	tiribi.addTo(mapa);


BV = L.marker([9.908999, -83.99977]);
	BV.bindTooltip("H.Bella Vista").openTooltip();
	BV.bindPopup('<h2>H.Bella Vista</h2>').openPopup();
	BV.addTo(mapa);	

S_ALV = L.marker([9.911999, -83.98222]);
	S_ALV.bindTooltip("H.Sociedad Alvarado").openTooltip();
	S_ALV.bindPopup('<h2>H.Sociedad Alvarado</h2>').openPopup();
	S_ALV.addTo(mapa);	
	
YB = L.marker([9.915848, -83.98126]);
	YB.bindTooltip("H.Yierba Buena").openTooltip();
	YB.bindPopup('<h2>H.Yierba Buena</h2>').openPopup();
	YB.addTo(mapa);	

BVi = L.marker([9.918632, -83.98342]);
	YB.bindTooltip("H.Bella Vista").openTooltip();
	YB.bindPopup('<h2>H.Bella Vista</h2>').openPopup();
	YB.addTo(mapa);

AFG = L.marker([9.924895, -83.97454]);
	AFG.bindTooltip("H.A y F. Gallardo").openTooltip();
	AFG.bindPopup('<h2>H.A y F. Gallardo</h2>').openPopup();
	AFG.addTo(mapa);

// Capa vectorial haciendas en formato GeoJSON
$.getJSON("https://johancordoba78.github.io/datos/img/Haciendas.geojson" , function(geodata) {
  var haciendas = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#212F3D ", 'weight': 2.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Nombre</strong>: " + feature.properties.nombre + "<br>"  + "<img src>:" + feature.properties.img ;
      layer.bindPopup(popupText);
    }, 
	pointToLayer: function(getJsonPoint, latlng) {
        return L.marker(latlng, {icon: iconoSitio});
	}	
  }).addTo(mapa);

  control_capas.addOverlay(haciendas, 'Haciendas');
 });   

// capa_raster_overlay
// capa_raster_overlay
var MDE = L.imageOverlay ("https://johancordoba78.github.io/datos/MDE_johan_PNG_cut_0_1_1.png",
	[[9.9504976377508640, -84.0524965229515573], 
	[9.8759608172491333, -83.9476379210484538]], 
	{opacity:1.0}
).addTo(mapa);

control_capas.addOverlay(MDE, 'Relieve');

function updateOpacityradia() {
  document.getElementById("span-opacity").innerHTML = document.getElementById("sld-opacity").value;
  MDE.setOpacity(document.getElementById("sld-opacity").value);
}


// capa_raster_overlay
// capa_raster_overlay
var COBER = L.imageOverlay ("https://johancordoba78.github.io/datos/cobertura_johan_PNG_cut_0_1_1.png",
	[[9.9505162720796498, -84.0524935086657479], 
	[9.8759421829203493, -83.9476202018719988]], 
	{opacity:1.0}
).addTo(mapa);

control_capas.addOverlay(COBER, 'Cobertura');

function updateOpacityradia() {
  document.getElementById("span-opacity").innerHTML = document.getElementById("sld-opacity").value;
  COBER.setOpacity(document.getElementById("sld-opacity").value);
}


// Capa de coropletas de distritos_boletos 
$.getJSON('https://johancordoba78.github.io/datos/distritos_b.geojson', function (geojson) {
  var distritos = L.choropleth(geojson, {
	  valueProperty: 'id_distritos',
	  scale: ['yellow', 'brown'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 0.7
	  },
	  onEachFeature: function (feature, layer) {
	    layer.bindPopup('Distritos:' + feature.properties.nombre + '<br>'  )
	  }
  }).addTo(mapa);
  control_capas.addOverlay(distritos, 'Distritos_haciendas');	

  

 // Leyenda de la capa de coropletas
 var leyenda = L.control({ position: 'bottomleft' })
  leyenda.onAdd = function (mapa) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = distritos.options.limits
    var colors = distritos.options.colors
    var labels = []

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  leyenda.addTo(mapa)
});