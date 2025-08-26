import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import './ChartEditor.css';

const ChartEditor = () => {
  const [config, setConfig] = useState(`{
  "type": "line",
  "title": "销售数据统计",
  "labels": ["一月", "二月", "三月", "四月", "五月", "六月"],
  "datasets": [
    {
      "label": "销售额",
      "data": [12, 19, 3, 5, 2, 3],
      "borderColor": "rgb(75, 192, 192)",
      "backgroundColor": "rgba(75, 192, 192, 0.2)"
    }
  ]
}`);

  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(config);
      setChartData(parsed);
      setError(null);
    } catch (err) {
      setError('JSON 格式错误: ' + err.message);
    }
  }, [config]);

  const renderChart = () => {
    if (error) {
      return <div className="error">⚠️ {error}</div>;
    }
    
    if (!chartData) return null;

    const data = {
      labels: chartData.labels,
      datasets: chartData.datasets
    };

    switch (chartData.type) {
      case 'line':
        return <LineChart data={data} />;
      case 'bar':
        return <BarChart data={data} />;
      case 'pie':
        return <PieChart data={data} />;
      default:
        return <div>不支持的图表类型</div>;
    }
  };

  return (
    <div className="chart-editor">
      <div className="editor-panel">
        <h3>📝 图表配置</h3>
        <textarea
          value={config}
          onChange={(e) => setConfig(e.target.value)}
          className="config-editor"
          placeholder="输入图表配置..."
        />
        <div className="editor-help">
          <h4>💡 配置说明：</h4>
          <ul>
            <li><code>type</code>: 图表类型 (line, bar, pie)</li>
            <li><code>title</code>: 图表标题</li>
            <li><code>labels</code>: X轴标签数组</li>
            <li><code>datasets</code>: 数据集数组</li>
          </ul>
        </div>
      </div>
      
      <div className="preview-panel">
        <h3>📊 实时预览</h3>
        <div className="chart-preview">
          {chartData && <h4>{chartData.title}</h4>}
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default ChartEditor;