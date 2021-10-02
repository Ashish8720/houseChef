// parsing the information mapinfo come form show page
const data = JSON.parse(map_info)

mapboxgl.accessToken = mytoken;
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center:  data.geometry.coordinates, // starting position [lng, lat]
zoom: 11 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

// use for showing marker
new mapboxgl.Marker()
    .setLngLat(data.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset : 25})
    .setHTML(`<h6>${data.location}</h6>`)
    )
    .addTo(map);