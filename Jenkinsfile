def dockerHome

def registry = "sscharbor.cubastion.net"
def targetImage = "demo1/spautoo"
def HarborCred = params.harbor_cred
def build_num = params.build_number

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
                        demo1 = docker.build("${registry}/${targetImage}:${build_num}")
                }
            }
        }
        
        stage("Push Image") {
            steps {
                script {
                    docker.withRegistry("https://${registry}", "HarborCred") {
                        demo1.push()
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
