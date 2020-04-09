import React from 'react';

export const FontsModal = props => {

  const { styles } = props;

  return (

    <div className="app-modal modal fade fontsModal" tabIndex="-1" role="dialog" aria-labelledby="appModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="appModalLabel">Fonts Modal!</h5>
            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">

            <p className={styles.sharedVarColorRutgersScarletXX}>This paragraph's font and the above modal-title's font is using Bootstrap's default font. It is the default 'global' font for this app. It is overriding Bootstrap's default font 'font-family-sans-serif'. It's a hard to read font but easily recognizable for development purposes.</p>

            <p className={styles.specialAppFontColor}>This paragraph's '@font-face' is 'Old English'.</p>

            <p className="font-roboto-mono-V4-latin-regular">This paragraph's '@font-face' is 'roboto-mono-v4-latin-regular'.</p>

            <p className="font-montserratlight color-salmon">This paragraph's '@font-face' is 'font-montserratlight'.</p>

            <p className="font-lobster-v20-latin-regular">This paragraph's '@font-face' is 'lobster-v20-latin-regular'.</p>

            <p className="font-norwester">This paragraph's '@font-face' is 'norwester'.</p>

            <p className="color-crimson open-sans-italic-webfont">This paragraph's '@font-face' is 'OpenSans-Italic-webfont'.</p>

            <p className="font-philosopher-bold-webfont">This paragraph's '@font-face' is 'font-philosopher-bold-webfont'.</p>

            <p className="font-sourcesanspro-regular-webfont">This paragraph's '@font-face' is 'sourcesanspro-regular-webfont'.</p>

            <p className={`color-springgreen ${styles.montserratLightFontGlobalToLocal}`}>This paragraph's '@font-face' is 'MontserratLight'. It is scoped Global to Local.</p>

            <p className="color-orangered font-opensans-bold-webfont">This paragraph's '@font-face' is 'OpenSans-Bold-webfont' It is scoped Global.</p>

            <p className={styles.colorOrchidCssLocal}>This paragraph's color is 'colorOrchidCssLocal'. It is scoped Local from 'AppCss1.css'.</p>

            <p className={styles.coloredText2Local}>This paragraph's color is 'coloredText2Local'. It is scoped Local from 'AppScss2.scss'.</p>

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
          </div>

        </div>
      </div>
    </div>
  );
};
