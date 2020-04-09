import React from 'react';

export const ReadmeModal = () => {

  const styles = require('./ReadmeModal.scss');

  return (

    <div className={`app-modal modal fade ${styles.graySixteen}`} id="ReadmeModal" tabIndex="-1" role="dialog" aria-labelledby="appModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className={`modal-header d-flex flex-items-center flex-justify-between px-2 ${styles.ghostWhite}`}>

            <h5 className="modal-title pr-3" id="appModalLabel">
              <svg aria-hidden="true" className="octicon octicon-book svg-padding-right" height="22" version="1.1" viewBox="0 1 16 16" width="22">
                  <path d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z" fillRule="evenodd">
                  </path>
              </svg>
              README.js
            </h5>

            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">

            <div>
                <div>
                    <article>

                        <h2>
                          App 2020
                        </h2>

                        <hr/>

                        {/* ------------------------------ */}

                        <h3>
                          About
                        </h3>

                        <hr className={`${styles.hrStyle}`} />

                        <p>
                          A meeting place for the 2020 Primary! Cast your vote of opinion and discuss what's going on. Well, it was at first. Currently, the app is an evolving JS playground.
                        </p>

                        <pre className="pre-style" >
{`{
  rss: 60088320,
  heapTotal: 37453824,
  heapUsed: 24303632,
  external: 1215378
}`}
                        </pre>

                        <p>
                          Node.js memory usage for app post-build <span className="pre-style-inline font-courier">process.memoryUsage()</span> (measured in bytes).
                        </p>

                        <pre className="pre-style" >
{`{
  rss: 230256640,
  heapTotal: 174202880,
  heapUsed: 111070600,
  external: 4275037
}`}
                        </pre>

                        <p>
                          Post-build <span className="pre-style-inline font-courier">process.memoryUsage().heapUsed</span> is.
                        </p>
                        
                        <h4>
                          Features (no particular order)
                        </h4>

                        <ul>
                          <li>
                            Babel ES+ transpiling (use future JavaScript today!)
                          </li>
                        </ul>

                        {/* ------------------------------ */}

                        <h3>
                          Installation
                        </h3>

                        <hr className={`${styles.hrStyle}`} />

                        <h4>
                          Development
                        </h4>

                        <pre className="pre-style" >
                          git clone the app
                          <br />
                          cd into the app
                          <br />
                          yarn dlls
                          <br />
                          yarn dev
                          <br />
                          http://localhost:3000
                        </pre>

                        <h4>
                          Production
                        </h4>

                        <pre className="pre-style" >
                          git clone the app
                          <br />
                          cd into the app
                          <br />
                          yarn prod
                          <br />
                          https://localhost:8080
                        </pre>

                        {/* ------------------------------ */}

                        <h3>
                          Features To Observe
                        </h3>

                        <hr className={`${styles.hrStyle}`} />

                        <ul>
                          <li>
                            View source in the browser to see App's store/state (window.__PRELOADED)
                          </li>
                        </ul>

                        {/* ------------------------------ */}

                        <h3>
                          To Do List
                        </h3>

                        <hr className={`${styles.hrStyle}`} />

                        <ol>
                          <li>
                            Iterate over and keep learning/refining usage of <a href="https://github.com/ReactTraining/react-router" rel="nofollow">React Router</a> components
                          </li>
                        </ol>
                    </article>
                </div>
            </div>

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
          </div>

        </div>
      </div>
    </div>
  );
};
