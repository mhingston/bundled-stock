# Usage

## Installation

> npm install

## Configuration

The CLI application expects a `config.json` file to be present in the working directory when it is invoked. This file configures the data source (i.e. path to a file or a URL).

## Testing

Two test case are shown in this example.

1) Reading from a file, the first CLI argument being a file name of the list of bundles to check

```bash
$ cd tests/testFile
$ node ../../build-bundle-stock.js list-of-bundles.csv
SKU1 + SKU3,4
SKU2 + SKU1(4),2
SKU1 + SKU4(4),0
```

2) Reading from a URL, the first CLI argument being a file name of the list of bundles to check

```bash
$ cd tests/testURL
$ node ../../build-bundle-stock.js list-of-bundles.csv
CVR16A + CDR04B(5),0
CVR02A + IMR01A(2),1
CVR06A(1) + CDR09B,0
```