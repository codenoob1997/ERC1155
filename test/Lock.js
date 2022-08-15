const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectRevert } = require("@openzeppelin/test-helpers");
 
const name = "TestMint";
const symbol = "TEST";
 
describe("Mint " + name, function () {
  let myNFT;
 
  this.beforeAll(async () => {
    const MyNFT = await ethers.getContractFactory("MSPC");
    // Deploy to test
    myNFT = await MyNFT.deploy(name, symbol);
    // wait for the contract to be deployed
    await myNFT.deployed();
  });
 
  it("Should return symbol as " + symbol, async function () {
    // test the symbol of the contract
    expect(await myNFT.symbol()).to.equal(symbol);
  });
 
  it("Should not mint due to mint not available", async function () {
    await expectRevert(myNFT.mint(1), "Cannot mint");
  });
 
  it("Should enable mint", async function () {
    const enableMint = await myNFT.setMint(true);
    await enableMint.wait();
    expect(await myNFT.enableMint()).to.equal(true);
  });
 
  it("Should mint 1 NFT", async function () {
    const mint = await myNFT.mint(1);
    await mint.wait();
    expect(await myNFT.totalSupply()).to.equal(1);
  });
 
  it("Should set token base uri", async function () {
    const setUri = await myNFT.setBaseUri("https://example.com/");
    await setUri.wait();
    expect(await myNFT.baseUri()).to.equal("https://example.com/");
  });
 
  it("Should return NFT tokenUri as https://example.com/1.json", async function () {
    expect(await myNFT.tokenURI(1)).to.equal("https://example.com/1.json");
  });
  it("Should not mint when quantity exceed 2",async function(){
    await expectRevert(myNFT.mint(3),"Exceed max token purchase")
  });
  it("Should not mint when total supply exceed 30",async function(){
    const ts = myNFT.totalSupply()
    for(let i=0;i<30;++i){
      const mint = await myNFT.mint(1)
      await mint.wait()
      const nowTs = await myNFT.totalSupply()
      if(nowTs >=30) break
    }
    await expectRevert(myNFT.mint(2),"Purchase would exceed max tokens");
  })

});