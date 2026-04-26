#!/bin/bash

# Health Check Script for HiringHood Multi-Service
# Usage: ./healthcheck.sh [staging|production]

set -e

ENVIRONMENT=${1:-staging}
MAX_RETRIES=30
RETRY_INTERVAL=2

echo "========================================="
echo "  HiringHood Health Check"
echo "  Environment: $ENVIRONMENT"
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

# Service endpoints
FRONTEND_URL="http://localhost:80"
BACKEND_URL="http://localhost:3000/health"

# Check if a service is healthy
check_service() {
    local service_name=$1
    local url=$2
    local retries=0
    
    log_info "Checking $service_name at $url..."
    
    while [ $retries -lt $MAX_RETRIES ]; do
        if curl -sf "$url" > /dev/null 2>&1; then
            log_info "$service_name is healthy!"
            return 0
        fi
        
        retries=$((retries + 1))
        log_warn "$service_name not ready, retrying ($retries/$MAX_RETRIES)..."
        sleep $RETRY_INTERVAL
    done
    
    log_error "$service_name health check failed!"
    return 1
}

# Check Docker containers
check_containers() {
    log_info "Checking Docker containers..."
    
    local running_containers=$(docker-compose ps --filter "status=running" -q)
    
    if [ -z "$running_containers" ]; then
        log_error "No running containers found!"
        return 1
    fi
    
    log_info "Running containers: $(echo $running_containers | wc -w)"
    docker-compose ps
    return 0
}

# Main health check execution
main() {
    local failed=0
    
    # Check containers first
    if ! check_containers; then
        log_error "Container check failed!"
        failed=1
    fi
    
    # Check backend API
    if ! check_service "Backend API" "$BACKEND_URL"; then
        failed=1
    fi
    
    # Check frontend
    if ! check_service "Frontend" "$FRONTEND_URL"; then
        failed=1
    fi
    
    # Final status
    echo "========================================="
    if [ $failed -eq 0 ]; then
        log_info "All health checks passed!"
        echo "========================================="
        exit 0
    else
        log_error "Some health checks failed!"
        echo "========================================="
        exit 1
    fi
}

# Run main function
main