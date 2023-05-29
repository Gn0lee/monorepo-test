var path = require('path');
const { dependencies } = require('./package.json');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

const { override, babelInclude } = require('customize-cra');

module.exports = function (config, env) {
	config.plugins.push(
		new ModuleFederationPlugin(
			(module.exports = {
				name: 'app1',
				remotes: {
					design_system: `design_system@http://localhost:3001/remoteEntry.js`,
				},
				shared: {
					...dependencies,
					react: {
						singleton: true,
						requiredVersion: dependencies['react'],
					},
					'react-dom': {
						singleton: true,
						requiredVersion: dependencies['react-dom'],
					},
				},
			})
		)
	);
	config.output.publicPath = 'auto';
	return Object.assign(
		config,
		override(
			babelInclude([
				/* transpile (converting to es5) code in src/ and shared component library */
				path.resolve('src'),
				path.resolve('../design_system/src/components'),
			])
		)(config, env)
	);
};
