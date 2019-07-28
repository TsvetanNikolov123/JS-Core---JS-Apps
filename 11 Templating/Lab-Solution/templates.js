(function (scope) {
    const templatesStringCache = {};

    const getTemplateString = async (name) => {
        if (!templatesStringCache[name]) {
            const path = `./templates/${name}-templates.hbs`;
            const response = await fetch(path);
            const templateString = await response.text();
            templatesStringCache[name] = templateString;
        }

        return templatesStringCache[name];
    };

    const getTemplateFunc = async (name) => {
        const templateString = await getTemplateString(name);
        return Handlebars.compile(templateString);
    };

    const registerPartial = async (partialName, templateName) => {
        const templateString = await getTemplateString(templateName);
        Handlebars.registerPartial(partialName, templateString);
    };

    scope.templates = {getTemplateFunc, registerPartial};
}(window));