

# Shell script for running operations within a clean isolated docker container (ie for tests)
case "$1" in
  tests)
    docker run -it --rm -w "/src/" -v "$PWD:/src" node:10.14-slim npm install && npm run test
    ;;
  bash)
    docker run -it --rm -w "/src/" -v "$PWD:/src" node:10.14-slim bash
    ;;
  builddocs)
    docker run -it --rm -w "/src/" -v "$PWD:/src" node:10.14-slim npm install && npm install -g documentation && documentation build src/** -f html -o docs
    ;;
  *)
    echo $"Usage: $0 { tests | bash | builddocs }"
    exit 1

esac
