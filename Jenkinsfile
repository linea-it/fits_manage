pipeline {
    environment {
        registry = "linea/lna"
        registryCredential = 'Dockerhub'
        dockerImage = ''
        deployment_frontend = 'frontend'
        deployment_backend = 'backend'
        namespace = 'lna'
    }
    agent any

    stages {
        stage('Build Images') {
            when {
                expression {
                   env.BRANCH_NAME.toString().equals('master')
                }
            }
            steps {
              parallel(
              frontend: {
                  dir('frontend') {
                      script {
                          dockerImage = docker.build registry + ":FRONT$GIT_COMMIT"
                          docker.withRegistry( '', registryCredential ) {
                          dockerImage.push()
                      }
                        sh "docker rmi $registry:FRONT$GIT_COMMIT --force"
                        sh """
                        curl -D - -X \"POST\" \
                            -H \"content-type: application/json\" \
                            -H \"X-Rundeck-Auth-Token: $RD_AUTH_TOKEN\" \
                            -d '{\"argString\": \"-namespace $namespace -image $registry:FRONT$GIT_COMMIT -deployment $deployment_frontend\"}' \
                            https://fox.linea.gov.br/api/1/job/e79ea1f7-e156-4992-98b6-75995ac4c15a/executions
                        """
                      }
                  }
              },
              backend: {
                  dir('backend') {
                      script {
                          dockerImage = docker.build registry + ":BACK$GIT_COMMIT"
                          docker.withRegistry( '', registryCredential ) {
                          dockerImage.push()
                      }
                        sh "docker rmi $registry:BACK$GIT_COMMIT --force"
                        sh """
                        curl -D - -X \"POST\" \
                            -H \"content-type: application/json\" \
                            -H \"X-Rundeck-Auth-Token: $RD_AUTH_TOKEN\" \
                            -d '{\"argString\": \"-namespace $namespace -image $registry:BACK$GIT_COMMIT -deployment $deployment_backend\"}' \
                            https://fox.linea.gov.br/api/1/job/e79ea1f7-e156-4992-98b6-75995ac4c15a/executions
                        """
                      }
                  }
              }
          )
        }
      }
    }
}