/* render_header.js, v. 0.1.2, 25.09.2017, @ filip-swinarski */

const renderHeader = (container, expanded) => {
   
    const header = document.createElement('div');
    const toggleBtn = document.createElement('span');
    const title = container.id;
   
    header.id = `${container.id}_header`;
    header.classList.add(`${container.classList[0]}__header`);
    header.innerHTML = `<span class="${title}__title">${title}</span>`;
   
    if (expanded) {
        header.classList.add(`${container.classList[0]}__header--expanded`);
    } else {
        header.classList.add(`${container.classList[0]}__header--collapsed`);
    }
   
    container.appendChild(header);
   
    header.addEventListener('click', (e) => {
       
        const children = [].filter.call(container.children, el => el.id !== `${parent.id}__header`);
       
        children.forEach(el => {
            el.classList.toggle(`${el.classList[0]}--expanded`);
            el.classList.toggle(`${el.classList[0]}--collapsed`);
        });
    }, false);
};

export {renderHeader};
