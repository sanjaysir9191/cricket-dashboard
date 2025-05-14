FROM python:3.10-slim

# Create a non-root user
RUN useradd -m appuser

WORKDIR /app

# Copy and install requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Switch to non-root user
USER appuser

EXPOSE 5000

# Add health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/ || exit 1

# Use more efficient Gunicorn configuration
CMD ["gunicorn", "--workers=4", "--threads=2", "--bind=0.0.0.0:5000", "--log-level=info", "app:app"]
