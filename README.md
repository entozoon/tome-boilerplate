# Tome of the Unknown Boilerplate

[**Demonstration**](https://entozoon.github.io/tome-boilerplate/) of how you might go about using the [Tome of the Unknown](https://entozoon.github.io/tome-of-the-unknown) package for a mega simple, super fast, blog style SPA with flat file structure.

## How do I actually use this bloody thing to make my own site?

* Create your site as a github repo
* Copy the contents of this repo to it
* Edit `package.json` changing the various occurrences of tome-boilerplate to your repo details
* Edit all the files in `/public` with the basic details of your site
* Edit any `*.render.js` file to customise your HTML, and `*.scss` for styles

## Dev

    npm i
    npm start

## Deploy

    npm run deploy

Note, this builds and then pushes to git. The `/docs` folder is set up as the dist for github pages.

## Re-compile articles (also runs automatically before start/build/deploy)

    npm run compile

## Structure

Overview of the main things:

    /docs   -> Deploy folder - dist files that github pages uses
    /public -> Assets such as images
    /src    -> The Code™
        /index             -> Index component - homepage listings
        /ArticleComponents -> Render HTML for article listings/detail
        /articles          -> Actual content for the site
        App.js             -> Main program for the site

^ Might not be up to date!

## How Do I Actually Use This Bloody Thing?

### General

Edit any `*.render.js` file to customise your HTML, and `*.scss` for styles

### Add Image - Render template

(Automatically moves assets for deploy)
See how `logo.png` was added in `Header.render.js`

    import logo from "./logo.png";
    <img src={logo} alt="" />

### Add Image - CSS

(Automatically moves assets for deploy)

    background: url(/src/images/foo.jpg)

### Add Image - Article content.html

Add your image into `/public/images` and refer to it with:

    <image src="/images/article-image.jpg" />

Anything in `/public` is moved into `/dist` when the project builds/deploys.

### Other stuff??

Refer to the [create-react-app user guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) as this is what it's built on
