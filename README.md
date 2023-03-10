# JavaScript Notebook (JSNB) [Try here](https://gopi-suvanam.github.io/jsnb/#github:gopi-suvanam/jsnb/examples/Hello-world.jsnb). 
Notebook for javascript experimentation (in the browser). Overview:
- Easy to use javascript experimentation tool.
- Runs without backend (node.js/npm/pip install/ngnix etc etc). I call this a "nodeless" app for two reasons - 1. it does not require node and npm to use.. 2. it does not require a server (I didnt want to use the word "serverless" as that word has been polluted by Amazon).
- Can be loaded from the web (i.e. behind a webserver) or from the file system (certain features like WebRTC might require a server)
- UI is similar/close to Jupyter Notebook (for the sake familiarity for python developers). Has a minimalistic UI to put focus on user generated code/content.
- Uses Codemirror for formatting the code area and Pico CSS for styling.

## Table of contents
<!-- toc -->
1. [Getting Started](#getting-started)
2. [Features](#features)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Exporting-Importing](#exporting-importing)
3. [Use cases](#use-cases)
4. [Collaboration](#collaboration)
5. [Vs. xyz](#how-is-jsnb-different)
6. [Additional Resources](#links)

## Getting Started
1. Clone this repository (git clone or better still - download) on any machine and double-click index.html. That's it. No Ngnix, no npm, no node, no pip install, no apt-get install.
2. If you want to host the app online, you can put the folder in web directory of the server and use the link to index.html.
3. You can also try the git-hosted version (without downloading anything) here: [https://gopi-suvanam.github.io/jsnb/#](https://gopi-suvanam.github.io/jsnb/#)
4. A hello-world notebook: [https://gopi-suvanam.github.io/jsnb/#/jsnb/examples/Hello-world.jsnb](https://gopi-suvanam.github.io/jsnb/#/jsnb/examples/Hello-world.jsnb)
5. More examples will be added in the folder examples/ in the repository. Check the [README in that folder](/examples/README.md) for links.

## Features
- The notebook consists of cells. Each cell will have user inputted html/code and an output. There is a menu at the top right corner of the cell (or above the cell in case of smaller screens).
- There are two types of cells: code and html. The type of cell can be toggled using a switch in the cell menu.
- To get the output of a cell press play ??? button on the cell menu (or Cmd/Ctrl-Enter on keyboard after selecting the cell).
- For code cells input and output are both shown. For html cells, input is hidden and opens up if you click the output.
- The cell menu also has buttons for moving the cell up ???, down ???, adding a new cell ??? and deleting the current cell ???.
- A notebook can be downloaded as json (has a default extension of .jsnb). IT can be loaded back into the app. The notebook or only the output can also be downloaded as html.
- A .jsnb file can also be directly loaded into the app by suffixing the url of the file after "#" something like: https://gopi-suvanam.github.io/jsnb/#link_to_file.jsnb. The url of the file should be accessible by the browser through GET method.
- There are two special functions included in the app: show(...) for showing some string in the output box. curr_cell() for getting the element corresponding to the output cell.
- For adding more functionality import an external library through import(...) or by adding <script> element.
- D3JS (for data manipulation and charting), Plotly (for plots) and sister project [DI-Libs](https://github.com/gopi-suvanam/di-libs) are preloaded and can be used in the notebooks without seperately loading. They can also be reloaded using reload_script.

### Keyboard Shortcuts
These shortcuts work when a code cell is in focus:
- Ctrl-Enter/Cmd-Enter: Run the current cell
- Shift-Enter': Run the current cell and go to next cell
- Alt-Enter/Option-Enter: Insert new cell
- Alt-D/Option-D: Delete the current cell (no undo at the moment, so be careful)
- Alt/Option-Up Arrow: Move the cell up
- Alt/Option-Up Down: Move the cell down

These shortcust are global
- Alt-R/Option-R: Run all the cells
- Ctrl-G: Import from/Push to GitHub
- Ctrl-S: Download the jsnb to local machine
- Ctrl-O: Load a jsnb from local machine

### Exporting-Importing
- A notebook can be downloaded (Ctrl-S) as a .jsnb file and can be loaded (Ctrl-O) later.
- A file on GitHub repo can be loaded into the JSNB file. The repo has to be public or you should be a collaborator.
- A notebook can be pushed to GiHub. You should be a collaborator on the repo for this.
- GitHub operations will require an [access token from GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token)
- The output of a notebook can be downloaded as an HTML file (with code or wothout code)
- The code of a notebook can be downloaded as a JavaScript file

## Use cases
1. For trying new libraries for testing and building
2. For building reproducible research and sharing the results with others

Not to be used for:
1. Production use cases
2. As an alternative to webapps

## Collaboration
The tool does not store data on cloud as it is intended to be a fully open source product for self-hosting/use on local machines. A fully hosted solution with collaboration is in the Roadmap. Collabortion is still possible through:
1. Download and share JSNB files.
2. Use github for storing JSNB files. Make the repo public or add collaborators. The notebooks built on JSNB can be directly be synced on to GitHub using an access token.
3. Files in public GitHub repos can be directly accessed as: https://gopi-suvanam.github.io/jsnb/#https://raw.githubusercontent.com/[USERNAME]/[REPO]/[BRANCH]/[PATH_TO_FILE]
4. If GitHub pages are enabled for the repo, the files can be accessed also using this link: https://gopi-suvanam.github.io/jsnb/#https://[USERNAME].github.io/[REPO]/[PATH_TO_FILE]
5. Map a cloud drive or LAN drive onto local machine and load from/download to the drive. Share the drive with collaborators.

## How is JSNB different
- JSNB is an open source application and hence can be downloaded, modified and used freely. Jsfiddle/codepen are cloud based platforms.
- JSNB can have multiple cells so it can create long documents.
- Intended use is for experimenting and computing in javascript. HTML and CSS are secondary in the case of JSNB. Whereas for Jsfiddle and codepen the main use case to test javascript along with html and css.
- JSNB can also be used for scientific computation using several open source javascript libraries.

## Links
Additional documentation for JSNB:
1. [Docs](https://github.com/gopi-suvanam/jsnb/blob/main/DOCS.md)
2. [Code-docs](https://github.com/gopi-suvanam/jsnb/blob/main/CODE-DOCS.md)
3. [Roadmap](https://github.com/gopi-suvanam/jsnb/blob/main/ROADMAP.md)
4. [Sample Notebooks](https://github.com/gopi-suvanam/jsnb/blob/main/examples/README.md)

