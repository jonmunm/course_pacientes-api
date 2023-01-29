pipeline {
    agent {
        docker { 
            image 'node:18-alpine' 
            args '-u root:root'
        }
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
                stage('Build image') {
                    steps {
                        /*script {
                            dockerImage = docker.build("jonmunm/pacientes-api:latest")
                        }*/
                        sh '/usr/bin/docker build -t jonmunm/pacientes-api:latest .'
                    }
                }

                    /*stage('Push image') {
                        steps {
                            withDockerRegistry([ credentialsId: "jonmunm_id", url: "" ]) {
                                dockerImage.push()
                            }
                        }
                    }*/
                
            }
        }
    }
}