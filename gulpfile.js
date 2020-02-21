const gulp = require('gulp')
const stylus = require('gulp-stylus')
const babel = require('gulp-babel')
const del = require("del")
const path = require('path')

const LibPath = path.resolve('./lib')
const StaticPath = path.resolve('./storybook-static')

const babelOption = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
    ['@babel/preset-typescript', {
      isTSX: true,
      allExtensions:true
    }]
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    [
      "import",
      {
        "libraryName": "antd",
        "style": true
      }
    ]
  ]
}


const cleanLib = () => del([LibPath])
const cleanStatic = () => del([StaticPath])

const compileJS = () => 
  gulp.src('./src/**/*.@(tsx|ts|js|jsx)')
      .pipe(babel(babelOption))
      .pipe(gulp.dest(LibPath))


const compileStylus = () =>
  gulp.src('./src/**/*.styl')
      .pipe(gulp.dest(LibPath))
      .pipe(stylus())
      .pipe(gulp.dest(LibPath))


exports.clean = gulp.parallel(cleanLib, cleanStatic)

exports.default = gulp.series(cleanLib, compileJS, compileStylus)