// module.exports = {
//   webpack: {
//     configure: (webpackConfig) => {
//       // 添加 MDX loader 配置
//       webpackConfig.module.rules.push({
//         test: /\.mdx$/,
//         use: [
//           {
//             loader: 'babel-loader',
//             options: {
//               presets: ['@babel/preset-react']
//             }
//           },
//           {
//             loader: '@mdx-js/loader',
//             options: {
//               outputFormat: 'program',
//               providerImportSource: '@mdx-js/react'
//             }
//           }
//         ]
//       });

//       return webpackConfig;
//     }
//   }
// };

// craco.config.js

// （CRACO 必须把 .mdx 规则“插进 oneOf”，而不是 push 到 rules 尾部）
//  MDX 根本没被 @mdx-js/loader 处理，而是掉进了 CRA 的兜底 asset/resource 规则里。当 .mdx 被当成静态文件输出时，就会得到这个报错。
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // 1) 找到 CRA 的 oneOf
      const oneOfRule = webpackConfig.module.rules.find(r => Array.isArray(r.oneOf));
      if (!oneOfRule) return webpackConfig;

      // 2) 我们的 .mdx 规则
      const mdxRule = {
        test: /\.mdx?$/,
        include: path.resolve(__dirname, 'src'), // 限定到 src 更稳
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              // React 17+ 自动 JSX runtime，更少兼容坑
              presets: [[require.resolve('@babel/preset-react'), { runtime: 'automatic' }]],
            },
          },
          {
            loader: require.resolve('@mdx-js/loader'),
            options: {
              outputFormat: 'program',
              providerImportSource: '@mdx-js/react',
              // 需要 GFM 等语法再加 remark 插件，这里先最小化
            },
          },
        ],
      };

      // 3) 插到兜底 asset/resource 之前
      const oneOf = oneOfRule.oneOf;
      const assetIdx = oneOf.findIndex(r => r.type === 'asset/resource');
      oneOf.splice(assetIdx >= 0 ? assetIdx : oneOf.length, 0, mdxRule);

      // 4) 让解析器认识 .md/.mdx（可选但建议）
      if (webpackConfig.resolve?.extensions) {
        for (const ext of ['.mdx', '.md']) {
          if (!webpackConfig.resolve.extensions.includes(ext)) {
            webpackConfig.resolve.extensions.push(ext);
          }
        }
      }

      return webpackConfig;
    },
  },
};
