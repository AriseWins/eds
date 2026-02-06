export default function decorate(block) {
  const divChildrens = Array.from(block.children);
  const container = document.createElement('div');
  container.classList.add('container');

  // Create blogs wrapper (Container for whole blogs section)
  const blogsWrapper = document.createElement('div');
  blogsWrapper.classList.add('blogs-grid');
  container.appendChild(blogsWrapper);

  // Create blogs text container (For title and description)  -- Left side Content ----------
  const blogsTextContainer = document.createElement('div');
  blogsTextContainer.classList.add('blogs-text-container');
  blogsWrapper.appendChild(blogsTextContainer);

  const blogsGenerator = (blogCardData) => {
    const [title, date, description, link] = blogCardData.querySelector('ol li > ol ').children;
    return `
            <div class="blog-card">
            <div class="blog-header">
                <h3 class="blog-title">${title.textContent.trim()}</h3>
                <span class="blog-date">${date.textContent.trim()}</span>
            </div>
            <div class="blog-body">
                <p class="blog-description">${description.textContent.trim()}</p>
                 <a href="${link.children[0].getAttribute('href')}" class="blog-card-link">${link.textContent.trim()}</a>
            </div>
        </div>
    `;
  };

  const blogPageTitle = divChildrens[0].querySelector('h2');
  blogsTextContainer.appendChild(blogPageTitle);

  blogsTextContainer.insertAdjacentHTML('beforeend', blogsGenerator(divChildrens[1]));
  blogsTextContainer.insertAdjacentHTML('beforeend', blogsGenerator(divChildrens[2]));
  blogsTextContainer.insertAdjacentHTML('beforeend', blogsGenerator(divChildrens[3]));
  blogsTextContainer.insertAdjacentHTML('beforeend', blogsGenerator(divChildrens[4]));

  //     // Create blogs Image container (For image)  -- Right side Content  -------------------
  const blogsImageContainer = document.createElement('div');
  blogsImageContainer.classList.add('blogs-image-container');
  blogsWrapper.appendChild(blogsImageContainer);

  const blogsImageGenerator = (blogCardData) => `
                  <div class="blog-image-card">
                      <img src="${blogCardData.querySelector('img').src}" alt="Blog Image">
                  </div>
                  `;
  blogsImageContainer.insertAdjacentHTML('beforeend', blogsImageGenerator(divChildrens[5].children[0]));
  blogsImageContainer.insertAdjacentHTML('beforeend', blogsImageGenerator(divChildrens[5].children[1]));

  const imageCardVar = `
          <div class="blog-image-card-var2" style="background-image: url(${divChildrens[5].children[2].querySelector('img').src})">
              <h3 class="blog-image-card-var2-title">${divChildrens[5].children[2].children[1].textContent.trim()}</h3>
              <button type="button" class="primary-btn">${divChildrens[5].children[2].children[2].textContent.trim()}</button>
          </div>

      `;

  blogsImageContainer.insertAdjacentHTML('beforeend', imageCardVar);

  block.replaceChildren(container);
}
