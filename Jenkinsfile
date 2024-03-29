pipeline {
  agent {
    docker {
      image 'node:20.3.0-slim'
      args '-u 0:0'
    }

  }

  environment {
    SLACK = credentials('slack')
    NPM_TOKEN = credentials('npm_token')
    HOME = '.'
  }

  stages {
    stage('NPM Install') {
      steps {
        sh 'npm ci'
        sh 'npm install -g documentation documentation-devseed-theme clean-documentation-theme'
      }
    }
    // stage('Test') {
    //   steps {
    //     withEnv(overrides: ["JEST_JUNIT_OUTPUT=./jest-test-results.xml"]) {
    //       sh 'npm test -- --ci --coverage --testResultsProcessor="jest-junit"'
    //     }
    //   }
    //   post {
    //     always {
    //       junit 'jest-test-results.xml'
    //     }
    //   }
    // }

    stage('Publish NPM and Docs') {
      when {
        anyOf {
          branch 'master'
          //branch 'stage'
        }
      }
      steps {
        script {
          if (env.BRANCH_NAME == 'master') {
              env.DOCKER_TAG = 'stable'
          } else {
            env.DOCKER_TAG = 'latest'
          }
          env.S3_DOCS_PATH = "docs.procedural.build/dev/traec-react/${DOCKER_TAG}/"
        }

        // sh 'documentation build src/** -f html -o docs'
        sh 'echo $NPM_TOKEN && echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc'
        sh 'npm run pub'

        // echo "Uploading documentation files to ${S3_DOCS_PATH}"
        // withAWS(region: 'eu-west-2', credentials: 'docker_euwest2') {
        //   s3Delete(bucket:'procedural-frontend-bundles', path:"${S3_DOCS_PATH}")
        //   s3Upload(file: 'docs/', bucket:'procedural-frontend-bundles', path:"${S3_DOCS_PATH}")
        // }

      }
    }
  }

  post {
    always {
      cleanWs()
    }

    success {
      slackSend(message: "SUCCESS\nJob: ${env.JOB_NAME} \nBuild ${env.BUILD_DISPLAY_NAME} \n URL: ${env.RUN_DISPLAY_URL} \n Master Test Coverage Report: https://docs.procedural.build/traec-react/coverage/", color: 'good', token: "${SLACK}", baseUrl: 'https://traecker.slack.com/services/hooks/jenkins-ci/', channel: '#jenkins-ci')

    }

    failure {
      slackSend(message: "FAILED\nJob: ${env.JOB_NAME} \nBuild ${env.BUILD_DISPLAY_NAME} \n URL: ${env.RUN_DISPLAY_URL}", color: '#fc070b', token: "${SLACK}", baseUrl: 'https://traecker.slack.com/services/hooks/jenkins-ci/', channel: '#jenkins-ci')

    }

  }
}