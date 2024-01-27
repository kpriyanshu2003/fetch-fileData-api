import { Response, Request } from "express";
import fs from "fs";
import readline from "readline";

export const sendData = async (req: Request, res: Response) => {
  const { n, m } = req.query;
  if (!n)
    return res.status(400).json({
      status: 400,
      message: "Please provide correct parameters",
    });
  if (!m) return res.send(await sendEntireFile(n as string));
  return res.send(await sendChunk(n as string, m as string));
};

const sendEntireFile = async (n: string) => {
  try {
    const data = await fs.promises.readFile(`./tmp/data/${n}.txt`, "utf8");
    console.log("Data sent to client");
    return data;
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

const sendChunk = async (n: string, m: string) => {
  try {
    const fileStream = fs.createReadStream(`./tmp/data/${n}.txt`);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    let currentLine = 0;
    let result = "";
    for await (const line of rl)
      if (++currentLine === parseInt(m)) {
        result = line;
        break;
      }
    rl.close();
    return result;
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};
