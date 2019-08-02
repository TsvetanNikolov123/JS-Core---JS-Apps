const eventModel = function () {

    const createEvent = function (params) {
        const data = {
            ...params ,  // that will copy parameters from params
            peopleInterestedIn: 0,     // and if there is peopleInterestedIn it will rewrite it, if not it will create it -> by default it must be zero;
            organizer: JSON.parse(storage.getData('userInfo')).username
        };

        console.log(data);
    };

    return {
        createEvent
    }
}();