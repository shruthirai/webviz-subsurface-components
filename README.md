[![PyPI version](https://badge.fury.io/py/webviz-subsurface-components.svg)](https://badge.fury.io/py/webviz-subsurface-components)
[![npm version](https://badge.fury.io/js/%40webviz%2Fsubsurface-components.svg)](https://badge.fury.io/js/%40webviz%2Fsubsurface-components)
[![Build Status](https://github.com/equinor/webviz-subsurface-components/workflows/webviz-subsurface-components/badge.svg)](https://github.com/equinor/webviz-subsurface-components/actions?query=branch%3Amaster)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/equinor/webviz-subsurface-components.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/equinor/webviz-subsurface-components/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/equinor/webviz-subsurface-components.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/equinor/webviz-subsurface-components/context:javascript)
[![Language grade: Python](https://img.shields.io/lgtm/grade/python/g/equinor/webviz-subsurface-components.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/equinor/webviz-subsurface-components/context:python)
[![Python 3.6 | 3.7 | 3.8 | 3.9](https://img.shields.io/badge/python-3.6%20|%203.7%20|%203.8%20|%203.9-blue.svg)](https://www.python.org/)
[![Code style: black](https://img.shields.io/badge/code%20style-black%20%28Python%29-000000.svg)](https://github.com/psf/black)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier%20%28JavaScript%29-ff69b4.svg)](https://github.com/prettier/prettier)
[![codecov](https://codecov.io/gh/equinor/webviz-subsurface-components/branch/master/graph/badge.svg?token=TKBZPHQLU4)](https://codecov.io/gh/equinor/webviz-subsurface-components)

# Webviz subsurface components

`webviz_subsurface_components` is a Dash/React component library for use in `webviz`,
which have in common that they are geared towards subsurface dashboards. There storybook is available at https://equinor.github.io/webviz-subsurface-components/storybook-static.
And the demo of old components is available at https://equinor.github.io/webviz-subsurface-components.

## How to install the components

You can quickly get started using the components in Dash by:

1.  Run `pip install webviz-subsurface-components`
2.  Run `python examples/example_hm.py`
3.  Visit http://localhost:8050 in your web browser

This project was originally generated by the
[dash-component-boilerplate](https://github.com/plotly/dash-component-boilerplate).
(with some modifications).

If you are only interested in using the JavaScript code in your own JavaScript project,
you can install the [`npmjs` deployed version](https://www.npmjs.com/package/@webviz/subsurface-components):
```
npm i @webviz/subsurface-components
```
## How to contribute

### Install dependencies

If you want to build and develop yourself, you should fork + clone the repository, and
then:

1. Install npm packages
    ```
    npm ci --ignore-scripts --prefix ./react
    ```
2. Run some potentially optional postinstall scripts
    ```
    npm run setup-deckgl-types --prefix ./react  # only needed if ignored scripts during install
    npm run copy-package-json --prefix ./react  # only needed if building Dash components
    ```
3. Install python packages required to build components.
    ```
    pip install .[dependencies]
    pip install dash[dev]
    ```
4. Install the python packages for testing.
    ```
    pip install .[tests]
    pip install dash[testing]
    ```
    The second of these commands appears to be necessary as long as
    [this `pip` issue is open](https://github.com/pypa/pip/issues/4957).

### Write component code in `src/lib/components/<component_name>/<component_name>.jsx`

- The demo app is in `src/demo` and is where you will import an example of your
  component. To start the existing demo app, run `npm start`.
- To test your code in a Python environment:
    1. Build your code
        ```
        npm run build --prefix ./react
        ```
    2. Install the Python pacakge in development mode (if not already done and
       assuming you are using a virtual environment):
        ```
        pip install -e .
        ```
    3. Create a new example in `examples/` which uses your new component.

-   Write tests for your component.
    -   Tests exist in `tests/`. Take a look at them to see how to write tests using
        the Dash test framework.
    -   Run the tests with `pytest tests`.

-   Add custom styles to your component by putting your custom CSS files into
    your distribution folder (`webviz_subsurface_components`).
    -   Make sure that they are referenced in `MANIFEST.in` so that they get
        properly included when you're ready to publish your component.
    -   Make sure the stylesheets are added to the `_css_dist` dict in
        `webviz_subsurface_components/__init__.py` so dash will serve them
        automatically when the component suite is requested.

- Every file related to the component should be located in the component directory, unless the file is shared between multiple components. For example the file-structure should look something like this:
```
src
|--lib
    |----<component_name>
        |----components
              |----<sub_component>.ts
        |----utils
        |----<component_name>.tsx
        |----<component_name>.css
        |----index.ts
```

### Automatically upload demo application

This repository has a GitHub workflow which can automatically build and deploy a demo
app with your changes, to GitHub pages.

- On push to your feature branch, in your fork, the workflow will build and deploy a
  demo app to your fork's GitHub page, given that your commit message includes the
  substring `[deploy test]`.
- On merge to `master` in the main repository, a build + deploy will be done to the
  official GitHub page in the main repository.

For this to work in your own fork, you will need to create a branch `gh-pages`
(this you only need to do once). One way of creating this branch is e.g.:
```bash
git checkout --orphan gh-pages
git rm -rf .
git commit --allow-empty -m  "Create GitHub pages branch"
git push origin gh-pages
```

You are encouraged to rebase and squash/fixup unnecessary commits before pull request is merged to `master`.
