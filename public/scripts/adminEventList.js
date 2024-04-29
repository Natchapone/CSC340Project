document.addEventListener('DOMContentLoaded', function(){
    getFlaggedEvents();
    getFlaggedComments();
    getAllEvents();

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
        const eventAPI = '/SpartanEvent/Admin/unflagEvent';

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
        const flaggedCommentsUrl= "/SpartanEvent/Admin/flaggedComments";
        fetch (flaggedCommentsUrl, {
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
            displayFlaggedComments (data);
            addEventListenersComments();
        })
        .catch (error => console.error('Could not get comments', error));
    }

    function displayFlaggedComments (flaggedComments){
        console.log(flaggedComments);
        const commentListContainer = document.getElementById('commentListContainer');
        if(flaggedComments.length === 0){
            commentListContainer.textContent='NO FLAGGED COMMENTS';
        }
        flaggedComments.forEach(flaggedComment => {
            const eventContainer = document.createElement('div');
            eventContainer.classList.add('eventDescription2');
            const eventContent = document.createElement('p');
            const breakLine =document.createElement('br');
            const eventUserName = document.createTextNode(`${flaggedComment.userName}`);
            const eventLink = document.createElement('a');
            eventLink.href=`adminEvent.html?eventid=${flaggedComment.eventId}`;
            eventLink.textContent='GO TO EVENT';
            const unflagButton = document.createElement ('button');
            unflagButton.classList.add('btnUnflagComment');
            unflagButton.textContent= 'UNFLAG';
            unflagButton.setAttribute('commentId', flaggedComment.commentId);
            eventContent.appendChild(eventUserName);
            eventContent.appendChild(breakLine);
            eventContent.appendChild(eventLink);
            eventContent.appendChild(unflagButton);
            eventContainer.appendChild(eventContent);
            commentListContainer.appendChild(eventContainer);
        });
    }

    function addEventListenersComments(){
        const unflagCommentButtons = document.querySelectorAll(".btnUnflagComment");
        unflagCommentButtons.forEach(unflagComment =>{
            unflagComment.addEventListener('click', function(){
                const commentId = unflagComment.getAttribute('commentId');
                unflagComments(commentId);
            });
        });
    }

    function unflagComments(commentId){
        const reqBody = {
            commentId: commentId,
        }
        const eventAPI = '/SpartanEvent//Admin/unflagComment';

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
        location.reload();
    }

    function getAllEvents (){
        const eventsUrl= "/SpartanEvent/event";
        fetch (eventsUrl, {
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
            displayAllEvents (data);
        })
        .catch (error => console.error('Could not get comments', error));
    }

    function displayAllEvents (events){
        const allEventListContainer = document.getElementById('allEventsListContainer');
        if(events.length === 0){
            allEventListContainer.textContent='NO EVENTS';
        }
        events.forEach(event => {
            const eventContainer = document.createElement('div');
            eventContainer.classList.add('eventDescription2');
            const eventContent = document.createElement('p');
            const breakLine =document.createElement('br');
            const eventTitle = document.createTextNode(`${event.title}`);
            const eventLink = document.createElement('a');
            eventLink.href=`adminEvent.html?eventid=${event.eventId}`;
            eventLink.textContent='GO TO EVENT';
            eventContent.appendChild(eventTitle);
            eventContent.appendChild(breakLine);
            eventContent.appendChild(eventLink);
            eventContainer.appendChild(eventContent);
            allEventListContainer.appendChild(eventContainer);
        });
    }
});