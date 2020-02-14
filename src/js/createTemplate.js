function createTemplate(element, arr) {
  const { category, url, banners } = element;
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link
          rel="stylesheet"
          href="https://static.ripley.cl/css/app-3774ea3aa3.css"
        />
        <link
          rel="stylesheet"
          href="https://static.ripley.cl/css/fonts-74c23a94ed.css"
        />
        
        <!-------------------    INCLUIR (STYLES)    ------------------->
        <mini-site-styles>
          <link rel="stylesheet" href="css/ripley.css" />
        </mini-site-styles>
        <!-------------------    /INCLUIR (STYLES)    ------------------>
      </head>
      <body>
        <!-------------------    INCLUIR (HTML)    ------------------->
        <mini-site>
          <div id="ic" class="minisitio">
            <div class="ic19">
              <div class="container">
                <div class="row">
                  <div class="col-md-12 banners">
                    <picture>
                      <source
                        media="(min-width: 576px)"
                        srcset="./images/${banners.desktop}"
                        alt="${category}"
                      />
                      <img src="./images/${banners.mobile}" alt="${category}" />
                    </picture>
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="botones">
                    ${arr
                      .map(item => {
                        return `
                        <a
                          href="${item.url}"
                          title="${item.category}"
                          class="${category === item.category ? 'active' : ''}"
                        >
                          <p>${item.category}</p>
                          <span class="borde"></span>
                        </a>
                      `;
                      })
                      .join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mini-site>
        <!-------------------    /INCLUIR (HTML)    ------------------->
      </body>
    </html>
  `;
}

module.exports = createTemplate;
