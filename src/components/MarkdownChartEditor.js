import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import './MarkdownChartEditor.css';

const MarkdownChartEditor = () => {
  const [markdown, setMarkdown] = useState(`# 销售数据分析

## 折线图 - 月度销售趋势
\`\`\`chart:line
title: 月度销售额
labels: 一月,二月,三月,四月,五月,六月
data: 12,19,3,5,2,3
color: #4ade80
\`\`\`

## 柱状图 - 产品销量对比
\`\`\`chart:bar
title: 产品销量
labels: 产品A,产品B,产品C,产品D
data: 65,59,80,81
colors: #ef4444,#3b82f6,#f59e0b,#10b981
\`\`\`

## 饼图 - 市场份额
\`\`\`chart:pie
title: 设备访问占比
labels: 桌面,移动端,平板
data: 300,50,100
colors: #ff6384,#36a2eb,#ffce56
\`\`\``);

  const [charts, setCharts] = useState([]);

  const parseMarkdown = (text) => {
    const chartBlocks = text.match(/```chart:(line|bar|pie)\n([\s\S]*?)\n```/g) || [];
    
    return chartBlocks.map((block, index) => {
      const typeMatch = block.match(/chart:(line|bar|pie)/);
      const type = typeMatch ? typeMatch[1] : 'line';
      
      const lines = block.split('\n').slice(1, -1);
      const config = {};
      
      lines.forEach(line => {
        const [key, value] = line.split(': ');
        if (key && value) {
          config[key.trim()] = value.trim();
        }
      });
      
      // 解析数据
      const labels = config.labels ? config.labels.split(',').map(s => s.trim()) : [];
      const data = config.data ? config.data.split(',').map(s => parseFloat(s.trim())) : [];
      const colors = config.colors ? config.colors.split(',').map(s => s.trim()) : ['#3b82f6'];
      
      return {
        id: index,
        type,
        title: config.title || '未命名图表',
        chartData: {
          labels,
          datasets: [{
            label: config.title || '数据',
            data,
            backgroundColor: type === 'pie' ? colors : colors[0] + '40',
            borderColor: colors[0],
            borderWidth: 2
          }]
        }
      };
    });
  };

  useEffect(() => {
    const parsedCharts = parseMarkdown(markdown);
    setCharts(parsedCharts);
  }, [markdown]);

  const renderChart = (chart) => {
    switch (chart.type) {
      case 'line':
        return <LineChart data={chart.chartData} />;
      case 'bar':
        return <BarChart data={chart.chartData} />;
      case 'pie':
        return <PieChart data={chart.chartData} />;
      default:
        return null;
    }
  };

  const renderMarkdownText = (text) => {
    // 简单的markdown渲染
    return text
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="markdown-editor">
      <div className="editor-section">
        <h3>📝 Markdown编辑器</h3>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="markdown-input"
          placeholder="使用Markdown语法编写图表..."
        />
        
        <div className="syntax-help">
          <h4>🚀 快速语法：</h4>
          <pre>{`\`\`\`chart:line
title: 图表标题
labels: 标签1,标签2,标签3
data: 10,20,30
color: #4ade80
\`\`\``}</pre>
        </div>
      </div>
      
      <div className="preview-section">
        <h3>👀 实时预览</h3>
        <div className="markdown-preview">
          {/* 渲染文本内容 */}
          <div 
            className="text-content"
            dangerouslySetInnerHTML={{ 
              __html: renderMarkdownText(
                markdown.replace(/```chart:(line|bar|pie)\n([\s\S]*?)\n```/g, '[图表]')
              )
            }}
          />
          
          {/* 渲染图表 */}
          {charts.map((chart) => (
            <div key={chart.id} className="chart-block">
              <h4>{chart.title}</h4>
              <div className="chart-container">
                {renderChart(chart)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarkdownChartEditor;