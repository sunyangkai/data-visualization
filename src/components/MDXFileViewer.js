import React, { useState } from 'react';
import { MDXProvider } from '@mdx-js/react';

// 导入 MDX 文件 - 这些文件可以直接在 IDE 中编辑
import BasicSyntax from '../documents/BasicSyntax.mdx';
import ChartsAndComponents from '../documents/ChartsAndComponents.mdx';

// 导入图表组件供 MDX 使用

const MDXFileViewer = () => {
  const [selectedFile, setSelectedFile] = useState('BasicSyntax');

  // 可用的 MDX 文件列表
  const mdxFiles = {
    'BasicSyntax': {
      component: BasicSyntax,
      title: '📝 MDX 基础语法',
      description: '学习 MDX 的基本语法和 Markdown 功能'
    },
    'ChartsAndComponents': {
      component: ChartsAndComponents,
      title: '📊 图表组件与高级功能',
      description: '展示图表组件和 React 交互功能'
    }
  };

  const SelectedComponent = mdxFiles[selectedFile]?.component;

  return (
    <div className="mdx-file-viewer">
      <div className="file-selector">
        <h3>📁 选择 MDX 文档</h3>
        <div className="file-list">
          {Object.entries(mdxFiles).map(([key, file]) => (
            <div
              key={key}
              className={`file-item ${selectedFile === key ? 'active' : ''}`}
              onClick={() => setSelectedFile(key)}
            >
              <h4>{file.title}</h4>
              <p>{file.description}</p>
            </div>
          ))}
        </div>
        
        <div className="file-info">
          <h4>💡 使用说明</h4>
          <ul>
            <li>直接编辑 <code>src/documents/</code> 中的 .mdx 文件</li>
            <li>保存后浏览器会自动热重载</li>
            <li>可以在 MDX 中使用 import 导入 React 组件</li>
            <li>支持完整的 Markdown 语法和 JSX</li>
          </ul>
        </div>
      </div>

      <div className="document-viewer">
        <div className="document-header">
          <h2>{mdxFiles[selectedFile]?.title}</h2>
          <div className="document-path">
            📄 src/documents/{selectedFile}.mdx
          </div>
        </div>
        
        <div className="document-content">
          <MDXProvider>
            {SelectedComponent && <SelectedComponent />}
          </MDXProvider>
        </div>
      </div>
    </div>
  );
};

export default MDXFileViewer;