import React, { Component } from 'react';
import { Link } from 'react-router';
import Article from './Article';

export default class MainContent extends Component {
  generateMenuItems = (moduleData) => {
    const menuMeta = moduleData.map(item => item.meta);
    const menuItems = {};
    menuMeta.sort(
      (a, b) => (a.order || 0) - (b.order || 0)
    ).forEach(((meta) => {
      const category = meta.category || 'topLevel';
      const type = meta.type || 'topLevel';
      menuItems[category] = menuItems[category] || {};
      if (!menuItems[category][type]) {
        menuItems[category][type] = [];
      }
      menuItems[category][type].push(meta);
    }));
    return menuItems;
  }

  /**
   *
   * 获取已开发组件的集合
   *
   * @memberOf MainContent
   */
  getMouduleCollection = (props) => {
    console.log('获取已开发组件的集合');
    const { location, picked } = props;
    const pathname = location.pathname;
    const moduleName = /^components/.test(pathname) ? 'components' : pathname.split('/').slice(0, 2).join('/');
    const moduleData = moduleName === 'components' || moduleName === 'docs/pattern' ? [...picked.components, ...picked['docs/pattern']] :
      props.picked[moduleName];
    return moduleData; // .filter(({ meta }) => meta.filename.endsWith('index.md'));
  }
  /**
   *
   * 生成组件的菜单列表
   *
   * @memberOf MainContent
   */
  getMenuItems = () => {
    console.log('生成组件的菜单列表');
    const moduleData = this.getMouduleCollection(this.props);
    const menuItems = this.generateMenuItems(moduleData);
    // 生成一级菜单
    const topLevel = this.generateTopMenu(menuItems.topLevel);
    const itemGroups = Object.keys(menuItems.Components);
    // 生成 submenu
    return (
      <ul className="fdd-menu">
        {topLevel}
        <li className="sub-menu">
          <div className="sub-menu-title">Components</div>
          <ul className="fdd-menu">
            {
              itemGroups.map((group) => {
                return (
                  <li className="menu-item-group" key={group}>
                    <div className="menu-item-group-title">{group}</div>
                    <ul className="menu-group-list">
                      {
                        menuItems.Components[group].map((item) => {
                          return (
                            <li className="menu-group-item" key={item.filename.replace('index.md', '')}>
                              <Link to={item.filename.replace('index.md', '')}>{item.subtitle}({item.title})</Link>
                            </li>
                          );
                        })
                      }
                    </ul>
                  </li>
                );
              })
            }
          </ul>
        </li>
      </ul>
    );
  }
  generateTopMenu = (menuItems) => {
    return menuItems.topLevel.map((item) => {
      const url = item.filename.replace('.md', '');
      return (
        <li className="menu-item" key={url}>
          <Link to={url}>{item.title}</Link>
        </li>
      );
    });
  }
  render() {
    const props = this.props;
    const localizedPageData = props.localizedPageData;
    // const {getComponentsCollection}= this;
    const menuItems = this.getMenuItems();
    return (
      <div className="main-wrapper">
        <div className="row">
          <div className="menu-wrapper">
            <div className="aside-container">
              {menuItems}
            </div>
          </div>
          <div className="main-container">
            {
              <Article {...props} content={localizedPageData} />
            }
          </div>
        </div>
      </div>
    );
  }
}
