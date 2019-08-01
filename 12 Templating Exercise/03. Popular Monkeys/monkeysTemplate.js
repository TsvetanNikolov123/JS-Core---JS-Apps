$(() => {
    const template = document.querySelector('#monkey-template').innerHTML;
    const compiled = Handlebars.compile(template);
    const rendered = compiled({monkeys: monkeys});

    document.querySelector('.monkeys').innerHTML = rendered;


    function handleDetails({target}) {
        const details = target.parentNode.querySelector('p');
        details.style.display = details.style.display ? '' : 'none';
    }

    document.querySelector('.monkeys')
        .addEventListener('click', ({target}) => {
            // if (target.classList.contains('showBtn')) {
            if (target.nodeName === 'BUTTON') {
                console.log('asd');
                handleDetails({target});
            }
        });
});