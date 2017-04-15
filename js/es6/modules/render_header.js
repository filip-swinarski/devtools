/* render_header.js, v. 0.1.0, 15.04.2017, @ filip-swinarski */

var renderHeader = (container, expanded) => {
   
    let header = document.createElement('div');
    let toggleBtn = document.createElement('span');
    let title = container.id;
   
    header.id = `${parent.id}_header`;
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
       
        let children = [].filter.call(container.children, el => el.id !== `${parent.id}_header`);
       
        toggleBtn.classList.toggle(`${container.classList[0]}__toggle--expanded`);
        toggleBtn.classList.toggle(`${container.classList[0]}__toggle--collapsed`);
        children.forEach(el => {
            el.classList.toggle(`${el.classList[0]}--expanded`);
            el.classList.toggle(`${el.classList[0]}--collapsed`);
        });
    }, false);
};

export {renderHeader};
