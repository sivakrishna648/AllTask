#!/bin/bash

# Deployment Script for HiringHood
# Usage: ./deploy.sh [staging|production]

set -e

ENVIRONMENT=${1:-staging}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "========================================="
echo "  HiringHood Deployment Script"
echo "  Environment: $ENVIRONMENT"
echo "  Timestamp: $TIMESTAMP"
echo "========================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    log_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Set environment variables
export ENVIRONMENT
export TIMESTAMP

log_info "Pulling latest images..."
docker-compose pull

log_info "Building images..."
docker-compose build --no-cache

log_info "Stopping existing containers..."
docker-compose down

log_info "Starting containers..."
docker-compose up -d

# Wait for services to be ready
log_info "Waiting for services to start..."
sleep 10

# Run health checks
log_info "Running health checks..."
if ./scripts/healthcheck.sh "$ENVIRONMENT"; then
    log_info "Deployment completed successfully!"
    
    # Show running containers
    docker-compose ps
else
    log_error "Health checks failed! Deployment may have issues."
    exit 1
fi

log_info "Deployment finished at $(date)"
echo "========================================="