// we put contacts it in curly brackets to get object who has property contacts!!!
// console.log(cardsListFunc({contacts}));

(async function () {
    const {getTemplateFunc, registerPartial} = window.templates;

    await registerPartial('card', 'card');

    const cardsListFunction = await getTemplateFunc('cards-list');

    document.getElementById('contacts').innerHTML = cardsListFunction({contacts});

    const getCardParent = (element) => {
        const className = 'contact';
        let node = element.parentNode;
        while (node != null) {
            if (node.classList.contains(className)) {
                return node;
            }
            node = node.parentNode;
        }

        return node;
    };

    const handleDetails = ({target}) => {
        const card = getCardParent(target);
        const details = card.querySelector('.details');
        details.style.display = details.style.display
            ? ''
            : 'none';
    };


    document.getElementById('contacts')
        .addEventListener('click', ({target}) => {
            if (target.classList.contains('detailsBtn')) {
                handleDetails({target});
            }
        })
}());