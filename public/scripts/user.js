document.addEventListener('DOMContentLoaded', function(){
    const flagEventButtons = document.querySelectorAll(".flagEvent");
    flagEventButtons.forEach(flagEvent =>{
        flagEvent.addEventListener('click', function(){
            console.log(this.getAttribute('eventid'));
            const eventId = this.getAttribute('eventid');
            const reqBody = {
                eventId: eventId,
            }
            const eventAPI = '/SpartanEvent/user/event/flag';

            fetch (eventAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            })
                .then(response=> {
                    if (!response.ok){
                        throw new Error ('Response not ok');
                    }
                    return response.json();
                })
                .then (data =>{
                })
                .catch (error => console.error('Couldnt flag event',error));
        });
        
    });

    const flagCommentButtons = document.querySelectorAll(".flagComment");
    flagCommentButtons.forEach(flagComment =>{
        flagComment.addEventListener('click', function(){
            console.log(this.getAttribute('commentid'));
            const commentId = this.getAttribute('commentid');
            const reqBody = {
                commentId: commentId,
            }
            const eventAPI = '/SpartanEvent/user/comment/flag';

            fetch (eventAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            })
                .then(response=> {
                    if (!response.ok){
                        throw new Error ('Response not ok');
                    }
                    return response.json();
                })
                .then (data =>{
                })
                .catch (error => console.error('Couldnt flag comment',error));
        });
        
    });

    const showMapButtons = document.querySelectorAll(".showMap");
    showMapButtons.forEach(button => {
        button.addEventListener('click', function () {
            const locationString = this.getAttribute('location');
            const mapDiv = this.nextElementSibling; 
            toggleMap(mapDiv, locationString);
        });
    });


});

function toggleMap(mapDiv, locationString) {
    if (mapDiv.classList.contains('hiddenMap')) {
        mapDiv.classList.remove('hiddenMap');
        mapDiv.classList.add('shownMap');
        if (!mapDiv.initialized) {
            loadMap(mapDiv, locationString);
            mapDiv.initialized = true;
        }
    } else {
        mapDiv.classList.add('hiddenMap');
        mapDiv.classList.remove('shownMap');
    }
}

function loadMap(mapDiv, locationString) {
    const map = new google.maps.Map(mapDiv, {
        zoom: 15,
        center: { lat: -34.397, lng: 150.644 }
    });
    const request = {
        query: locationString,
        fields: ['name', 'geometry'],
    };
    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            console.error("Place not found: " + status);
        }
    });
}