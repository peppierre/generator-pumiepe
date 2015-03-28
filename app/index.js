'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the slick ' + chalk.red('Pumiepe') + ' generator!'
        ));

        var prompts = [
            {
                type: 'text',
                name: 'siteName',
                message: 'What is your site\'s name?'
            }, {
                type: "text",
                name: 'description',
                message: 'How do you descibe it?',
                default: 'The best site ever.'
            }, {
                type: "text",
                name: 'keywords',
                message: 'Key your keywords (comma to split)'
            }
        ];

        this.prompt(prompts, function (props) {
            this.siteName = props.siteName;
            this.description = props.description;
            this.keywords = props.keywords;

            done();
        }.bind(this));
    },

    configuring: {
        app: function () {
            var config = {
                "siteName": this.siteName,
                "description": this.description
            };
            this.template(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                config
            );
            this.template(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json'),
                config
            );
            this.template(
                this.templatePath('_README.md'),
                this.destinationPath('README.md'),
                config
            );
        },

        projectfiles: function () {
            this.fs.copy(
                this.templatePath('_editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('_bowerrc'),
                this.destinationPath('.bowerrc')
            );
            this.fs.copy(
                this.templatePath('_jshintrc'),
                this.destinationPath('.jshintrc')
            );
            this.fs.copy(
                this.templatePath('_Gruntfile.js'),
                this.destinationPath('Gruntfile.js')
            );
        }
    },

    writing: {
        app: function () {
            this.fs.copy(
                this.templatePath('site'),
                this.destinationPath('app')
            );
            this.template(
                this.templatePath('site/index.html'),
                this.destinationPath('app/index.html'),
                {
                    "siteName": this.siteName,
                    "description": this.description,
                    "keywords": this.keywords
                }
            );
        }
    },

    install: function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    },

    end: function () {
        this.log(chalk.yellow('Bark! Bark!') + ' Your ' + chalk.red('PUMIEPE') + ' site is now ready to use!');
    }
});
