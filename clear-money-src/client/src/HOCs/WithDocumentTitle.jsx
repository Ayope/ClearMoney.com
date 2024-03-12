import React from 'react';
import DocumentTitle from 'react-document-title';

function WithDocumentTitle(Component, title) {
  return function WrappedComponent(props) {
    return (
      <DocumentTitle title={title}>
        <Component {...props} />
      </DocumentTitle>
    );
  };
}

export default WithDocumentTitle;
