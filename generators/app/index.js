'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to ${chalk.red('generator-es-library')} generator!`));

    const userName = this.user.git.name();

    const prompts = [
      {
        name: 'name',
        default: '',
        message: 'Library name'
      },
      {
        name: 'packageName',
        default: '',
        message: 'Package name'
      },
      {
        name: 'repository',
        default: '',
        message: 'Github repository'
      },
      {
        name: 'author',
        default: userName,
        message: 'Author'
      }
    ];

    return this.prompt(prompts)
      .then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props;
      })
      .catch(err => {
        console.error('Error prompting for values:', err);
      });
  }

  writing() {
    this.fs.copyTpl(this.templatePath(''), this.destinationRoot(), this.props);

    this.fs.copy(this.templatePath('.*'), this.destinationRoot());

    this.fs.copy(this.templatePath('.vscode'), this.destinationPath('.vscode'));
  }

  install() {
    this.yarnInstall();
  }
};
