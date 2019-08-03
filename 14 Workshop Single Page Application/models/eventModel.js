const eventModel = function () {

    const createEvent = function (params) {
        const data = {
            ...params,  // that will copy parameters from params
            peopleInterestedIn: 0,     // and if there is peopleInterestedIn it will rewrite it, if not it will create it -> by default it must be zero;
            organizer: JSON.parse(storage.getData('userInfo')).username
        };

        const url = `/appdata/${storage.appKey}/events`;
        const headers = {
            body: JSON.stringify(data),
            headers: {}
        };

        return requester.post(url, headers);
    };

    const getAllEvents = function () {
        const url = `/appdata/${storage.appKey}/events`;
        const headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const getEvent = function (id) {
        const url = `/appdata/${storage.appKey}/events/${id}`;
        const headers = {
            headers: {}
        };

        return requester.get(url, headers);

    };

    const editEvent = function (params) {
        const url = `/appdata/${storage.appKey}/events/${params.eventId}`;
        delete params.eventId;

        const headers = {
            body: JSON.stringify({...params}),
            headers: {}
        };

        return requester.put(url, headers);
    };

    const deleteEvent = function (id) {
        const url = `/appdata/${storage.appKey}/events/${id}`;
        const headers = {
            headers: {}
        };

        return requester.del(url, headers);
    };

    return {
        createEvent,
        getAllEvents,
        getEvent,
        editEvent,
        deleteEvent,
    }
}();