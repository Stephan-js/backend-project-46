# Find Difference

Welcome to Find Differences - a JavaScript utility that matches two different files and finds the differences between them.

## Overview

This utility can output the differences in three formats: Standard, Plain, and JSON.

## Requirements

- JavaScript (Node.js)
- Git

## Installation

### Chocolatey Installation (Windows)

If you're using Windows, you can use Chocolatey to simplify the installation process.

1. **Install Chocolatey:**
   - Open PowerShell as an administrator.
   - Run the following command to install Chocolatey:
     ```powershell
     Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
     ```
   - Install GNU Make:
     ```powershell
     choco install make
     ```

2. **Restart PowerShell:**
   - Close and reopen PowerShell to make sure it recognizes the newly installed Chocolatey.

3. **Copy Repository to Your PC:**
   - Open a PowerShell window.
   - Run the following command to clone the repository to your local machine:
     ```bash
     git clone https://github.com/Stepan19999993/frontend-project-46
     ```
   - Change into the project directory:
     ```bash
     cd frontend-project-46
     ```

4. **Install Project Dependencies:**
   - Run the following command to install the project dependencies:
     ```bash
     make install
     ```

### Manual Installation (Ubuntu / Mac)

If you're using Ubuntu, you can follow these manual installation steps:

1. **Copy Repository to Your PC:**
   - Open a terminal window.
   - Run the following command to clone the repository to your local machine:
     ```bash
     git clone https://github.com/Stepan19999993/frontend-project-46
     ```
   - Change into the project directory:
     ```bash
     frontend-project-46
     ```

2. **Install Project Dependencies:**
   - Run the following command to install the project dependencies:
     ```bash
     make install
     ```
   ### Vidio Guide

   [![asciicast](https://asciinema.org/a/641195.svg)](https://asciinema.org/a/641195)

## Usage

### Standard Format

To use the utility in standard format, you can run:

```bash
node ./src/gendiff-cmd.js file0.json file1.json
```

### Plain Format

To use the utility in plain format, you can run:

```bash
node ./src/gendiff-cmd.js --format plain file0.json file1.json
```

### JSON Format

To use the utility in JSON format, you can run:

```bash
node ./src/gendiff-cmd.js --format json file0.json file1.json
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
node ./src/gendiff-cmd.js file0.json file1.json
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
node ./src/gendiff-cmd.js --format plain file0.json file1.json
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
node ./src/gendiff-cmd.js --format json file0.json file1.json
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

[![Actions Status](https://github.com/Stepan19999993/frontend-project-46/actions/workflows/support-check.yml/badge.svg)](https://github.com/Stepan19999993/frontend-project-46/actions)

### Maintainability

[![Maintainability](https://api.codeclimate.com/v1/badges/539932a003647964e843/maintainability)](https://codeclimate.com/github/Stepan19999993/frontend-project-46/maintainability)

## License

```
This project is licensed under the MIT License - see the "LICENSE" file for details.
```
