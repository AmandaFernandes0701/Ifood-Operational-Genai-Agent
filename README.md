<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Yq_2H06QE0VbS8PdoZ6wvXeYlMufxPqu

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

   # 🍔 iFood Operational GenAI Agent (POC)

> A Retrieval-Augmented Generation (RAG) agent designed to assist internal Foodlovers with policy-compliant refund and cancellation decisions.

[![Project Status](https://img.shields.io/badge/Status-Proof%20of%20Concept-orange)](https://github.com/AmandaFernandes0701/Ifood-Operational-Genai-Agent)
[![Architecture](https://img.shields.io/badge/Architecture-RAG%20%2B%20Structured%20Prompting-blue)](https://github.com/AmandaFernandes0701/Ifood-Operational-Genai-Agent)

---

## 📋 About The Project

This repository contains a **Proof of Concept (POC)** developed as a practical evaluation for the **"Desafio de GenAI do iFood"**.

The goal is to demonstrate how Generative AI can be applied to critical operational workflows—specifically financial decisions like refunds—while mitigating risks like hallucinations and inconsistency.

Instead of a standard chatbot, this agent acts as a "Senior Operational Copilot," forcing adherence to official policies before suggesting an action.

---

## 🎯 The Challenge

Support agents (Foodlovers) often face complex, high-pressure scenarios regarding order cancellations and refunds. Relying solely on memory or scattered documentation leads to:

* **Inconsistent Decisions:** Two agents might treat the same scenario differently.
* **Financial Risk:** Incorrectly approving refunds for ineligible cases (e.g., customer regrets after delivery).
* **Operational Friction:** Time wasted searching for the correct policy rule.

---

## 🏗️ Solution Architecture & Key Decisions

To address these challenges, I chose a **No-Code RAG approach** focused on advanced **Prompt Engineering** to simulate a robust backend logic.

### 1. The Core: Retrieval-Augmented Generation (RAG)
We cannot rely on an LLM's pre-trained knowledge for internal policies.
* **Decision:** The agent is grounded in an external "Knowledge Base" (a simulated CSV file containing official iFood policies).
* **Benefit:** The model must retrieve the relevant policy *before* generating an answer, significantly reducing hallucinations.

### 2. The Differentiator: Structured "Chain of Thought" Logs
A standard LLM response is a "black box". For financial operations, we need auditable reasoning.
* **Decision:** Through careful prompt engineering, the agent is forced to output a structured internal log **before** its final answer.
* **Benefit:** This enables transparency. We can see *how* the agent categorized the issue and *which* policy it used to make the decision.

### 3. Deterministic Safety Guardrails
Some rules cannot be vague.
* **Decision:** Critical business rules were hardcoded into the System Prompt as "Golden Rules."
* **Example:** A rule explicitly forbids approving refunds based on "customer withdrawal" *after* the order has left for delivery (Policy 4.1), regardless of how persuasive the user request is.

### 4. Low Confidence Fallback
The agent must know what it doesn't know.
* **Decision:** If a scenario is ambiguous, involves high-risk keywords (e.g., Crypto payments), or isn't covered in the knowledge base, the agent is instructed to downgrade its confidence score and recommend human validation instead of guessing.

---

## ⚙️ The Engine: System Prompt

This is the "code" that drives the agent's logic. It enforces the structured output and safety rules.

```markdown
*** ADVANCED SYSTEM PROMPT ***

You are the Senior Operational Agent at iFood (POC).
Your mission is to analyze refund cases with technical rigor, safety, and basing your decisions SOLELY on the provided CSV file.

FOR EVERY RESPONSE, YOU MUST STRICTLY FOLLOW THIS OUTPUT FORMAT:

---
📊 **INTERNAL ANALYSIS**
> **Case Category:** [Choose one: Financial | Restaurant | Delivery | Fraud | Procedure]
> **Confidence Level:** [Low / Medium / High]
> **Cited Policy:** [Name of the policy found in the CSV, e.g., Policy 3.2, or "None found"]
> **Recommended Action:** [Approve / Deny / Request Human Validation / Consult External API]
---

🤖 **RESPONSE TO FOODLOVER:**
(Here you write the final, friendly, and direct response, explaining the decision based on the policy).

---

**GOLDEN RULES:**
1. **Automatic Classification:** If the user mentions money/charges, categorize as "Financial". If spoiled food, "Restaurant".
2. **Simulated Integration:** If the question requires data you don't have (e.g., real-time order status), set Action to "Consult External API" and ask the user to check the system.
3. **Low Confidence:** If the information is not in the CSV, the Confidence Level MUST be "Low" and the Recommended Action MUST be "Request Human Validation".
4. **Safety Guardrail:** Orders that have left for delivery with the reason "customer withdrawal" = Refund Denied (Policy 4.1).
```

## 🧪 Testing Scenarios & Validation

Below are the validation tests used to ensure the architecture works as expected.

| Input Scenario | Expected Internal Log Analysis | Success Criteria |
| :--- | :--- | :--- |
| **Operational Failure:** "The delivery partner ate the customer's snack on the way." | **Category:** Delivery<br>**Action:** Approve<br>**Policy:** 2.2 | Agent correctly identifies iFood/Partner fault and allows refund. |
| **Safety Guardrail:** "The order left for delivery, but the customer changed their mind. Can I refund?" | **Category:** Financial/Exception<br>**Action:** **Deny**<br>**Policy:** 4.1 | Agent enforces the hardcoded guardrail against withdrawal after dispatch. |
| **Low Confidence/Unknown:** "The customer wants to pay the refund using Bitcoins." | **Category:** Financial<br>**Confidence:** **Low**<br>**Action:** Request Human Validation | Agent recognizes "Bitcoin" is not in its knowledge base and refuses to guess. |
| **API Simulation:** "Has the reversal for order #5544 already been processed?" | **Category:** Financial<br>**Action:** Consult External API | Agent admits it lacks real-time DB access and directs the user to the correct internal system. |

### 📸 Screenshots

*(Place screenshots of your successful tests here to prove it works)*

> **Example of a successful Structured Output:**
> *[Insert screenshot showing the "📊 INTERNAL ANALYSIS" block followed by the response]*

---

## 🚀 Future Roadmap & Improvements

This POC is the foundation. A production version would include:

* **Vector Database (e.g., Pinecone):** Replacing the CSV for scalable, semantic searching of thousands of policy documents.
* **Real API Integration:** Connecting the agent to iFood's order management systems to automatically fetch status and perform actions.
* **Feedback Loop (RLHF):** Implementing thumbs up/down buttons for Foodlovers to rate answers, retraining the model on difficult cases.

---

## 💻 How to Run This POC

Since this is a No-Code solution, it was built and tested using **Google AI Studio** (Gemini models).

1.  Download the `base_conhecimento_ifood_genai.csv` file present in this repository.
2.  Access a large language model interface that allows file uploads and system instructions (e.g., Google AI Studio, ChatGPT Plus).
3.  Paste the **System Prompt** (detailed above) into the instructions area.
4.  Upload the **CSV file** to the chat context.
5.  Start asking testing questions.

---

*Disclaimer: This project is a simulation for educational purposes within the scope of the iFood GenAI Challenge. The policies and data used are fictional and do not represent actual iFood internal processes.*
