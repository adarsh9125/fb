import React, { Component } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import axios from 'axios';
import TreeNode from './TreeNode';

const data = {
  '/root': {
    path: '/'+'root',
    type: 'folder',
    isRoot: true,
    children: ['/root/david', '/root/jslancer'],
  },
  '/root/david': {
    path: '/root/david',
    type: 'folder',
    children: ['/root/david/readme.md'],
  },
  '/root/david/readme.md': {
    path: '/root/david/readme.md',
    type: 'file',
    content: 'Thanks for reading me me. But there is nothing here.'
  },
  '/root/jslancer': {
    path: '/root/jslancer',
    type: 'folder',
    children: ['/root/jslancer/projects', '/root/jslancer/vblogs'],
  },
  '/root/jslancer/projects': {
    path: '/root/jslancer/projects',
    type: 'folder',
    children: ['/root/jslancer/projects/treeview'],
  },
  '/root/jslancer/projects/treeview': {
    path: '/root/jslancer/projects/treeview',
    type: 'folder',
    children: [],
  },
  '/root/jslancer/vblogs': {
    path: '/root/jslancer/vblogs',
    type: 'folder',
    children: [],
  },
};

export default class Tree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nodes: data,
      nodess:""
    };
  }
 

  componentDidMount(){
  fetch("http://b47fa77e.ngrok.io/api/v1/category/vendor/1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({nodess:result});
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  getRootNodes = () => {
    console.log("this.state=====>",this.state);
    const { nodes } = this.state;
    return values(nodes).filter(node => node.isRoot === true);
  }

  getChildNodes = (node) => {
    const { nodes } = this.state;
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  }  

  onToggle = (node) => {
    const { nodes } = this.state;
    nodes[node.path].isOpen = !node.isOpen;
    this.setState({ nodes });
  }

  onNodeSelect = node => {
    const { onSelect } = this.props;
    onSelect(node);
  }

  render() {
    console.log("this.state=====>2",this.state.nodess);
    const rootNodes = this.getRootNodes();
    return (
      <div>
       <span className="product details">Prduct Details</span>
      </div>
    )
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired,
};