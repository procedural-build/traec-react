pipeline {
  agent {
    docker {
      image 'node:10.14-slim'
    }

  }

  environment {
    SLACK = credentials('slack')
    NPM_TOKEN = credentials('npm_token')
  }

  stages {
    stage('NPM Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      post {
        always {
          junit 'jest-test-results.xml'
        }
      }

      steps {
        withEnv(overrides: ["JEST_JUNIT_OUTPUT=./jest-test-results.xml"]) {
          sh 'npm test -- --ci --coverage --testResultsProcessor="jest-junit"'
        }
      }
    }

    stage('Publish') {
      when {
        branch 'master'
      }
      steps {
        sh 'echo $NPM_TOKEN && echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc && npm run matchversion && npm run patchversion && npm run pub'
        ftpPublisher paramPublish: null, masterNodeName: '', alwaysPublishFromMaster: true, continueOnError: false, failOnError: true, publishers: [
                                [configName: 'Docs', transfers: [
                                        [asciiMode: false, cleanRemote: false, excludes: '', flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: "/traec-react/coverage", remoteDirectorySDF: false, removePrefix: 'coverage/lcov-report', sourceFiles: 'coverage/lcov-report/**']
                                ], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true]
        ]
      }
    }
  }

  post {
    success {
      slackSend(message: "SUCCESS\nJob: ${env.JOB_NAME} \nBuild ${env.BUILD_DISPLAY_NAME} \n URL: ${env.RUN_DISPLAY_URL} \n Master Test Coverage Report: https://docs.procedural.build/traec-react/coverage/", color: 'good', token: "${SLACK}", baseUrl: 'https://traecker.slack.com/services/hooks/jenkins-ci/', channel: '#jenkins-ci')

    }

    failure {
      slackSend(message: "FAILED\nJob: ${env.JOB_NAME} \nBuild ${env.BUILD_DISPLAY_NAME} \n URL: ${env.RUN_DISPLAY_URL}", color: '#fc070b', token: "${SLACK}", baseUrl: 'https://traecker.slack.com/services/hooks/jenkins-ci/', channel: '#jenkins-ci')

    }

  }
}