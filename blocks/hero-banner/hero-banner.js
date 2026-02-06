export default function decorate(block) {
  const divChildrens = block.children;

  const titleText = divChildrens[0].querySelector('h2');
  const detailsText = divChildrens[0].querySelector('p');
  const imgPath = divChildrens[0].children[0].querySelector('img').src;
  const titlebottomBarText = divChildrens[1].querySelector('h3');

  const bannerContainerDiv = document.createElement('div');
  bannerContainerDiv.classList.add('container');
  const bannerContentDiv = document.createElement('div');
  bannerContentDiv.classList.add('banner-content');
  bannerContentDiv.append(titleText);
  bannerContentDiv.append(detailsText);

  bannerContainerDiv.append(bannerContentDiv);

  const bottomBarDiv = document.createElement('div');
  bottomBarDiv.classList.add('bottom-bar');
  bottomBarDiv.innerHTML = `
        <div class="container">
            <p>${titlebottomBarText.textContent}</p>
        </div>
    `;

  bannerContainerDiv.style.backgroundImage = `url(${imgPath})`;
  block.replaceChildren(bannerContainerDiv);
  block.append(bottomBarDiv);
}
