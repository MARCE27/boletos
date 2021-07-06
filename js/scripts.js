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