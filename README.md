# IDL to Codama Program Client Converter

Convert an Anchor program IDL json file into a codama program client.

Making a repo for it with dependencies that produce working Codama clients. Newer versions drop Events for some reason.

## Install

```
yarn
```

## Usage

```
ts-node convert INPUT_DIR OUTPUT_DIR
```

Where `INPUT_DIR` is the directory containing the IDL .json files, and `OUTPUT_DIR` is the location for the desired program clients. 

It will search within `INPUT_DIR` for a multiple .json files, and create the `OUTPUT_DIR` as the output.

ie

```
ts-node convert /input /output/
```