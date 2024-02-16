```markdown
# File Difference Utility

This is a JavaScript utility that compares two different files and finds the differences between them. It provides three output formats: Standard, Plain, and JSON.

## Tests and linter status:
[![Actions Status](https://github.com/Stepan19999993/frontend-project-46/actions/workflows/support-check.yml/badge.svg)](https://github.com/Stepan19999993/frontend-project-46/actions)
[![Actions Status](https://github.com/Stepan19999993/frontend-project-46/actions/workflows/node.yml/badge.svg)](https://github.com/Stepan19999993/frontend-project-46/actions)

## Installation

You can install this utility via npm:

```bash
npm install file-difference-utility
```

## Usage

### Standard Format

To use the utility in standard format, you can run:

```bash
node compare.js file1.txt file2.txt
```

### Plain Format

To use the utility in plain format, you can run:

```bash
node compare.js --plain file1.txt file2.txt
```

### JSON Format

To use the utility in JSON format, you can run:

```bash
node compare.js --json file1.txt file2.txt
```

## Example

Let's say we have two files:

`file1.txt`:
```
Hello, world!
This is a test file.
```

`file2.txt`:
```
Hello, world!
This is a different test file.
```

Running the utility with these files:

```bash
node compare.js --json file1.txt file2.txt
```

Would produce the following JSON output:

```json
{
  "differences": [
    {
      "lineNumber": 2,
      "file1Line": "This is a test file.",
      "file2Line": "This is a different test file."
    }
  ]
}
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

Ensure that the badge URLs are correct and point to your repository's actions.
