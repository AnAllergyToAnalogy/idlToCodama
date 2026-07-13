// Dependencies:
//  codama
//  @codama/nodes-from-anchor
//  @codama/renderers-js

import path from "path";
import {promises as fs} from "fs";
import {createFromRoot} from "codama";
import {rootNodeFromAnchor} from "@codama/nodes-from-anchor";
import {renderVisitor} from "@codama/renderers-js";

let log = console.log;


if(process.argv[2] === '--help'){
    log();
    log("=============================");
    log("=  IDL to Codama converter  =");
    log("=============================");
    log();
    log("Arguments:")
    log("   0: source folder (contains IDL)")
    log("   1: destination folder (where codama client will be written)")
    log();
    process.exit();
}else{
    // log(process.argv[2]);
}

if(process.argv.length < 4){
    throw new Error("Must provide source and destination folders");
}

const source = String(process.argv[2]);
const destination = process.argv[3];


const loadAnchorIDL = async () => {
    const basePath = path.join(__dirname,"/",source);
    const dirPath = path.join(basePath);

    try {
        // Read the directory contents
        const files = await fs.readdir(dirPath);
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        if (jsonFiles.length === 0) {
            throw new Error(`No JSON files found in ${dirPath}`);
        }

        if (jsonFiles.length > 1) {
            throw new Error(`Multiple JSON files found in ${dirPath}. Please specify which one to use.`);
        }

        const filePath = path.join(dirPath, jsonFiles[0]);
        return JSON.parse(await fs.readFile(filePath, "utf-8"));
    } catch (error) {
        if (error instanceof Error && "code" in error && error.code === "ENOENT") {
            throw new Error(`Failed to load IDL: ${dirPath} does not exist`);
        }
        throw error;
    }
};


async function convertIdlToCodamas(){
    log("Load IDL...")
    const idl = await loadAnchorIDL();

    log("Get root node...")
    const rootNode = rootNodeFromAnchor(idl);

    log("Generate Codama client...")
    const codama = createFromRoot(rootNode);

    log("Render and write...")
    const generatedPath = path.join( destination);
    const visitor = renderVisitor(generatedPath);

    // @ts-ignore
    await codama.accept(visitor);

    log("Done.")
}

convertIdlToCodamas();