# Find Difference

Welcome to Find Differences - a JavaScript utility that matches two different files and finds the differences between them.

## Overview
This utility can output the differences in three formats: Standard, Plain, and JSON.

## Requirements

- JavaScript (Node.js)

## Installation

### Modul Installation

If you're using Ubuntu or Windows, you can follow these manual installation steps:

1. **Add Module to Your Project:**
   - Open a terminal.
   - Run the following command to clone the Module to your project:
     ```bash
     npm install https://github.com/Stepan19999993/frontend-project-46
     ```

2. **Import module:**
   - Import module in path were it needs:
     ```js
     import findDiff from '@hexlet/code';
     // or
     require findDiff = '@hexlet/code';
     ```
     
   ### Vidio Guide

   [![asciicast](https://asciinema.org/a/641195.svg)](https://asciinema.org/a/641195)

## Usage

### Standard Format

To use the utility in standard format, you can run:

```bash
gendiff file0.json file1.json
```

### Plain Format

To use the utility in plain format, you can run:

```bash
gendiff --format plain file0.json file1.json
```

### JSON Format

To use the utility in JSON format, you can run:

```bash
gendiff --format json file0.json file1.json
```

## Example

### Requist

Suppose we have two files:

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

### Standard Format

Running the utility with these files:

```bash
gendiff file0.json file1.json
```

Would produce the following Standart output:

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

### Plain Format

Running the utility with these files:

```bash
gendiff --format plain file0.json file1.json
```

Would produce the following Plain output:

```
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From '50' to '20'
Property 'verbose' was added with value: true
```

### JSON Format

Running the utility with these files:

```bash
gendiff --format json file0.json file1.json
```

Would produce the following JSON output:

```
{
  add: [ { name: 'verbose', value: 'true', direction: 'verbose' } ],
  update: [
    {
      name: 'timeout',
      oldValue: '50',
      newValue: '20',
      direction: 'timeout'
    }
  ],
  deleted: [
    { name: 'follow', direction: 'follow' },
    { name: 'proxy', direction: 'proxy' }
  ]
}
```

## Available files format

- JSON
- YAML

## Badges

### Head test status:

[![Actions Status](https://github.com/Stepan19999993/frontend-project-46/actions/workflows/node.yml/badge.svg)](https://github.com/Stepan19999993/frontend-project-46/actions)

### Support test status:

[![Actions Status](https://github.com/Stepan19999993/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Stepan19999993/frontend-project-46/actions)

### Maintainability

[![Maintainability](https://api.codeclimate.com/v1/badges/539932a003647964e843/maintainability)](https://codeclimate.com/github/Stepan19999993/frontend-project-46/maintainability)

## License

```
This project is licensed under the MIT License - see the "LICENSE" file for details.
```
