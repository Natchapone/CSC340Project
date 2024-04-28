document.addEventListener('DOMContentLoaded', function(){
    getFlaggedEvents();
    getFlaggedComments();

    function getFlaggedEvents(){
        const flaggedEventsUrl= "/SpartanEvent/Admin/flaggedEvents";
        fetch (flaggedEventsUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then (response => {
            if (!response.ok){
                throw new Error ('Response not ok');
            }
            return response.json();
        })
        .then (data => {
            displayFlaggedEvents (data);
            addEventListenersEvents();
        })
        .catch (error => console.error('Could not get events', error));
    }

    function displayFlaggedEvents (flaggedEvents){
        const eventListContainer = document.getElementById('eventListContainer');
        if(flaggedEvents.length === 0){
            eventListContainer.textContent='NO FLAGGED EVENTS';
        }
        flaggedEvents.forEach(flaggedEvent => {
            const eventContainer = document.createElement('div');
            eventContainer.classList.add('eventDescription2');
            const eventContent = document.createElement('p');
            const breakLine =document.createElement('br');
            const eventTitle = document.createTextNode(`${flaggedEvent.title}`);
            const eventLink = document.createElement('a');
            eventLink.href=`adminEvent.html?eventid=${flaggedEvent.eventId}`;
            eventLink.textContent='GO TO EVENT';
            const unflagButton = document.createElement ('button');
            unflagButton.classList.add('btnUnflagEvent');
            unflagButton.textContent= 'UNFLAG';
            unflagButton.setAttribute('eventId', flaggedEvent.eventId);
            eventContent.appendChild(eventTitle);
            eventContent.appendChild(breakLine);
            eventContent.appendChild(eventLink);
            eventContent.appendChild(unflagButton);
            eventContainer.appendChild(eventContent);
            eventListContainer.appendChild(eventContainer);
        });
    }    

    function addEventListenersEvents(){
        const unflagEventButtons = document.querySelectorAll(".btnUnflagEvent");
        unflagEventButtons.forEach(unflagEvent =>{
            unflagEvent.addEventListener('click', function(){
                const eventId = unflagEvent.getAttribute('eventId');
                unflagEvents(eventId);
            });
        });
    }

    function unflagEvents (eventId){
        const reqBody = {
            eventId: eventId,
        }
        const eventAPI = '/SpartanEvent//Admin/unflagEvent';

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
        location.reload();
    }



    function getFlaggedComments() {

    }
});