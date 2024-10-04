# Compliance Checker API

This project is a web-based API that scrapes a policy and target webpage, and checks the target for compliance issues against the provided policy using OpenAI's GPT-4 API. The compliance report is returned in a structured format.

## Project Structure

- `controllers/`: Contains the compliance logic.
- `services/`: Contains services for scraping with Puppeteer and interacting with the OpenAI API.
- `utils/`: Contains utilities such as the token estimator.
- `routes/`: Defines the API routes.
- `app.js`: Main entry point of the app.

## Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd compliance-checker
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and add your OpenAI API key:
    ```
    OPENAI_API_KEY=your-openai-api-key
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Usage

To check a target webpage for compliance against a policy, make a `POST` request to `/api/check-compliance` with the following JSON structure:

```json
{
    "policyUrl": "<policy-webpage-url>",
    "targetUrl": "<target-webpage-url>"
}
