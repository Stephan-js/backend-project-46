# Find Differences

**Find Differences** is a JavaScript utility designed to compare two files and find the differences between them. It can output the differences in three formats: **Standard**, **Plain**, and **JSON**. This is particularly useful for configuration files in formats like JSON or YAML.

## Overview

This utility helps you detect changes between two files and represent them in a structured manner, supporting multiple formats to suit different use cases.

## Requirements

- **Node.js** (v14.x or later)

## Installation

### Module Installation

For both Ubuntu and Windows users, follow these steps to add the utility to your project:

1. **Install the Module**:
   - Open a terminal and run the following command to add the module to your project:
     ```bash
     npm install https://github.com/Stepan19999993/frontend-project-46
     ```

2. **Import the Module**:
   - To use the module in your project, import it as follows:
     ```js
     import findDiff from '@hexlet/code';
     // or for CommonJS
     const findDiff = require('@hexlet/code');
     ```

### Video Guide

For a video tutorial on how to install and use the module, click the link below:

[![asciicast](https://asciinema.org/a/tRY5ClBIH5x3YOGBVscsU7WRG.svg)](https://asciinema.org/a/tRY5ClBIH5x3YOGBVscsU7WRG)

## Usage

You can compare two files in various formats (JSON, YAML) by running the utility with different output options.

### Standard Format

For a standard format output, run the following command:

```bash
gendiff file0.json file1.json
```

### Plain Format

For a plain text summary of changes, use:

```bash
gendiff --format plain file0.json file1.json
```

### JSON Format

To get the output in JSON format, use:

```bash
gendiff --format json file0.json file1.json
```

## Example

### Input Files

Suppose you have the following two JSON files:

`file0.json`:
```json
{
  "host": "github.com",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```

`file1.json`:
```json
{
  "timeout": 20,
  "verbose": true,
  "host": "github.com"
}
```

### Standard Format Output

Running the utility with the command:
```bash
gendiff file0.json file1.json
```

Would produce the following output:

```
{
  - follow: false
    host: github.com
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

### Plain Format Output

Running the command:
```bash
gendiff --format plain file0.json file1.json
```

Would produce this plain text summary:

```
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From '50' to '20'
Property 'verbose' was added with value: true
```

### JSON Format Output

Running the command:
```bash
gendiff --format json file0.json file1.json
```

Would produce this JSON output:

```json
[
  {"name": "follow", "value": false, "status": "deleted"},
  {"name": "host", "value": "github.com", "status": "same"},
  {"name": "proxy", "value": "123.234.53.22", "status": "deleted"},
  {"name": "timeout", "value": 50, "status": "deleted"},
  {"name": "timeout", "value": 20, "status": "added"},
  {"name": "verbose", "value": true, "status": "added"}
]
```

## Supported File Formats

The following file formats are supported:

- JSON
- YAML

## Badges

### Test Status:

[![Actions Status](https://github.com/Stephan-js/frontend-project-46/actions/workflows/node.yml/badge.svg)](https://github.com/Stephan-js/frontend-project-46/actions)

### Maintainability:

[![Maintainability](https://api.codeclimate.com/v1/badges/539932a003647964e843/maintainability)](https://codeclimate.com/github/Stepan19999993/frontend-project-46/maintainability)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


---


Developed with ❤️ by [Stephan](https://github.com/Stephan-js)
