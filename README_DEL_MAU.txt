COMO CORRERLO:
    Ejecutar: 
        docker-compose build
        docker-compose up -d
        * BACKEND
            En una terminal ejecutar (para debuggear y actualizar el back en cada cambio):
                docker-compose exec backend bash
                bash ./backend-live.sh
        * FRONTEND
            Es necesario tener instalado Node
            Una vex instalado:
                En una terminal:
                    -Ir a la carpeta del backend dentro del proyecto, luego ejecutar(Para poder probar el front):
                        npm install
                        npm run serve
                    -Esto permitirá ver los cambios del front en http://localhost:8080
        Una vez hecho eso, para que el contenedor de docker del front no interfiera con el npm, hacer un docker kill del conentedor neochazit_frontend 

PUBLISH
    docker-compose build
    TAG=prod FRONTEND_ENV=production bash ./build.sh
    DOMAIN={{cookiecutter.domain_main}} TRAEFIK_TAG={{cookiecutter.traefik_constraint_tag}} STACK_NAME={{cookiecutter.docker_swarm_stack_name_main}} TAG=prod bash ./deploy.sh
    
        