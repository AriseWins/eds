import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  const footerMain = document.querySelector('footer > .footer');

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
  block.appendChild(document.createElement('span')).classList.add('footer-decorative-element');

  // -------------------------------
  const divChildrens = block.children[0].children[0].querySelector('ol').children;
  const footerBgImage = block.children[0].children[0].querySelector('ol+p').querySelector('img').src;
  document.querySelector('footer > .footer').style.backgroundImage = `url(${footerBgImage})`;

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('container');
  footerContainer.innerHTML = '<div class="footer-grid"></div>';

  // // Footer Links Section  (FLS) ----------------------------------------------------------------
  const footerLinksSectionWrapper = document.createElement('div');
  footerLinksSectionWrapper.classList.add('footer-links-section-wrapper');

  // Function to generate each link section column Dynamically for (FLS)
  const footerLinksSectionGenerator = (linkSection) => {
    const footerLinksSectionColumn = document.createElement('div');
    footerLinksSectionColumn.classList.add('footer-links-section-column');

    const footerLinkSectionTitleText = document.createElement('h3');
    footerLinkSectionTitleText.classList.add('footer-link-section-title-text');
    footerLinkSectionTitleText.textContent = linkSection[0].textContent.trim();
    footerLinksSectionColumn.append(footerLinkSectionTitleText);

    // // Process links in the section
    [...linkSection].forEach((element, index) => {
      if (index === 0) return; // Skip the first element for newsletter and copyright section

      const div = document.createElement('div');
      div.classList.add('footer-link');
      const linkText = element.textContent.trim();
      const linkHrefValue = element.querySelector('a').getAttribute('href');
      div.innerHTML = `<a href="${linkHrefValue}">${linkText}</a>`;
      footerLinksSectionColumn.append(div);
    });
    return footerLinksSectionColumn;
  };

  footerLinksSectionWrapper.append(footerLinksSectionGenerator(divChildrens[0].querySelector('ol').children));
  footerLinksSectionWrapper.append(footerLinksSectionGenerator(divChildrens[1].querySelector('ol').children));
  footerContainer.querySelector('.footer-grid').appendChild(footerLinksSectionWrapper);

  // //NewsLetter and Copyright Section ----------------------------------------------------------
  const footerNewsLetter = document.createElement('div');
  footerNewsLetter.classList.add('footer-newsletter-section');
  footerNewsLetter.innerHTML = `<div class="newsletter-content">
        <h3 class="newsletter-title">${divChildrens[2].querySelector('ol').children[0].textContent.trim()}</h3>
        <p class="newsletter-description">${divChildrens[2].querySelector('ol').children[1].textContent.trim()}</p>
        <form>
            <input type="email" placeholder="Enter your email">
            <button type="submit" class="primary-btn">${divChildrens[2].querySelector('ol').children[2].textContent.trim()}</button>
        </form>
        <p class="copyright-text">${divChildrens[2].querySelector('ol').children[3].textContent.trim()}</p>
    </div>`;

  footerContainer.querySelector('.footer-grid').appendChild(footerNewsLetter);
  footerMain.innerHTML = '';
  footerMain.appendChild(footerContainer);
}
