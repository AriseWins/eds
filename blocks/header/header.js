import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  const [headerLinks, logoImg, bottomLineImage] = fragment.children[0].children[0].children;
  const currentPath = window.location.pathname;
  const headerBottomLine = document.createElement('div');
  headerBottomLine.classList.add('header-bottom-line');
  headerBottomLine.style.backgroundImage = `url(${bottomLineImage.querySelector('img').src})`;

  // Create main nav container
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('main-nav');
  const navItem = document.createElement('div');
  navItem.classList.add('container');
  navItem.innerHTML = `<div class="nav-wrapper"></div>`;
  mainNavContainer.appendChild(navItem);

    // Create nav links container
  const navLinkContainer = document.createElement('div');
  navLinkContainer.classList.add('nav-links-wrapper');

  // // Process logo (first child)
  const logoPath = logoImg.querySelector('img').src;
  const logo = document.createElement('div');
  logo.classList.add('logo');
  logo.innerHTML = `<a href="/"><img src="${logoPath}" alt="Logo"></a>`;
  navItem.querySelector('.nav-wrapper').appendChild(logo);

  navItem.querySelector('.nav-wrapper').appendChild(navLinkContainer);

  [...headerLinks.children].forEach((link, index) => {
    const navLink = document.createElement('div');
    navLink.classList.add('nav-link');
    if(index === 0) {
        navLink.innerHTML = `<a href="/">${link.textContent}</a>`;
    }
    else {
      navLink.innerHTML = `<a href="/${link.textContent.replaceAll(' ', '')}">${link.textContent}</a>`;
    }
    navItem.querySelector('.nav-links-wrapper').appendChild(navLink);
  })


  // // Add active link class based on current path
  const navLinks = navItem.querySelectorAll('.nav-link a');
  navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
          link.classList.add('active-link');
      }
  });




  mainNavContainer.append(headerBottomLine);
  block.append(mainNavContainer);
}
