# **Find Differences**

**Find Differences** is a powerful JavaScript utility that compares two files and identifies differences between them. It supports multiple output formats — **Standard**, **Plain**, and **JSON** — making it an essential tool for analyzing configuration changes in files like JSON or YAML.

---

## ✨ Key Features

- Compare files in **JSON** and **YAML** formats.
- Display differences in three formats:
  - **Standard**: A human-readable structured format.
  - **Plain**: A concise textual summary.
  - **JSON**: A machine-readable structured format.
- Simple command-line interface for quick and efficient use.

---

## 🛠️ Requirements

- **Node.js** (v14.x or later)

---

## 📥 Installation

Follow these steps to add **Find Differences** to your project:

1. **Install the Module:**
   - Open your terminal and run:
     ```bash
     npm install https://github.com/Stepan19999993/backend-project-46
     ```

2. **Import the Utility:**
   - Add it to your project using:
     ```javascript
     import findDiff from 'find-differences'; // ES Modules
     // OR
     const findDiff = require('find-differences'); // CommonJS
     ```

---

## 🚀 Usage

Use the utility from the command line to compare files and specify the output format.

### Standard Format (Default)

```bash
gendiff file0.json file1.json
```

### Plain Format

```bash
gendiff --format plain file0.json file1.json
```

### JSON Format

```bash
gendiff --format json file0.json file1.json
```

---

## 📋 Example

### Input Files

**`file0.json`:**
```json
{
  "host": "github.com",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```

**`file1.json`:**
```json
{
  "timeout": 20,
  "verbose": true,
  "host": "github.com"
}
```

### Output Formats

#### Standard Format

Command:
```bash
gendiff file0.json file1.json
```

Output:
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

#### Plain Format

Command:
```bash
gendiff --format plain file0.json file1.json
```

Output:
```
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From '50' to '20'
Property 'verbose' was added with value: true
```

#### JSON Format

Command:
```bash
gendiff --format json file0.json file1.json
```

Output:
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

---

## 🔧 Supported File Formats

- **JSON**
- **YAML**

---

## 🎖️ Badges

- **Test Status**:  
  [![Actions Status](https://github.com/Stephan-js/backend-project-46/actions/workflows/node.yml/badge.svg)](https://github.com/Stephan-js/backend-project-46/actions)

- **Maintainability**:  
  [![Maintainability](https://api.codeclimate.com/v1/badges/f7a4398328e039d1ffac/maintainability)](https://codeclimate.com/github/Stephan-js/backend-project-46/maintainability)

---

## 📽️ Video Guide

Watch a tutorial on installing and using **Find Differences**:

[![asciicast](https://asciinema.org/a/tRY5ClBIH5x3YOGBVscsU7WRG.svg)](https://asciinema.org/a/tRY5ClBIH5x3YOGBVscsU7WRG)

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Developed with ❤️ by [Stephan](https://github.com/Stephan-js)
