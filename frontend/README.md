# AI Financial Planning Assistant
**LPX** is an AI-powered consultant agent designed to help businesses and startups develop comprehensive financial plans. By leveraging advanced language models, vector search, and automated data extraction, this platform streamlines the process of preparing financial projections, budgeting, and applying for grants and investments.
---
## Team
- **Ahmad Hashem** 
- **Mohammad Imad** 
- **Tala Dabbagh** 
---
## Purpose
The purpose of this project is to empower startups and businesses by automating complex financial planning tasks. The assistant helps users:
- Generate detailed financial plans
- Benchmark key financial metrics against industry standards
- Reduce manual data entry and analysis through intelligent document processing
---
## Features
- **Automated Document Ingestion:**  
  Ingest financial statements, business plans, feasibility studies, and other documents (PDF, Excel, and text) with persistent caching and file-change tracking.
- **Vector-Based Retrieval & Analysis:**  
  Use vector search (via ChromaDB) to locate relevant data within the knowledge base for fast, context-aware analysis.
- **LLM-Powered Insights:**  
  Generate comprehensive analyses and extract precise final values using advanced LLMs (GPT-4o-mini, etc.) with clear final answers.
- **API-Driven Architecture:**  
  Expose Flask-based REST APIs to serve a React/Next.js front end for a seamless user experience.
- **Interactive Chat Interface:**  
  Allow users to ask follow-up questions and refine their financial plans interactively.
- **Web Search Simulation:**  
  When local data is insufficient (especially for benchmarking values like depreciation rates), simulate a web search to return references along with a final answer.
---
## Architecture and Tech Stack
- **Backend:**  
  - **Flask API:** Serves endpoints for document ingestion, analysis, and real-time chat.
  - **Python:** Core logic for document processing, vector search, and LLM integration.
  - **OpenAI API:** Uses GPT-4o-mini (or similar) for natural language processing and answer generation.
  - **ChromaDB:** Implements vector search for retrieving relevant document chunks.
  - **DiskCache:** Provides persistent caching to optimize repeated queries.
- **Frontend:**  
  - **React / Next.js:** Provides an interactive web interface for consultants and business owners.
  - **REST API Integration:** Connects to the Flask backend for real-time processing and chat functionality.
---
## Roadmap
### Phase I: Core Functionality
- **Document Ingestion & Preprocessing:**  
  Implement robust pipelines for ingesting PDFs, Excel, and text files. Use persistent caching and file-change tracking to ensure that only new or modified files are processed.
  
- **Agentic RAG for Data Extraction:**  
  Build the agentic Retrieval-Augmented Generation (RAG) system that extracts key financial metrics from documents.  
- **Template Processing:** Develop a mechanism to process financial plan templates to automatically determine what information to search for and which clarifying questions to ask the user.
- **API Development:**  
  Create Flask-based REST endpoints to expose ingestion, analysis, and interactive chat functionality to the front end.
- **Basic Front End:**  
  Build a React/Next.js interface for users to upload documents, view extracted data, and interact with the agent.
### Phase II: Enhanced Financial Planning
- **Refined Benchmarking & Analysis:**  
  Enhance the agentic RAG with deeper financial analysis, benchmarking, and web search simulation for missing data.
  
- **Interactive Chat & Feedback Loop:**  
  Develop a conversational interface for real-time Q&A and incorporate user feedback to improve template processing and data extraction.
### Phase III: Commercialization & Integration
- **Comprehensive Dashboard:**  
  Build a dashboard for financial planning and reporting, integrated with ERP/CRM systems.
  
- **Scalability & Security:**  
  Scale the system to support a larger user base with enhanced security and compliance features.
---
## Getting Started
### Prerequisites
- Python 3.13+
- Node.js and npm
- An OpenAI API key (set in the `.env` file)
