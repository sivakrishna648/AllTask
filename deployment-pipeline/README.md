# HiringHood Deployment Pipeline

A complete full-stack deployment pipeline demonstration with React frontend, Node.js Express backend, Docker containerization, and GitHub Actions CI/CD.

## 📁 Project Structure

```
deployment-pipeline/
├── frontend/                     # React Application
│   ├── src/
│   │   ├── App.js               # Main React component
│   │   ├── App.css              # App styles
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── Dockerfile               # Multi-stage: builder → nginx
│   ├── nginx.conf               # Nginx config with API proxy
│   ├── .dockerignore
│   └── package.json
│
├── backend/                      # Node.js Express API
│   ├── src/
│   │   └── server.js            # Express server with routes
│   ├── __tests__/
│   │   └── server.test.js       # Jest + Supertest unit tests
│   ├── Dockerfile               # Multi-stage: deps → tester → production
│   ├── .env.example
│   ├── .dockerignore
│   └── package.json
│
├── .github/
│   └── workflows/
│       ├── ci.yml               # Build & Test (all branches)
│       ├── cd.yml               # Deploy to staging + production (main)
│       └── pr-review.yml        # Security scan & quality (pull requests)
│
├── scripts/
│   ├── deploy.sh                # Server-side deployment script
│   └── healthcheck.sh           # Multi-service health verification
│
├── docker-compose.yml           # Production orchestration
├── docker-compose.dev.yml       # Development overrides (hot reload)
├── package.json                 # Root monorepo scripts
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/hiringhood.git
cd hiringhood

# Install all dependencies
npm run install:all

# Start development environment (hot reload)
npm run dev

# Or build and run production
npm run build
npm run start
```

### Running Tests

```bash
# Run all tests
npm test

# Run frontend tests
npm run test:frontend

# Run backend tests
npm run test:backend
```

## 🐳 Docker Configuration

### Production Build

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Development Build

```bash
# Start with hot reload
docker-compose -f docker-compose.dev.yml up

# Rebuild after code changes
docker-compose -f docker-compose.dev.yml build
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| `ci.yml` | Push/PR | Build & Test on all branches |
| `cd.yml` | Push to main | Deploy to staging & production |
| `pr-review.yml` | PR opened/updated | Security scan & code quality |

### Environments

- **Staging**: `https://staging.hiringhood.example.com`
- **Production**: `https://hiringhood.example.com`

### Required Secrets

Configure these in your GitHub repository settings:

- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password
- `STAGING_HOST` - Staging server hostname
- `STAGING_USER` - SSH user for staging
- `STAGING_SSH_KEY` - SSH private key for staging
- `PRODUCTION_HOST` - Production server hostname
- `PRODUCTION_USER` - SSH user for production
- `PRODUCTION_SSH_KEY` - SSH private key for production

## 📡 API Endpoints

### Backend (Port 3000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/jobs` | List all jobs |
| GET | `/api/jobs/:id` | Get job by ID |
| POST | `/api/jobs` | Create new job |

### Frontend (Port 80)

- Serves React static files
- Proxies `/api/*` requests to backend

## 🛠️ Scripts

### Deployment

```bash
# Deploy to staging
./scripts/deploy.sh staging

# Deploy to production
./scripts/deploy.sh production
```

### Health Checks

```bash
# Run health checks
./scripts/healthcheck.sh staging
./scripts/healthcheck.sh production
```

## 🔐 Security Features

- Multi-stage Docker builds (minimal final image)
- Non-root user in containers
- Environment variable configuration
- Docker network isolation
- Resource limits on containers
- Security scanning in CI pipeline

## 📝 License

MIT License - feel free to use this as a template for your own projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using React, Express, Docker, and GitHub Actions