import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.errorMessage();

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.errorMessage();

    this._data = data;
    const markup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(markup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      //? Updates change TEXT
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }

      //? Updates change Attribute
      if (!newEl.isEqualNode(currEl)) {
        console.log(newEl.attributes);
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  //! Loading spinner function
  loadingSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
  `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  errorMessage(message = this._errorText) {
    const markup = `
           <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
           </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  successMessage(message = this._successText) {
    const markup = `
    <div class="message">
     <div>
       <svg>
         <use href="${icons}#icon-smile"></use>
       </svg>
     </div>
     <p>${message}</p>
    </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
