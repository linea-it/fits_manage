
docker run -it --rm --name fitsmanage_backend \
    --publish 8081:8081 \
    --volume $PWD/:/app \
    --volume $PWD/../log/:/log \
    --volume $PWD/../archive/:/archive \
    --env-file $PWD/../.env \
    --network fitsmanage_fits_manage \
    fits_manage_backend

