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

Where `INPUT_DIR` is the directory containing the IDL .json, and `OUTPUT_DIR` is the location for the desired program client. 

It will search within `INPUT_DIR` for a single .json file, and create the `OUTPUT_DIR` as the output.

ie

```
ts-node convert /input /output/MyProgramClient
```