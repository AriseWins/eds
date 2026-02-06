export default function decorate(block) {
  const divChildrens = block.children;

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('container');
  cardsContainer.innerHTML = '<div class="cards-grid"></div>';

  [...divChildrens].forEach((element) => {
    const cardImagePath = element.children[0].querySelector('img').src;
    const cardTitleText = element.children[1].querySelector('h3').textContent.trim();
    const cardDetailsText = element.children[1].querySelector('p').textContent.trim();
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
            <div class="card-image">
                <img src="${cardImagePath}" alt="Card Image">
            </div>
            <div class="card-content">
                <h2 class="card-title">${cardTitleText}</h2>
                <p class="card-details">${cardDetailsText}</p>
            </div>
        `;
    cardsContainer.querySelector('.cards-grid').appendChild(card);
  });

  block.replaceChildren(cardsContainer);
}
