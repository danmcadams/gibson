FROM php:8.4-cli
RUN apt-get update && apt-get install -y libzip-dev curl \
    && docker-php-ext-install zip \
    && mkdir -p /var/www/app/vendor \
    && curl -fsSL https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs \
       -o /var/www/app/vendor/mermaid.esm.min.mjs \
    && rm -rf /var/lib/apt/lists/*
