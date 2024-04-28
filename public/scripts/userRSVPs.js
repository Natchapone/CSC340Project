function deleteRSVP(userId, eventId) {
    if (confirm("Are you sure you want to delete this RSVP?")) {
        fetch(`/SpartanEvent/users/events/rsvp/${eventId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                eventId: eventId
            })
        }).then(response => {
            if (response.ok) {
                // Reload the page after successful deletion
                window.location.reload();
            } else {
                console.error("Failed to delete RSVP");
            }
        }).catch(error => {
            console.error("Error deleting RSVP:", error);
        });
    }
}
