pipeline {
  agent {
    docker {
      image 'node:10.14-slim'
    }

  }
environment {
        SECRET = credentials('TOKEN')
    }

  stages {
    stage('Test') {
      steps {
        sh ' echo "beginning NPM" && npm install && npm test'
      }
    }
    stage('Publish') {
      when {
        branch 'master'
      }
      steps {
        sh 'echo $SECRET && echo "//registry.npmjs.org/:_authToken=${SECRET}" > ~/.npmrc && npm run matchversion && npm run patchversion && npm run pub'
      }
    }
  }

}