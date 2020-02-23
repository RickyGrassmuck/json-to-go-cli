const cmd = require('./cmd');
const path = require('path')
const expect = require('chai').expect;
const fs = require('fs');

const stringInput = JSON.stringify({status: { message: "please"}});
const fileInput = path.join(__dirname, 'sample.json');
const goTypeResponse = 'type AutoGenerated struct {	Status struct {		Message string `json:"message"`	} `json:"status"`}';
const goInlineResponse = 'type AutoGenerated struct {	Status Status `json:"status"`}type Status struct {	Message string `json:"message"`}';
const conflictingArgsResponse = 'Error: Do not specify both [-s/--string] and [-f/--file]';
const notEnoughArgsResponse =  'Error: Must specify one of [-s/--string] or [-f/--file]';

describe('The Json-to-go CLI', () => {
  const cliPath = path.join(__dirname, '../index.js');
  const cliProcess = cmd.create(cliPath, '.');
  it('should accept string input and print the correct output', async () => {
    const response = await cliProcess.execute([ '-s', stringInput]);
    expect(response.replace(/(\r\n|\n|\r)/gm,"")).to.equal(goTypeResponse);
  });
  it('should accept file input and print the correct output', async () => {
    const response = await cliProcess.execute([ '-f', fileInput]);
    expect(response.replace(/(\r\n|\n|\r)/gm,"")).to.equal(goTypeResponse);
  });
  it('should accept string input and print flattened output', async () => {
    const response = await cliProcess.execute([ '-s', stringInput, '-i']);
    expect(response.replace(/(\r\n|\n|\r)/gm,"")).to.equal(goInlineResponse);
  });
  it('should print an error when both -s and -f are provided', async () => {
    const response = await cliProcess.execute([ '-s', stringInput, '-f', fileInput]);
    expect(response.replace(/(\r\n|\n|\r)/gm,"")).to.equal(conflictingArgsResponse);
  });
  it('should print an error when neither -s and -f are provided', async () => {
    const response = await cliProcess.execute([ '-i']);
    expect(response.replace(/(\r\n|\n|\r)/gm,"")).to.equal(notEnoughArgsResponse);
  });
});
