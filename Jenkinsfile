def spautoo
def registry = "sscharbor.cubastion.net"
def targetImage = params.targetImage
def build_num = params.build_number
def HarborCred = params.harbor_cred

pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                cleanWs()
                deleteDir()
                checkout scm
            }
        }
        
        stage('Build Image') {
            steps {
                script {
                        spautoo = docker.build("${registry}/${targetImage}:${build_num}")
                }
            }
        }
        
        stage("Push Image") {
            steps {
                script {
                    docker.withRegistry("https://${registry}", HarborCred) {
                        spautoo.push()
                    }
                }
            }
        }
        
        stage("Cleanup") {
            steps {
                script {
                    try {
                        sh "docker rmi ${registry}/${targetImage}:${build_num}"
                    } catch (Exception e) {
                        echo "Docker image doesn't exist or already deleted"
                    }
                }
                cleanWs()
                deleteDir()
            }
        }
    }
}
