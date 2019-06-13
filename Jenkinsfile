pipeline {
  agent {
    docker {
      image 'node:10.14-slim'
    }

  }
environment {
        SECRET = credentials('TOKEN2')
    }

  stages {
    stage('NPM Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      when {
        anyOf {
          branch 'dev*'
          branch 'test*'
        }
      }
      steps {
        sh ' echo "beginning NPM" && npm test'
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