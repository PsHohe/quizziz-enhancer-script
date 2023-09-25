// ==UserScript==
// @name         Quizziz Paper Enhanced
// @namespace    http://psicointel.cl/
// @version      0.1
// @description  Increases Quizizz questions font for Paper Mode. It also increases the height of the questions section and reduces the height of the answers section. Images are now expandable on click and a little bigger.
// @author       Sandrino Escobar
// @match        *://quizizz.com/admin/pm/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function addCustomStyle(css) {
    const style = document.getElementById("addCustomStyle_for_userscript") || createStyleElement();
    const sheet = style.sheet;
    sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
  }

  function createStyleElement() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = "addCustomStyle_for_userscript";
    document.head.appendChild(style);
    return style;
  }

  function applyStyles() {
    const styles = [
      `.resizable {
          font-size: 1.8rem !important;
      }`,
      `.query-container {
          height: 50% !important;
      }`,
      `.answer-section {
          height: 50% !important;
      }`,
      `.media-wrapper {
          width: 50% !important;
      }`,
      `.fullscreen-image-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10000;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
      }`,
      `.fullscreen-image-wrapper img {
          max-width: 90%;
          max-height: 90%;
      }`
    ];

    styles.forEach(css => addCustomStyle(css));
  }


  function showFullScreenImage(src) {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'fullscreen-image-wrapper';

    const img = document.createElement('img');
    img.src = src;

    wrapperDiv.appendChild(img);
    document.body.appendChild(wrapperDiv);

    wrapperDiv.addEventListener('click', () => {
      wrapperDiv.remove();
    });
  }

  function onImageClick(e) {
    const target = e.target;
    if (target.tagName.toLowerCase() === 'img' && !target.closest('.fullscreen-image-wrapper')) {
      e.preventDefault();
      showFullScreenImage(target.src);
    }
  }

  function initialize() {
    applyStyles();
    document.body.addEventListener('click', onImageClick);
  }

  initialize();

})();
