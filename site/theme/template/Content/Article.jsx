import React, { Children, Component, cloneElement } from 'react';
import DocumentTitle from 'react-document-title';
import { getChildren } from 'jsonml.js/lib/utils';

export default class Artical extends Component {

  getArticle(article) {
    const { content } = this.props;
    const { meta } = content;
    if (!meta.timeline) {
      return article;
    }
    const timelineItems = [];
    let temp = [];
    let i = 1;
    Children.forEach(article.props.children, (child) => {
      if (child.type === 'h2' && temp.length > 0) {
        timelineItems.push(<div key={i}>temp</div>);
        temp = [];
        i += 1;
      }
      temp.push(child);
    });
    if (temp.length > 0) {
      timelineItems.push(<div key={i}>temp</div>);
    }
    return cloneElement(article, {
      children: <div>{timelineItems}</div>
    });
  }

  render() {
    const props = this.props;
    const content = props.content;
    const { meta, description } = content;
    const { title, subtitle, filename } = meta;
    return (
      <DocumentTitle title={title} >
        <article className="markdown">
          <h1>{title} <span className="subtitle">{subtitle}</span></h1>
          {
            !description ? null :
              props.utils.toReactComponent(
                ['section', { className: 'markdown' }].concat(getChildren(description))
              )
          }
          {
            (!content.toc || content.toc.length <= 1 || meta.toc === false) ? null :
              <section className="toc">{props.utils.toReactComponent(content.toc)} </section>
          }
          {
            this.getArticle(props.utils.toReactComponent(
              ['section', { className: 'markdown' }].concat(getChildren(content.content))
            ))
          }
        </article>
      </DocumentTitle>
    );
  }
}
