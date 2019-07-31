(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        const template = document.getElementById('cat-template').innerHTML;
        const compiled = Handlebars.compile(template);
        const rendered = compiled({
            cats: window.cats
        });

        document.getElementById('allCats').innerHTML = rendered;

        function handleDetails({target}) {
            const details = target.parentNode.querySelector('.status');
            details.style.display = details.style.display ? '' : 'none';
        }

        document.querySelector('#allCats')
            .addEventListener('click', ({target}) => {
                if (target.classList.contains('showBtn')) {
                    handleDetails({target});
                }
            });
    }
})();