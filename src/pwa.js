import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './helpers/Html';

export default function () {
  return `<!DOCTYPE html><html lang="en-US">${ReactDOM.renderToStaticMarkup(<Html />)}</html>`;
}
