const blockClass = require("../src/block");
const SHA256 = require("crypto-js/sha256");
const blockBody = { data: "testing new block" };

test("validate the block's hash sent - valid", async () => {
  const newBlock = new blockClass.Block(blockBody);

  //spread the boject to remove the hash block
  const { hash, ...originalBlock } = newBlock;

  //hashing the block again
  const newBlockHashed = SHA256(JSON.stringify(originalBlock)).toString();
  newBlock.hash = newBlockHashed;

  const response = await newBlock.validate();
  expect(response).toBe(true);
});

test("validate the block's hash sent - invalid", async () => {
  const newBlock = new blockClass.Block(blockBody);
  return expect(newBlock.validate()).rejects.toBe(false);
});

test("get block body data decoded - error Genesis block", async () => {
  const newBlock = new blockClass.Block(blockBody);
  expect(newBlock.getBData()).rejects.toMatchObject({ error: "Genesis block" });
});

test("get block body data decoded", async () => {
  const newBlock = new blockClass.Block(blockBody);
  newBlock.height = 1;
  expect(newBlock.getBData()).resolves.toMatchObject(blockBody);
});
