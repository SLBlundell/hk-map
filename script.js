function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
      mapId: "6db59a95d85c94f4",
      center: { lat: 22.295, lng: 114.169 },
      zoom: 14,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
  });

  map.data.loadGeoJson('locations.json', {idPropertyName: 'locationid'});

  map.data.setStyle((feature) => {
    return {
      icon: {
        url: `assets/${feature.getProperty('category')}_icon.svg`,
        scaledSize: new google.maps.Size(42, 42),
      },
    };
  });

  const infoWindow = new google.maps.InfoWindow({
    maxWidth: 500
  });

  map.data.addListener('click', (event) => {
    const category = event.feature.getProperty('category');
    const name = event.feature.getProperty('name');
    const description = event.feature.getProperty('description');
    const mapURL = event.feature.getProperty('mapURL');
    const position = event.feature.getGeometry().get();
    const content = `
      <h2>${name}</h2><p>${description}</p>
      <a href="${mapURL}">Google Maps</a>
      <p><img src="assets/marker_images/${name}.JPEG" onerror="this.onerror=null;this.src='https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png';"></p>
    `;

    infoWindow.setContent(content);
    infoWindow.setPosition(position);
    infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
    infoWindow.open(map);
  });


}

window.initMap = initMap;