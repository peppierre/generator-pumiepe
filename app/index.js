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
                message: 'What is your site\'s name?',
                validate: function (input) {
                    return (input.replace(/\s/gi, "") !== "" ? true : "C'mon, give a name!");
                }
            }, {
                type: "text",
                name: 'description',
                message: 'How do you descibe it?',
                default: 'The best site ever.'
            }, {
                type: "text",
                name: 'keywords',
                message: 'Key your keywords (comma to split)'
            }, {
                type: "text",
                name: 'author',
                message: 'Enter your name',
                validate: function (input) {
                    return (input.replace(/\s/gi, "") !== "" ? true : "Don't be serious! Let your user release some pressure and shout: 'XY, you *%$#@&^$%#&!'");
                }
            }, {
                type: "text",
                name: 'email',
                message: 'Enter your email'
            }
        ];

        this.prompt(prompts, function (props) {
            this.conf = {
                siteName: props.siteName,
                description: props.description,
                keywords: props.keywords,
                author: props.author,
                email: props.email
            }
            done();
        }.bind(this));
    },

    configuring: {
        app: function () {
            this.template(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                this.conf
            );
            this.template(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json'),
                this.conf
            );
            this.template(
                this.templatePath('_README.md'),
                this.destinationPath('README.md'),
                this.conf
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
                this.conf
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
