pipeline {
    agent {
        docker { 
            image 'node:18-alpine' 
            args '-u root:root'
        }
    }
    environment {
        PATH = "/bin:/usr/bin:usr/local/bin"
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


                stage('Deploy to production') {
                    steps {
                        echo 'Deploying to production....'
                    }
                }
                stage('Build image') {
                    agent any 
                    steps {
                        script {
                            dockerImage = docker.build("jonmunm/pacientes-api:latest")
                        }
                        //sh 'docker build -t jonmunm/pacientes-api:latest .'
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