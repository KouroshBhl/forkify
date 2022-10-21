import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  addHandlerRender(handler) {
    ['hashchange', 'load'].map(ev => window.addEventListener(ev, handler));
  }

  render(data) {
    this._data = data;
    // this.loadingSpinner();
    this._clear();
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
