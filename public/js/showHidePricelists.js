var pricelistLinks = document.getElementsByClassName('pricelist-link'),
    pricelistContainers = document.getElementsByClassName('pricelist-container');

pricelistLinks[0].classList.add('active');

for(var i = 0, len = pricelistContainers.length; i < len; i++) {
    pricelistContainers[i].style.display = 'none';
}

pricelistContainers[0].style.display = 'block';

function onClickMakeLinkActive(event) {
    var clickedElement = event.srcElement;
    for(var i = 0, len = pricelistLinks.length; i < len; i++) {
        pricelistLinks[i].classList.remove('active');
    }

    clickedElement.classList.add('active');
    var elementId = clickedElement.id;
    var containerId = elementId.replace('link', 'container');

    showActiveContainer(containerId);
}

function showActiveContainer(id) {
    for(var i = 0, len = pricelistContainers.length; i < len; i++) {
        pricelistContainers[i].style.display = 'none';
    }

    document.getElementById(id).style.display = 'block';
}

for(var i = 0, len = pricelistLinks.length; i < len; i++) {
    pricelistLinks[i].addEventListener('click', function (ev) {
            onClickMakeLinkActive(ev);
        });
}