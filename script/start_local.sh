#!/usr/bin/env bash
# Локальный запуск babska_jazda на macOS: проверяет зависимости, готовит БД и стартует bin/dev.
set -euo pipefail
cd "$(dirname "$0")/.."

say() { printf '\n\033[1;34m== %s ==\033[0m\n' "$1"; }

say "Проверяю Homebrew"
command -v brew >/dev/null || { echo "Нужен Homebrew: https://brew.sh"; exit 1; }

say "Ruby и Node через asdf (.tool-versions)"
if ! command -v asdf >/dev/null; then brew install asdf; fi
brew list libyaml >/dev/null 2>&1 || brew install libyaml openssl@3
asdf plugin list 2>/dev/null | grep -q '^ruby$'   || asdf plugin add ruby
asdf plugin list 2>/dev/null | grep -q '^nodejs$' || asdf plugin add nodejs
asdf install
export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"
ruby -v; node -v

say "PostgreSQL"
if ! command -v pg_isready >/dev/null; then
  brew install postgresql@17
  export PATH="$(brew --prefix postgresql@17)/bin:$PATH"
fi
pg_isready -q || brew services start "$(brew list --formula | grep -m1 '^postgresql')"
for i in {1..15}; do pg_isready -q && break; sleep 1; done
pg_isready

say "Гемы и npm-пакеты"
gem list -i bundler >/dev/null || gem install bundler
bundle check || bundle install
npm install

say "База данных"
bin/rails db:prepare

say "Старт: http://localhost:3000 (остановить — Ctrl+C)"
exec bin/dev
