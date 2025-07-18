#!/bin/bash

# Script de teste SEO para Storybook
# Usage: ./scripts/test-seo.sh

set -e

echo "🧪 Testando implementação SEO do Storybook"
echo "========================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para logs coloridos
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }

# URLs de teste
BASE_URL="http://localhost:8080"
SITEMAP_URL="$BASE_URL/sitemap.xml"
BUTTON_DOCS="$BASE_URL/?path=/docs/components-button--docs"
INPUT_DOCS="$BASE_URL/?path=/docs/components-inputs-text-input--docs"

echo ""
log_info "Testando servidor local..."

# Verificar se servidor está rodando
if curl -s "$BASE_URL" > /dev/null; then
    log_success "Servidor local acessível em $BASE_URL"
else
    log_error "Servidor não está rodando. Execute: npx http-server storybook-static -p 8080"
    exit 1
fi

echo ""
log_info "1. Testando Sitemap..."

# Teste 1: Sitemap existe e é válido
if curl -s "$SITEMAP_URL" | grep -q "urlset"; then
    log_success "Sitemap XML válido encontrado"
    
    # Contar URLs no sitemap
    URL_COUNT=$(curl -s "$SITEMAP_URL" | grep -c "<loc>")
    log_success "Sitemap contém $URL_COUNT URLs"
    
    # Verificar algumas URLs específicas
    if curl -s "$SITEMAP_URL" | grep -q "button--docs"; then
        log_success "URL do Button encontrada no sitemap"
    else
        log_warning "URL do Button não encontrada no sitemap"
    fi
else
    log_error "Sitemap não encontrado ou inválido"
fi

echo ""
log_info "2. Testando Metadados SEO..."

# Teste 2: Metadados básicos
HOMEPAGE_HTML=$(curl -s "$BASE_URL")

if echo "$HOMEPAGE_HTML" | grep -q "<title>"; then
    TITLE=$(echo "$HOMEPAGE_HTML" | grep -o '<title>[^<]*</title>' | sed 's/<[^>]*>//g')
    log_success "Título encontrado: $TITLE"
else
    log_error "Tag <title> não encontrada"
fi

if echo "$HOMEPAGE_HTML" | grep -q 'name="description"'; then
    log_success "Meta description encontrada"
else
    log_warning "Meta description não encontrada"
fi

if echo "$HOMEPAGE_HTML" | grep -q 'property="og:'; then
    log_success "Open Graph tags encontradas"
else
    log_warning "Open Graph tags não encontradas"
fi

if echo "$HOMEPAGE_HTML" | grep -q 'name="robots"'; then
    ROBOTS=$(echo "$HOMEPAGE_HTML" | grep -o 'name="robots"[^>]*content="[^"]*"' | sed 's/.*content="//;s/".*//')
    log_success "Meta robots: $ROBOTS"
else
    log_warning "Meta robots não encontrada"
fi

echo ""
log_info "3. Simulando Crawlers..."

# Teste 3: Simular diferentes user agents
echo ""
log_info "   3.1 Testando com Googlebot..."
GOOGLEBOT_RESPONSE=$(curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" "$BASE_URL")

if echo "$GOOGLEBOT_RESPONSE" | grep -q "Ocean"; then
    log_success "Googlebot consegue acessar conteúdo"
else
    log_warning "Googlebot pode ter dificuldades"
fi

echo ""
log_info "   3.2 Testando com Bingbot..."
BINGBOT_RESPONSE=$(curl -s -A "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" "$BASE_URL")

if echo "$BINGBOT_RESPONSE" | grep -q "Ocean"; then
    log_success "Bingbot consegue acessar conteúdo"
else
    log_warning "Bingbot pode ter dificuldades"
fi

echo ""
log_info "4. Testando Stories Específicas..."

# Teste 4: Stories específicas
echo ""
log_info "   4.1 Testando Button Component..."
if curl -s "$BUTTON_DOCS" | grep -q -i "button"; then
    log_success "Button docs acessível e contém conteúdo"
else
    log_warning "Button docs pode não estar indexável"
fi

echo ""
log_info "   4.2 Testando Input Component..."
if curl -s "$INPUT_DOCS" | grep -q -i "input\|text"; then
    log_success "Input docs acessível e contém conteúdo"
else
    log_warning "Input docs pode não estar indexável"
fi

echo ""
log_info "5. Verificando Performance..."

# Teste 5: Performance básica
echo ""
log_info "   5.1 Tamanho da página principal..."
HOMEPAGE_SIZE=$(curl -s "$BASE_URL" | wc -c)
HOMEPAGE_SIZE_KB=$((HOMEPAGE_SIZE / 1024))

if [ $HOMEPAGE_SIZE_KB -lt 500 ]; then
    log_success "Página principal: ${HOMEPAGE_SIZE_KB}KB (boa)"
elif [ $HOMEPAGE_SIZE_KB -lt 1000 ]; then
    log_warning "Página principal: ${HOMEPAGE_SIZE_KB}KB (aceitável)"
else
    log_warning "Página principal: ${HOMEPAGE_SIZE_KB}KB (pesada)"
fi

echo ""
log_info "   5.2 Tempo de resposta..."
RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}' "$BASE_URL")
log_success "Tempo de resposta: ${RESPONSE_TIME}s"

echo ""
log_info "6. Relatório de URLs do Sitemap..."

# Teste 6: Listar algumas URLs do sitemap para verificação manual
echo ""
log_info "   Primeiras 10 URLs do sitemap:"
curl -s "$SITEMAP_URL" | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g' | head -10 | while read url; do
    echo "   📄 $url"
done

echo ""
echo "========================================="
log_success "Teste SEO concluído!"
echo ""
log_info "Para testes adicionais:"
echo "• Google Search Console: https://search.google.com/search-console"
echo "• Lighthouse: npx lighthouse $BASE_URL --output=html"
echo "• Validador W3C: https://validator.w3.org/"
echo "• Test sitemap: https://www.xml-sitemaps.com/validate-xml-sitemap.html"
echo ""
echo "URLs para testar manualmente:"
echo "• Homepage: $BASE_URL"
echo "• Sitemap: $SITEMAP_URL"
echo "• Button: $BUTTON_DOCS"
echo "• Input: $INPUT_DOCS" 