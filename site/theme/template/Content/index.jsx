import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import DocumentTitle from 'react-document-title';
import MainContent from './MainContent';

export function collect(nextProps, callback) {
  const pageData = nextProps.pageData;
  if (!pageData) {
    callback(404, nextProps);
    return;
  }
  const pageDataPromise = typeof pageData === 'function' ? pageData() : (pageData['zh-CN'] || pageData.index['zh-CN'] || pageData.index)();
  const promises = [pageDataPromise];
  const pathname = nextProps.location.pathname;
  const demos = nextProps.utils.get(
    nextProps.data, [...pathname.split('/'), 'demo']
  );
  if (demos) {
    promises.push(demos.base());
  }

  Promise.all(promises)
    .then(list =>
      // console.log(list)
      callback(null,
        {
          ...nextProps,
          localizedPageData: list[0],
          demos: list[1]
        })
    );
}


export default (props) => {
  return <MainContent {...props} />;
};

