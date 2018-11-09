import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const configs = [
  {
    input: 'src/index.js',
    output: {
      name: '$',
      file: `dist/jquery.js`,
      format: 'umd'
    },
    plugins: [
      resolve({ module: false }),
      commonjs(),
      babel({
        plugins: ['external-helpers']
      })
    ],
    moduleContext: {
      [require.resolve('whatwg-fetch')]: 'window'
    }
  }
];

if (process.env.NODE_ENV === 'production') {
  configs.push({
    input: 'src/index.js',
    output: {
      name: '$',
      file: `dist/jquery.min.js`,
      format: 'umd'
    },
    plugins: [
      resolve({ module: false }),
      commonjs(),
      babel({
        plugins: ['external-helpers']
      }),
      uglify()
    ],
    moduleContext: {
      [require.resolve('whatwg-fetch')]: 'window'
    }
  });
}

export default configs;
