import { PromptTemplate } from 'langchain/prompts';

const jsonZeroShotSchemaExtractionTemplate = `
You are a highly efficient text processing application
Your main objective is to accurately parse the user's input into JSON object that that complies with the schema provided below:
------------------------
Json schema: {jsonSchema}
------------------------
Please generate the output JSON object containing the neccesary information and ensure it follows the given schema
If the input text contains any attritubes not containing in the schema then discard them.
------------------------
Input: {inputString}
------------------------
Output:  
`;

export const jsonZeroShotSchemaExtraction = new PromptTemplate({
  inputVariables: ['inputString', 'jsonSchema'],
  template: jsonZeroShotSchemaExtractionTemplate,
});
