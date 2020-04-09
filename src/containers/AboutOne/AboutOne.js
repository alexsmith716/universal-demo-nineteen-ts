import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';

import { ClockHooksCustom } from '../../components';
import { ClockHooks } from '../../components';
// import { Todo } from '../../components';

import CatsForm from '../../components/widgets/CatsForm/CatsForm';
import Clock from '../../components/widgets/Clock/Clock';
import RandomBootstrapAlert from '../../components/widgets/RandomBootstrapAlert/RandomBootstrapAlert';
import FilterableTable from '../../components/FilterableTable/FilterableTable';
import TemperatureCalculator from '../../components/widgets/LiftingStateUp/TemperatureCalculator';
import CounterPreloaded from '../../components/widgets/Counter/CounterPreloaded';
import CounterMultireducer from '../../components/widgets/Counter/CounterMultireducer';

class AboutOne extends Component {

  render() {

    const styles = require('./scss/AboutOne.scss');

    const dropDownOptions = [
      'https://api.github.com/feeds',
      'https://api.github.com/emojis',
      'https://api.github.com/events',
      'https://api.github.com/gists/public',
      'https://api.github.com/gists/656565656565',
      '/json-data/product-categories-small.json',
      '/json-data/product-categories.json',
      '/json-data/product-categories-small.json',
      '/json-data/product-categories.json',
      '/json-data/product-categories-small.json',
      '/json-data/product-categories.json',
      '/json-data/product-categories-small.json',
      '/json-data/product-categories.json',
    ];

    const dropDownOptions2 = [
      'https://api.github.com/feeds',
      'https://api.github.com/emojis',
      'https://api.github.com/events',
      'https://api.github.com/gists/public',
      '/json-data/product-categories-small2.json',
      '/json-data/product-categories2.json',
    ];

    return (

      <div className="container">

        <Helmet title="About One" />

        <h1 className={styles.uniqueColor}>About One</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?</p>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Clock: state and lifecycle in a basic React component!
              </h2>

              <div className="card-body text-center text-break">

                <div className="card-title">

                  <RandomBootstrapAlert />

                  <p>With supporting text below as a natural lead-in to additional content.</p>

                  <a href="#" className="btn btn-primary">Go somewhere</a>

                </div>
              </div>

              <div className="card-footer text-muted text-center">

                <div className="d-flex justify-content-center">
                  <div className="bg-color-ivory width-400">
                    <div className="my-1 container-padding-border-radius-2 text-break">
                      <Clock />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Most Basic CounterPreloaded 1
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <div className="d-flex justify-content-center">
                      <div className="bg-color-ivory width-400">
                        <div className="my-1 container-padding-border-radius-2 text-break">

                          <CounterPreloaded/>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Spacing Test 1
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <div className="my-1 mx-1 p-1 container-padding-border-radius-2">

                      <div className="my-1 mx-1 bg-color-ivory container-padding-border-radius-1 text-break">
                        <div className="mb-2">
                          Lorem!!!!!! ipsum dolor sit amet, consectetur adipisicing elit. Sed voluptate nihil eum consectetur similique? Consectetur, quod, incidunt, harum nisi dolores delectus reprehenderit voluptatem perferendis dicta dolorem non blanditiis ex fugiat. Xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx!
                        </div>
                        <div className="d-flex justify-content-around">
                          <div className="px-md-5"><div className="p-3 border bg-light">Custom column padding</div></div>
                          <div className="px-md-5"><div className="p-3 border bg-light">Custom column padding</div></div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Spacing Test 2
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <div className="my-1 mx-1 bg-color-ivory container-padding-border-radius-2 text-break">

                      <div className="row mb-2">
                        <div className="col">
                          Xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx! Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 px-md-5 mb-lg-0 mb-md-0 mb-sm-2 mb-2">
                          <div className="p-3 border bg-light text-center">
                            Custom column padding
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 px-md-5">
                          <div className="p-3 border bg-light text-center">
                            Custom column padding
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Most Basic CounterPreloaded 2
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <div className="d-flex justify-content-center">
                      <div className="bg-color-ivory width-400">
                        <div className="my-1 container-padding-border-radius-2 text-break">
                          <CounterPreloaded/>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Most Basic CounterPreloaded 3
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <div className="d-flex justify-content-center">
                      <div className="bg-color-ivory width-400">
                        <div className="my-1 container-padding-border-radius-2 text-break">
                          <CounterPreloaded/>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Most Basic CounterMultireducer 'AboutOneMultireducer1'
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <div className="d-flex justify-content-center">
                      <div className="bg-color-ivory width-400">
                        <div className="my-1 container-padding-border-radius-2 text-break">
                          <CounterMultireducer multireducerKey="AboutOneMultireducer1" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Filterable Product Table 1
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <FilterableTable
                      multireducerKey='AboutOneMultireducerFilterableTable1'
                      optionsArray={dropDownOptions} 
                      description='Filterable Product Table 1'
                    />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Filterable Product Table 2
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <FilterableTable
                      multireducerKey='AboutOneMultireducerFilterableTable2'
                      optionsArray={dropDownOptions2} 
                      description='Filterable Product Table 2'
                    />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Dynamic, Controlled Form 3
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Cats Form
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <CatsForm />
 
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Dynamic, Controlled Form 1
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Cats Form
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <CatsForm />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Dynamic, Controlled Form 2
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Cats Form
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <CatsForm />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Lifting State Up 'AboutOne1'
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <TemperatureCalculator multireducerKey="AboutOne1" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Lifting State Up 'AboutOne2'
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <TemperatureCalculator multireducerKey="AboutOne2" />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

      </div>
    );
  }
}

export default AboutOne;
