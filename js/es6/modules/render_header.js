/* render_header.js, v. 0.1.1, 19.09.2017, @ filip-swinarski */

const renderHeader = (container, expanded) => {
   
    const header = document.createElement('div');
    const toggleBtn = document.createElement('span');
    const title = container.id;
   
    header.id = `${container.id}_header`;
    header.classList.add(`${container.classList[0]}__header`);
    toggleBtn.classList.add(`${container.classList[0]}__toggle`);
    header.innerHTML = `<span class="${title}__title">${title}</span>`;
   
    if (expanded) {
        toggleBtn.classList.add(`${container.classList[0]}__toggle--expanded`);
    } else {
        toggleBtn.classList.add(`${container.classList[0]}__toggle--collapsed`);
    }
   
    header.appendChild(toggleBtn);
    container.appendChild(header);
   
    header.addEventListener('click', (e) => {
       
        const children = [].filter.call(container.children, el => el.id !== `${parent.id}_header`);
       
        toggleBtn.classList.toggle(`${container.classList[0]}__toggle--expanded`);
        toggleBtn.classList.toggle(`${container.classList[0]}__toggle--collapsed`);
        children.forEach(el => {
            el.classList.toggle(`${el.classList[0]}--expanded`);
            el.classList.toggle(`${el.classList[0]}--collapsed`);
        });
    }, false);
};

export {renderHeader};
