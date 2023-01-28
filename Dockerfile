#
#   @e53e04ac/ipp5-frontend-builder/Dockerfile
#   Copyright (C) @e53e04ac
#   MIT License
#

FROM nginx:stable-alpine

RUN rm -rf \
  /docker-entrypoint.d \
  /docker-entrypoint.sh \
  /etc/nginx/conf.d \
  /etc/nginx/modules \
  /etc/nginx/fastcgi_params \
  /etc/nginx/fastcgi.conf \
  /etc/nginx/mime.types \
  /etc/nginx/scgi_params \
  /etc/nginx/uwsgi_params

COPY $${contextNginxConfRelativePath} /etc/nginx/nginx.conf

RUN addgroup -S $${containerAppGroup} && adduser -S $${containerAppUser} -G $${containerAppGroup}

RUN chown -R $${containerAppUser}:$${containerAppGroup} /var/cache/nginx/ && chmod -R g+w /var/cache/nginx/

RUN touch /var/run/nginx.pid && chown $${containerAppUser}:$${containerAppGroup} /var/run/nginx.pid

USER $${containerAppUser}

ENTRYPOINT $${containerAppEntrypoint}
