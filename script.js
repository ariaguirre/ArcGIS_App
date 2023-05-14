const submitBtn = document.getElementById("submitBtn")
const resetBtn = document.getElementById("resetBtn");
const form = document.querySelector('form');

resetBtn.addEventListener('click', function() {
    form.reset();
    console.log("form:", form)
});

require([
    "esri/config","esri/Map", "esri/views/MapView", "esri/Graphic","esri/layers/GraphicsLayer", "esri/PopupTemplate", "esri/widgets/Popup", "esri/popup/FieldInfo", "esri/widgets/Search"], function(esriConfig,Map, MapView, Graphic, GraphicsLayer,PopupTemplate, Popup, FieldInfo, Search) {

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

    const searchWidget = new Search({
      view: view
    });
    
    view.ui.add(searchWidget,{
      position: 'top-right',
      index: 2
    })

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
         Coordenadas: coordinates,
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

    let pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol,
        attributes: point.attributes,
        popupTemplate:{
          title: point.attributes.Descripcion,
          content:[{
            type: "fields", 
            fieldInfos: [{
              fieldName: "Direccion"
            },
          {
            fieldName: "Telefono"
          },
          {
            fieldName: "Coordenadas"
          }, 
          {
            fieldName: "Categoria"
          }
          ]
          }]}
    });
        view.graphics.add(pointGraphic);
        // console.log("pointGraphic:", pointGraphic);

});

});

