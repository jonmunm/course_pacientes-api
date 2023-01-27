pipeline {
    agent {
        docker { image 'node:18-alpine' }
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Unit tests') {
            steps {
                sh 'NODE_ENV=STAGE npm run unit-test'
            }
        }
        stage('Integration tests') {
            steps {
                sh 'NODE_ENV=STAGE npm run integration-test'
            }
        }
        stage('Deploy') {
            parallel {
                stage('Deploy to production') {
                    steps {
                        echo 'Deploying to production....'
                    }
                }
                stage('Deploy to docker registry') {
                    steps {
                        echo 'Deploying to docker registry....'
                    }
                }
            }
        }
    }
}