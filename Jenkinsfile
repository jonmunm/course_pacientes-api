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
        stage('Test') {
            stages {
                stage('Integration tests') {
                    steps {
                        sh 'npm run integration-test'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}