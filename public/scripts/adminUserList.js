document.addEventListener('DOMContentLoaded', function(){
    getFlaggedUsers();
    getFlaggedOrganizers();

    function getFlaggedUsers (){
        const flaggedUsersUrl= "/SpartanEvent/Admin/flaggedUsers";
        fetch (flaggedUsersUrl, {
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
            displayFlaggedUsers (data);
            addEventListenersUsers();
        })
        .catch (error => console.error('Could not get users', error));
    }

    function displayFlaggedUsers (users){
        const userListContainer = document.getElementById('flaggedUsersContainer');
        if(users.length === 0){
            userListContainer.textContent='NO FLAGGED USERS';
        }
        users.forEach(user => {
            const userContainer = document.createElement('div');
            userContainer.classList.add('eventDescription2');
            const userContent = document.createElement('p');
            const userName = document.createTextNode(`${user.userName}`);
            const unflagButton = document.createElement ('button');
            unflagButton.classList.add('btnUnflagUser');
            unflagButton.textContent= 'UNFLAG';
            unflagButton.setAttribute('userId', user.userId);
            const deleteButton = document.createElement ('button');
            deleteButton.classList.add('btnDeleteUser');
            deleteButton.textContent= 'DELETE';
            deleteButton.setAttribute('userId', user.userId);
            userContent.appendChild(userName);
            userContent.appendChild(unflagButton);
            userContent.appendChild(deleteButton);
            userContainer.appendChild(userContent);
            userListContainer.appendChild(userContainer);
        });
    }

    function addEventListenersUsers (){
        const unflagUserButtons = document.querySelectorAll(".btnUnflagUser");
        unflagUserButtons.forEach(unflagUserButton =>{
            unflagUserButton.addEventListener('click', function(){
                const userId = unflagUserButton.getAttribute('userId');
                unflagUser(userId);
            });
        });
        const deleteUserButtons = document.querySelectorAll(".btnDeleteUser");
        deleteUserButtons.forEach(deleteUserButton =>{
            deleteUserButton.addEventListener('click', function(){
                const userId = deleteUserButton.getAttribute('userId');
                deleteUser(userId);
            });
        });
    }

    function unflagUser(userId){
        const reqBody = {
            userId: userId,
        }
        const userAPI = '/SpartanEvent/Admin/unflagUser';

        fetch (userAPI, {
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
        .catch (error => console.error('Couldnt unflag user',error));
        location.reload();
    }

    function deleteUser (userId){
        const reqBody = {
            userId: userId,
        }
        const userAPI = '/SpartanEvent/Admin/deleteUser';

        fetch (userAPI, {
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
            return response;
        })
        .then (data =>{
        })
        .catch (error => console.error('Couldnt delete user',error));
        location.reload();
    }

    function getFlaggedOrganizers(){
        const flaggedOrganizersUrl= "/SpartanEvent/Admin/flaggedOrganizers";
        fetch (flaggedOrganizersUrl, {
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
            displayFlaggedOrganizers (data);
            addEventListenersOrganizers();
        })
        .catch (error => console.error('Could not get organizers', error));
    }

    function displayFlaggedOrganizers (organizers){
        const organizersListContainer = document.getElementById('flaggedOrganizersContainer');
        if(organizers.length === 0){
            organizersListContainer.textContent='NO FLAGGED ORGANIZERS';
        }
        organizers.forEach(organizer => {
            const organizerContainer = document.createElement('div');
            organizerContainer.classList.add('eventDescription2');
            const organizerContent = document.createElement('p');
            const orgEmail = document.createTextNode(`${organizer.orgEmail}`);
            const unflagButton = document.createElement ('button');
            unflagButton.classList.add('btnUnflagOrganizer');
            unflagButton.textContent= 'UNFLAG';
            unflagButton.setAttribute('orgId', organizer.orgId);
            const deleteButton = document.createElement ('button');
            deleteButton.classList.add('btnDeleteOrganizer');
            deleteButton.textContent= 'DELETE';
            deleteButton.setAttribute('orgId', organizer.orgId);
            organizerContent.appendChild(orgEmail);
            organizerContent.appendChild(unflagButton);
            organizerContent.appendChild(deleteButton);
            organizerContainer.appendChild(organizerContent);
            organizersListContainer.appendChild(organizerContainer);
        });
    }

    function addEventListenersOrganizers (){
        const unflagOrganizerButtons = document.querySelectorAll(".btnUnflagOrganizer");
        unflagOrganizerButtons.forEach(unflagOrganizerButton =>{
            unflagOrganizerButton.addEventListener('click', function(){
                const orgId = unflagOrganizerButton.getAttribute('orgId');
                unflagOrganizer(orgId);
            });
        });
        const deleteOrganizerButtons = document.querySelectorAll(".btnDeleteOrganizer");
        deleteOrganizerButtons.forEach(deleteOrganizerButton =>{
            deleteOrganizerButton.addEventListener('click', function(){
                const orgId = deleteOrganizerButton.getAttribute('orgId');
                deleteOrganizer(orgId);
            });
        });
    }

    function unflagOrganizer (orgId){
        const reqBody = {
            orgId: orgId,
        }
        const organizerAPI = '/SpartanEvent/Admin/unflagOrganizer';

        fetch (organizerAPI, {
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
        .catch (error => console.error('Couldnt unflag organizer',error));
        location.reload();
    }

    function deleteOrganizer (orgId){
        const reqBody = {
            orgId: orgId,
        }
        const organizerAPI = '/SpartanEvent/Admin/deleteOrganizer';

        fetch (organizerAPI, {
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
            return response;
        })
        .then (data =>{
        })
        .catch (error => console.error('Couldnt delete organizer',error));
        location.reload();
    }
});