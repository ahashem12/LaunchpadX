# Consulti - AI Financial Planning Assistant

Consulti is an AI-powered consultant agent designed to help businesses and startups develop comprehensive financial plans. By leveraging advanced language models, vector search, and automated data extraction, this platform streamlines the process of preparing financial projections, budgeting, and applying for grants and investments.

## 🚀 Features

- **Automated Document Ingestion**: Process financial statements, business plans, and feasibility studies (PDF, Excel, text) with persistent caching
- **Vector-Based Retrieval & Analysis**: Utilize ChromaDB for efficient, context-aware data retrieval
- **LLM-Powered Insights**: Generate comprehensive analyses using advanced LLMs
- **API-Driven Architecture**: Flask-based REST APIs serving a React/Next.js frontend
- **Interactive Chat Interface**: Real-time Q&A for financial plan refinement
- **Web Search Simulation**: Smart benchmarking with reference data

## 🛠️ Tech Stack

### Backend
- Flask API
- Python
- OpenAI API (GPT-4o-mini)
- ChromaDB
- DiskCache

### Frontend
- React
- Next.js
- Tailwind CSS
- TypeScript

## 🏗️ Project Structure

consulti/
├── backend/
│ ├── api/
│ ├── services/
│ └── utils/
├── frontend/
│ ├── app/
│ ├── components/
│ └── public/
└── docs/


## 🚦 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
bash
git clone https://github.com/ahashem12/Consulti.git
cd consulti


2. Set up the backend

bash
cd backend
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
pip install -r requirements.txt


3. Set up the frontend

bash
cd frontend
npm install

or
yarn install


4. Configure environment variables

bash
cp .env.example .env

Edit `.env` with your configuration

### Running the Application

1. Start the backend server

bash
cd backend
flask run


2. Start the frontend server

bash
cd frontend
npm run dev

or

yarn dev


Visit `http://localhost:3000` to access the application.

## 📋 Project Roadmap

### Phase I: Core Functionality
- Document Ingestion & Preprocessing
- Agentic RAG for Data Extraction
- Template Processing
- API Development
- Basic Front End

### Phase II: Enhanced Financial Planning
- Refined Benchmarking & Analysis
- Interactive Chat & Feedback Loop

### Phase III: Commercialization & Integration
- Comprehensive Dashboard
- Scalability & Security

## 👥 Team

- **Ahmad Hashem** - Lead Developer
- **Mohammad Imad** - Backend Developer
- **Tala Dabbagh** - Frontend Developer

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a Pull Request.

## 📞 Support

For support, please open an issue in the GitHub repository or contact the team at [support@consulti.com](mailto:support@consulti.com).

---

Built with ❤️ by the Consulti Team