pipeline {
    agent {
        docker { image 'node:18-alpine' }
    }
    environment {
		DOCKERHUB_CREDENTIALS=credentials('jonmunm_id')
	}

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            parallel {
                stage('Unit') {
                    steps {
                        sh 'NODE_ENV=STAGE npm run unit-test'
                    }
                }
                stage('Integration') {
                    steps {
                        sh 'NODE_ENV=STAGE npm run integration-test'
                    }
                }
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
                        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                        sh 'docker build -t jonmunm/pacientes-api:latest .'
                        sh 'docker push jonmunm/pacientes-api:latest'
                    }
                }
            }
        }
    }
	post {
		always {
			sh 'docker logout'
		}
	}
}