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


});