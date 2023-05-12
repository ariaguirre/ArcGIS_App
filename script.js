const submitBtn = document.getElementById("submitBtn")
const resetBtn = document.getElementById("resetBtn");
const form = document.querySelector('form');

resetBtn.addEventListener('click', function() {
    form.reset();
    console.log("form:", form)
});

require([
    "esri/config","esri/Map", "esri/views/MapView", "esri/Graphic","esri/layers/GraphicsLayer", "esri/layers/FeatureLayer", "esri/PopupTemplate"], function(esriConfig,Map, MapView, Graphic, GraphicsLayer, FeatureLayer,PopupTemplate) {

    esriConfig.apiKey = "AAPK5c4057f6254f47a8a1d70e67fa7d3e3ciHxO76UsQKm3ksmdEBxSn6EtZ-X_X-oxrfrS023GVLhwOB8R3ZBhQm86-WYc1qPt";

    const map = new Map({
      basemap: "arcgis-topographic" 
    });

    const view = new MapView({
      map: map,
      center: [-58.450, -34.600], 
      zoom: 11, 
      container: "viewDiv"
    });


    submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    let description = document.getElementById("description").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;
    const coordinates = document.getElementById("coordinates").value.split(",");
    const longitude = parseFloat(coordinates[0]);
    const latitude = parseFloat(coordinates[1]);
    let category = document.getElementById("category").value;

   
    const point = { 
       type: "point",
       longitude: longitude,
       latitude: latitude,
       attributes: {
         Descripcion: description,
         Direccion: address,
         Telefono: phone,
         Categoria: category
       }
    };
    // console.log("point:", point)
    const simpleMarkerSymbol = {
       type: "simple-marker",
       color: [226, 119, 40],  
       outline: {
           color: [255, 255, 255], 
           width: 1
       }
    };

    const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
    });
        graphicsLayer.add(pointGraphic);
        console.log("pointGraphic:", pointGraphic);


    const newPopup = {
        "title": "Información",
        "content": [{
            "Descripcion: ": point.attributes.Descripcion,
            "Dirección: ": point.attributes.Direccion,
            "Teléfono: ": point.attributes.Telefono,
            "Categoría: ": point.attributes.Categoria,
            "Longitud: ": point.longitude,
            "Latitud: ": point.latitude,
        }]
      }

    const pointPopup = new FeatureLayer({
        url: "http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/origins/FeatureServer/0",
        outFields: ["*"],
        popupTemplate: newPopup
      });
      console.log("newPopup:", newPopup)
      console.log("point:", point)
      map.add(pointPopup);

});
});

